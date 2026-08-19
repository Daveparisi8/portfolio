const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config({ path: 'server/.env' });

const app = express();
const port = Number(process.env.PORT || 4000);
const isProduction = process.env.NODE_ENV === 'production';
const shouldTrustProxy =
  process.env.TRUST_PROXY === 'true' ||
  (isProduction && process.env.TRUST_PROXY !== 'false');

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const jwtSecret = process.env.ADMIN_JWT_SECRET;
const contactToEmail = process.env.CONTACT_TO_EMAIL || 'contact@dave-parisi.com';
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = process.env.SMTP_SECURE === 'true';
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM || smtpUser;
const analyticsFilePath = path.join(__dirname, 'data', 'analytics.json');
const DEFAULT_TRACKED_LINKS = {
  'header-github': {
    label: 'GitHub',
    url: 'https://github.com/daveparisi8',
  },
  'header-linkedin': {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ParisiDave',
  },
};

if (!adminEmail || !adminPassword || !jwtSecret) {
  throw new Error('Missing required server environment variables. Check server/.env and ensure ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_JWT_SECRET are set.');
}

if (shouldTrustProxy) {
  app.set('trust proxy', 1);
}

app.use(express.json());
app.use(cookieParser());

const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Please try again later.' },
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many contact requests. Please try again later.' },
});

const contactTransport =
  smtpHost && smtpUser && smtpPass
    ? nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })
    : null;

function loadAnalytics() {
  try {
    if (!fs.existsSync(analyticsFilePath)) {
      return {
        portfolioUniqueVisitors: [],
        linkClicks: {},
      };
    }

    const raw = fs.readFileSync(analyticsFilePath, 'utf8');
    const parsed = JSON.parse(raw);

    return {
      portfolioUniqueVisitors: Array.isArray(parsed.portfolioUniqueVisitors)
        ? parsed.portfolioUniqueVisitors
        : [],
      linkClicks: parsed.linkClicks && typeof parsed.linkClicks === 'object'
        ? parsed.linkClicks
        : {},
    };
  } catch {
    return {
      portfolioUniqueVisitors: [],
      linkClicks: {},
    };
  }
}

function saveAnalytics(state) {
  fs.writeFileSync(analyticsFilePath, JSON.stringify(state, null, 2));
}

function getOrSetVisitorId(req, res) {
  let visitorId = req.cookies?.portfolio_visitor_id;
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    res.cookie('portfolio_visitor_id', visitorId, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 365 * 24 * 60 * 60 * 1000,
      path: '/',
    });
  }

  return visitorId;
}

function isAdminAuthenticated(req) {
  const token = req.cookies?.admin_session;
  if (!token) {
    return false;
  }

  try {
    const payload = jwt.verify(token, jwtSecret, { issuer: 'portfolio-auth' });
    return payload?.role === 'administrator';
  } catch {
    return false;
  }
}

function requireAdmin(req, res, next) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ authenticated: false });
  }

  return next();
}

app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

app.post('/api/analytics/visit', (req, res) => {
  const { mode } = req.body || {};
  if (mode !== 'portfolio-review') {
    return res.status(200).json({ tracked: false });
  }

  const visitorId = getOrSetVisitorId(req, res);
  const analytics = loadAnalytics();

  if (!analytics.portfolioUniqueVisitors.includes(visitorId)) {
    analytics.portfolioUniqueVisitors.push(visitorId);
    saveAnalytics(analytics);
  }

  return res.status(200).json({
    tracked: true,
    uniquePortfolioVisits: analytics.portfolioUniqueVisitors.length,
  });
});

app.post('/api/analytics/link-click', (req, res) => {
  const { linkId, label, url } = req.body || {};
  if (typeof linkId !== 'string' || !linkId.trim()) {
    return res.status(400).json({ message: 'linkId is required.' });
  }

  const visitorId = getOrSetVisitorId(req, res);
  const analytics = loadAnalytics();

  if (!analytics.linkClicks[linkId]) {
    analytics.linkClicks[linkId] = {
      label: typeof label === 'string' && label.trim() ? label.trim() : linkId,
      url: typeof url === 'string' ? url : '',
      uniqueVisitors: [],
      totalClicks: 0,
    };
  }

  const entry = analytics.linkClicks[linkId];
  entry.totalClicks += 1;
  if (!entry.uniqueVisitors.includes(visitorId)) {
    entry.uniqueVisitors.push(visitorId);
  }

  saveAnalytics(analytics);

  return res.status(200).json({ tracked: true });
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!contactTransport || !smtpFrom) {
    return res.status(503).json({
      message: 'Contact service is not configured. Please email contact@dave-parisi.com directly.',
    });
  }

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ message: 'Name is required.' });
  }

  if (typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ message: 'A valid email address is required.' });
  }

  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ message: 'Message is required.' });
  }

  const safeName = name.trim().slice(0, 120);
  const safeEmail = email.trim().slice(0, 255);
  const safeSubject = typeof subject === 'string' && subject.trim()
    ? subject.trim().replace(/[\r\n]+/g, ' ').slice(0, 180)
    : 'Portfolio contact request';
  const safeMessage = message.trim().slice(0, 5000);

  try {
    await contactTransport.sendMail({
      from: smtpFrom,
      to: contactToEmail,
      replyTo: `${safeName} <${safeEmail}>`,
      subject: `[Portfolio Contact] ${safeSubject}`,
      text: [
        'New portfolio contact form submission',
        '',
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        `Subject: ${safeSubject}`,
        '',
        'Message:',
        safeMessage,
      ].join('\n'),
    });

    return res.status(200).json({ sent: true });
  } catch {
    return res.status(502).json({ message: 'Unable to send message right now. Please try again later.' });
  }
});

app.post('/api/admin/login', loginLimiter, (req, res) => {
  const { email, password } = req.body || {};

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Invalid request payload.' });
  }

  if (email.trim() !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid administrator credentials.' });
  }

  const token = jwt.sign({ role: 'administrator', email: adminEmail }, jwtSecret, {
    expiresIn: '2h',
    issuer: 'portfolio-auth',
  });

  res.cookie('admin_session', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 2 * 60 * 60 * 1000,
    path: '/',
  });

  return res.status(200).json({ authenticated: true, role: 'administrator' });
});

app.post('/api/admin/logout', (_req, res) => {
  res.clearCookie('admin_session', {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    path: '/',
  });

  return res.status(200).json({ authenticated: false });
});

app.get('/api/admin/session', (req, res) => {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ authenticated: false });
  }

  return res.status(200).json({ authenticated: true, role: 'administrator' });
});

app.get('/api/admin/analytics', requireAdmin, (_req, res) => {
  const analytics = loadAnalytics();
  const mergedLinks = { ...analytics.linkClicks };

  for (const [linkId, defaults] of Object.entries(DEFAULT_TRACKED_LINKS)) {
    if (!mergedLinks[linkId]) {
      mergedLinks[linkId] = {
        label: defaults.label,
        url: defaults.url,
        uniqueVisitors: [],
        totalClicks: 0,
      };
    }
  }

  const links = Object.entries(mergedLinks)
    .map(([linkId, value]) => ({
      linkId,
      label: value.label || linkId,
      url: value.url || '',
      uniqueClicks: Array.isArray(value.uniqueVisitors) ? value.uniqueVisitors.length : 0,
      totalClicks: Number(value.totalClicks || 0),
    }))
    .sort((a, b) => b.uniqueClicks - a.uniqueClicks || b.totalClicks - a.totalClicks);

  return res.status(200).json({
    portfolioUniqueVisits: analytics.portfolioUniqueVisitors.length,
    links,
    generatedAt: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Auth server running on http://localhost:${port}`);
});

import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import flaskLogo from './assets/flask.svg';
import javaScriptLogo from './assets/javascript.svg';
import html5Logo from './assets/html5.svg';
import cssLogo from './assets/css.svg';
import gitLogo from './assets/git.svg';
import gitHubLogo from './assets/github.svg';
import gitHubPagesLogo from './assets/githubpages.svg';
import leetCodeLogo from './assets/leetcode.svg';
import arcGisLogo from './assets/arcgis.svg';
import pythonLogo from './assets/python.svg';
import mySqlLogo from './assets/mysql.svg';
import godotLogo from './assets/godot.svg';
import javaLogo from './assets/java.svg';
import cppLogo from './assets/cpp.svg';
import gitLabLogo from './assets/gitlab.svg';
import nodeLogo from './assets/nodejs.svg';
import renderLogo from './assets/render.svg';
import {
  navigation,
  projects,
  skillGroups,
  skillPlaybook,
  currentlyExploring,
  experience,
  education,
  stats,
} from './data/portfolioData';
import './App.css';

const skillIconMap = {
  react: reactLogo,
  flask: flaskLogo,
  javascript: javaScriptLogo,
  html5: html5Logo,
  css: cssLogo,
  git: gitLogo,
  github: gitHubLogo,
  githubpages: gitHubPagesLogo,
  leetcode: leetCodeLogo,
  arcgis: arcGisLogo,
  python: pythonLogo,
  mysql: mySqlLogo,
  godot: godotLogo,
  java: javaLogo,
  cpp: cppLogo,
  gitlab: gitLabLogo,
  nodejs: nodeLogo,
  render: renderLogo,
};

const sectionContent = {
  introduction: {
    eyebrow: 'Introduction',
    title: 'Dave Parisi, MS',
    subtitle: 'Building scalable and efficient software with purpose and precision.',
    body:
      'I am a junior software engineer focused on full-stack development with React, Python, FastAPI/Flask, and SQL. I build practical, maintainable applications that prioritize clean architecture, reliable performance, and clear user experience.',
    actions: [
      {
        label: 'Download Resume',
        href: '/DaveParisiResumeFromPortfolio.pdf',
        variant: 'primary',
        download: true,
      },
      { label: 'Send Email', href: 'mailto:contact@dave-parisi.com', variant: 'secondary' },
    ],
  },
  about: {
    eyebrow: 'About Me',
    title: 'Building thoughtful software with product-minded thinking.',
    body:
      'I am a junior software engineer focused on building reliable full-stack applications with React, FastAPI/Flask, Python, SQL, and REST APIs. Through hands-on project delivery, graduate-level tutoring in software engineering topics, and prior quality-focused production environments, I have built a strong foundation in clean architecture, debugging, and shipping maintainable solutions that solve real user problems.',
  },
  projects: {
    eyebrow: 'Projects',
    title: 'Selected work.',
    grid: projects,
  },
  skills: {
    eyebrow: 'Skills & Tools',
    title: 'Technologies I use to build and ship.',
    groups: skillGroups,
  },
  currentlyExploring: {
    eyebrow: 'Currently Exploring',
    title: 'What I am actively learning right now.',
    items: currentlyExploring,
  },
  experience: {
    eyebrow: 'Experience',
    title: 'Career highlights.',
    items: experience,
  },
  education: {
    eyebrow: 'Education',
    title: 'Academic background.',
    items: education,
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Let’s build something meaningful.',
    links: [
      { label: 'contact@dave-parisi.com', href: 'mailto:contact@dave-parisi.com' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dave-parisi' },
      { label: 'GitHub', href: 'https://github.com/daveparisi8' },
    ],
  },
  stats: {
    eyebrow: 'Stats',
    title: 'Quick snapshot.',
    stats,
  },
};

function App() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchActiveIndex, setSearchActiveIndex] = useState(0);
  const [expandedPlaybookId, setExpandedPlaybookId] = useState(null);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [githubRepoCount, setGithubRepoCount] = useState('...');

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  useEffect(() => {
    let isActive = true;

    const fetchRepoCount = async () => {
      try {
        const response = await window.fetch('https://api.github.com/users/daveparisi8');
        if (!response.ok) {
          throw new Error('Unable to fetch GitHub profile');
        }

        const profile = await response.json();
        if (isActive && typeof profile.public_repos === 'number') {
          setGithubRepoCount(String(profile.public_repos));
        }
      } catch (error) {
        if (isActive) {
          setGithubRepoCount('N/A');
        }
      }
    };

    fetchRepoCount();

    return () => {
      isActive = false;
    };
  }, []);

  const filteredNavigation = navigation.filter((item) => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return true;

    return (
      item.label.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    setSearchActiveIndex(0);
  }, [searchTerm]);

  const handleSectionSelect = (sectionId) => {
    setActiveSection(sectionId);
    setActiveProjectId(null);
    setSearchTerm('');
    setSearchActiveIndex(0);
  };

  const handleSearchKeyDown = (event) => {
    if (!searchTerm) {
      return;
    }

    if (!filteredNavigation.length) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setSearchTerm('');
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSearchActiveIndex((current) => (current + 1) % filteredNavigation.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSearchActiveIndex((current) =>
        current === 0 ? filteredNavigation.length - 1 : current - 1
      );
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const selectedItem = filteredNavigation[searchActiveIndex] || filteredNavigation[0];
      if (selectedItem) {
        handleSectionSelect(selectedItem.id);
      }
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setSearchTerm('');
      setSearchActiveIndex(0);
    }
  };

  const activeProject = activeProjectId
    ? sectionContent.projects.grid.find((project) => project.id === activeProjectId)
    : null;

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const activeContent = sectionContent[activeSection];

  return (
    <div className={isLightTheme ? 'portfolio-shell light-theme' : 'portfolio-shell'}>
      <aside className="sidebar" aria-label="Sidebar navigation">
        <div className="brand-row">
          <div className="brand-mark" aria-hidden="true">
            <img src="/slash-favicon.svg" alt="" />
          </div>
          <span className="brand-name">dave-parisi.com</span>
        </div>

        <div className="section-header sidebar-section-header">Sections</div>

        <nav className="side-nav" aria-label="Main sections">
          {(searchTerm ? filteredNavigation : navigation).map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeSection === item.id ? 'nav-item active' : 'nav-item'}
              aria-current={activeSection === item.id ? 'page' : undefined}
              onClick={() => handleSectionSelect(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="content-panel">
        <header className="topbar">
          <div className="topbar-left">
            <button type="button" className="topbar-link" onClick={() => handleSectionSelect('introduction')}>
              <span className="topbar-slash" aria-hidden="true">/</span>
              Home
            </button>
            <a
              className="topbar-link muted"
              href="https://www.linkedin.com/in/dave-parisi"
              target="_blank"
              rel="noreferrer"
            >
              <span className="topbar-slash" aria-hidden="true">/</span>
              LinkedIn
            </a>
            <a className="topbar-link muted" href="/DaveParisiResumeFromPortfolio.pdf" download>
              <span className="topbar-slash" aria-hidden="true">/</span>
              Resume
            </a>
          </div>

          <div className="topbar-tools" aria-label="Quick actions">
            <div className="search-wrapper">
              <input
                type="text"
                className="search-box"
                aria-label="Search sections"
                placeholder="Search sections..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onKeyDown={handleSearchKeyDown}
              />
              <span className="search-shortcut">⌘K</span>

              {searchTerm && (
                <div className="search-dropdown" role="listbox" aria-label="Matching sections">
                  {filteredNavigation.length > 0 ? (
                    <>
                      {filteredNavigation.map((item, index) => (
                        <button
                          key={item.id}
                          type="button"
                          role="option"
                          aria-selected={searchActiveIndex === index}
                          className={searchActiveIndex === index ? 'search-option active' : 'search-option'}
                          onClick={() => handleSectionSelect(item.id)}
                        >
                          {item.label}
                        </button>
                      ))}
                      <div className="search-hint" aria-hidden="true">
                        <span>Enter to open</span>
                        <span>Esc to close</span>
                      </div>
                    </>
                  ) : (
                    <div className="search-empty">No matching sections</div>
                  )}
                </div>
              )}
            </div>
            <div className="status-pill">
              <span className="status_dot" aria-hidden="true" />
              <span>{formattedTime}</span>
            </div>
            <div className="icon-cluster" aria-label="Theme and notifications">
              <button type="button" aria-label="Toggle theme" onClick={() => setIsLightTheme((current) => !current)}>
                {isLightTheme ? '☀' : '☼'}
              </button>
            </div>
          </div>
        </header>

        <div className="frame-shell">
          <section
            className={[
              'active-frame',
              activeSection === 'experience' ? 'experience-scrollable' : '',
              activeSection === 'skills' ? 'skills-scrollable' : '',
              activeSection === 'projects' && activeProject ? 'projects-scrollable' : '',
            ].filter(Boolean).join(' ')}
            aria-live="polite"
          >
            <div className="frame-header">
              <p className="eyebrow">{activeContent.eyebrow}</p>
            </div>

            {activeSection === 'introduction' && (
              <>
                <h1>{activeContent.title}</h1>
                <h2>{activeContent.subtitle}</h2>
                <p>{activeContent.body}</p>
                <div className="cta-row">
                  {activeContent.actions.map((action) => (
                    <a
                      key={action.label}
                      href={action.href}
                      download={action.download ? '' : undefined}
                      className={action.variant === 'primary' ? 'primary-btn' : 'secondary-btn'}
                    >
                      {action.label} {action.variant === 'primary' ? '⌁' : '✉'}
                    </a>
                  ))}
                </div>
              </>
            )}

            {activeSection === 'about' && (
              <>
                <h3>{activeContent.title}</h3>
                <p>{activeContent.body}</p>
              </>
            )}

            {activeSection === 'projects' && (
              <>
                {activeProject ? (
                  <div className="project-detail-view">
                    <button
                      type="button"
                      className="project-back-btn"
                      onClick={() => setActiveProjectId(null)}
                    >
                      ← Back to projects
                    </button>

                    <h3>{activeProject.name}</h3>
                    <p className="project-detail-summary">{activeProject.summary}</p>
                    <p className="project-detail-overview">{activeProject.overview}</p>
                    <h4 className="project-detail-heading">Outcome</h4>
                    <p className="project-detail-overview">{activeProject.outcome}</p>

                    <h4 className="project-detail-heading">Tech Stack</h4>
                    <div className="tag-row">
                      {activeProject.stack.map((item) => (
                        <span key={item} className="tag">{item}</span>
                      ))}
                    </div>

                    <div className="project-detail-grid">
                      <section>
                        <h4 className="project-detail-heading">Features</h4>
                        <ul className="project-list">
                          {activeProject.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      </section>

                      <section>
                        <h4 className="project-detail-heading">Challenges</h4>
                        <ul className="project-list">
                          {activeProject.challenges.map((challenge) => (
                            <li key={challenge}>{challenge}</li>
                          ))}
                        </ul>
                      </section>

                      <section>
                        <h4 className="project-detail-heading">Learnings</h4>
                        <ul className="project-list">
                          {activeProject.learnings.map((learning) => (
                            <li key={learning}>{learning}</li>
                          ))}
                        </ul>
                      </section>

                      <section>
                        <h4 className="project-detail-heading">Links</h4>
                        <div className="project-links">
                          {activeProject.links.live && (
                            <a href={activeProject.links.live} target="_blank" rel="noreferrer" className="primary-btn">Live ↗</a>
                          )}
                          {activeProject.links.github && (
                            <a href={activeProject.links.github} target="_blank" rel="noreferrer" className="secondary-btn">GitHub ↗</a>
                          )}
                        </div>
                      </section>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3>{activeContent.title}</h3>
                    <div className="project-grid">
                      {activeContent.grid.map((project) => (
                        <button
                          key={project.id}
                          type="button"
                          className="project-card project-card-button"
                          onClick={() => setActiveProjectId(project.id)}
                          aria-label={`Open details for ${project.name}`}
                        >
                          <h4>{project.name}</h4>
                          <p>{project.summary}</p>
                          <p className="project-metric">{project.metric}</p>
                          <div className="tag-row">
                            {project.stack.map((item) => (
                              <span key={item} className="tag">{item}</span>
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {activeSection === 'skills' && (
              <>
                <h3>{activeContent.title}</h3>
                <div className="skill-groups">
                  {activeContent.groups.map((group) => (
                    <section key={group.title} className="skill-group">
                      <h4>{group.title}</h4>
                      <div className="tag-row large-gap">
                        {group.items.map((skill) => {
                          const skillIconSrc = skillIconMap[skill.icon];
                          return (
                            <span key={skill.label} className="tag skill-tag">
                              <span className="skill-tag-icon" aria-hidden="true">
                                {skillIconSrc ? <img src={skillIconSrc} alt="" /> : <span className="skill-text-icon">/</span>}
                              </span>
                              <span>{skill.label}</span>
                            </span>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
                <section className="skill-playbook" aria-label="Engineering playbook details">
                  <h4>Engineering Playbook</h4>
                  <p className="skill-playbook-intro">
                    Deep-dive competencies are organized by category to keep this section scannable.
                  </p>
                  <div className="playbook-list">
                    {skillPlaybook.map((group) => {
                      const isExpanded = expandedPlaybookId === group.id;
                      return (
                        <article key={group.id} className={isExpanded ? 'playbook-card expanded' : 'playbook-card'}>
                          <button
                            type="button"
                            className="playbook-toggle"
                            aria-expanded={isExpanded}
                            onClick={() => setExpandedPlaybookId(isExpanded ? null : group.id)}
                          >
                            <span>{group.title}</span>
                            <span className="playbook-meta">{group.items.length} items</span>
                          </button>
                          {isExpanded && (
                            <ul className="playbook-items">
                              {group.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </section>
              </>
            )}

            {activeSection === 'currentlyExploring' && (
              <>
                <h3>{activeContent.title}</h3>
                <section className="currently-exploring" aria-label="Currently exploring topics">
                  <div className="exploring-grid">
                    {activeContent.items.map((item) => (
                      <article key={item.id} className="exploring-card">
                        <p className="exploring-track">{item.track}</p>
                        <h5>{item.topic}</h5>
                        <p className="exploring-reason">{item.reason}</p>
                      </article>
                    ))}
                  </div>
                </section>
              </>
            )}

            {activeSection === 'experience' && (
              <>
                <h3>{activeContent.title}</h3>
                <div className="timeline">
                  {activeContent.items.map((item) => (
                    <div key={item.title} className="timeline-item">
                      <div className="timeline-marker" aria-hidden="true" />
                      <div className="timeline-content">
                        <div className="timeline-topline">
                          <strong>{item.title}</strong>
                          <span>{item.period}</span>
                        </div>
                        <div className="timeline-meta">
                          <p className="timeline-company">{item.company}</p>
                          {item.location && <p className="timeline-location">{item.location}</p>}
                        </div>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeSection === 'education' && (
              <>
                <h3>{activeContent.title}</h3>
                <div className="timeline">
                  {activeContent.items.map((item) => (
                    <div key={item.title} className="timeline-item">
                      <div className="timeline-marker" aria-hidden="true" />
                      <div className="timeline-content">
                        <div className="timeline-topline">
                          <strong>{item.title}</strong>
                          <span>{item.period}</span>
                        </div>
                        <p className="timeline-company">{item.institution}</p>
                        {item.description && <p>{item.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeSection === 'contact' && (
              <>
                <h3>{activeContent.title}</h3>
                <div className="contact-links">
                  {activeContent.links.map((link) => (
                    <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </>
            )}

            {activeSection === 'stats' && (
              <>
                <h3>{activeContent.title}</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <strong>{githubRepoCount}</strong>
                    <span>Repositories on GitHub</span>
                  </div>
                  {activeContent.stats.map((stat) => (
                    <div key={stat.label} className={stat.className ? `stat-item ${stat.className}` : 'stat-item'}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;

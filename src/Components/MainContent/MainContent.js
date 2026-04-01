import { useState } from 'react';
import './MainContent.css';
import { ReactComponent as ReactLogo } from '../../assets/react.svg';
import { ReactComponent as FlaskLogo } from '../../assets/flask.svg';
import { ReactComponent as JavaScriptLogo } from '../../assets/javascript.svg';
import { ReactComponent as HTML5Logo } from '../../assets/html5.svg';
import { ReactComponent as CSSLogo } from '../../assets/css.svg';
import { ReactComponent as GitLogo } from '../../assets/git.svg';
import { ReactComponent as GitHubLogo } from '../../assets/github.svg';
import { ReactComponent as GitHubPagesLogo } from '../../assets/githubpages.svg';
import { ReactComponent as LeetCodeLogo } from '../../assets/leetcode.svg';
import { ReactComponent as ArcGISLogo } from '../../assets/arcgis.svg';
import { ReactComponent as PythonLogo } from '../../assets/python.svg';
import { ReactComponent as MySQLLogo } from '../../assets/mysql.svg';
import { ReactComponent as GodotLogo } from '../../assets/godot.svg';
import { ReactComponent as JavaLogo } from '../../assets/java.svg';
import { ReactComponent as CppLogo } from '../../assets/cpp.svg';
import { ReactComponent as GitLabLogo } from '../../assets/gitlab.svg';
import { ReactComponent as NodeLogo } from '../../assets/nodejs.svg';
import { ReactComponent as ProToolsLogo } from '../../assets/protools.svg';
import { ReactComponent as ReaperLogo } from '../../assets/reaper.svg';
import { ReactComponent as NativeInstrumentsLogo } from '../../assets/nativeinstruments.svg';
import { ReactComponent as ExESSLogo } from '../../assets/exess.svg';
import { ReactComponent as D365FOLogo } from '../../assets/d365fo.svg';
import { ReactComponent as NavisionLogo } from '../../assets/navision.svg';
import { ReactComponent as RenderLogo } from '../../assets/render.svg';

import SpaceBackground from './SpaceBackground';
import BlogSection from '../Blog/BlogSection';

function MainContent({ viewMode, onTrackLinkClick }) {
  const [activeAboutTab, setActiveAboutTab] = useState('professional');

  const technologyGroups = [
    {
      category: 'Languages',
      items: [
        { label: 'Python', Icon: PythonLogo, color: '#3776ab' },
        { label: 'Java', Icon: JavaLogo, color: '#f89820' },
        { label: 'C++', Icon: CppLogo, color: '#00599c' },
        { label: 'JavaScript', Icon: JavaScriptLogo, color: '#f7df1e' },
        { label: 'HTML5', Icon: HTML5Logo, color: '#e34f26' },
        { label: 'CSS', Icon: CSSLogo, color: '#1572b6' },
      ],
    },
    {
      category: 'Frameworks and Engines',
      items: [
        { label: 'React', Icon: ReactLogo, color: '#61dafb' },
        { label: 'Flask', Icon: FlaskLogo, color: '#f5f5f5' },
        { label: 'Node.js', Icon: NodeLogo, color: '#3c873a' },
        { label: 'Godot', Icon: GodotLogo, color: '#4e95d8' },
      ],
    },
    {
      category: 'Data and Platforms',
      items: [
        { label: 'MySQL', Icon: MySQLLogo, color: '#00618a' },
        { label: 'ArcGIS', Icon: ArcGISLogo, color: '#2a84ff' },
        { label: 'Render', Icon: RenderLogo, color: '#46e3b7' },
        { label: 'GitHub Pages', Icon: GitHubPagesLogo, color: '#f0f6fc' },
      ],
    },
    {
      category: 'Developer Tools',
      items: [
        { label: 'Git', Icon: GitLogo, color: '#f05033' },
        { label: 'GitHub', Icon: GitHubLogo, color: '#f0f6fc' },
        { label: 'GitLab', Icon: GitLabLogo, color: '#fc6d26' },
        { label: 'LeetCode', Icon: LeetCodeLogo, color: '#ffa116' },
      ],
    },
    {
      category: 'Audio Production Tools',
      items: [
        { label: 'Pro Tools', Icon: ProToolsLogo, color: '#7a56ff' },
        { label: 'REAPER', Icon: ReaperLogo, color: '#f18f01' },
        { label: 'Native Instruments', Icon: NativeInstrumentsLogo, color: '#ffffff' },
      ],
    },
    {
      category: 'Enterprise Systems',
      items: [
        { label: "Lisam ExESS", Icon: ExESSLogo, color: '#8bd3ff' },
        { label: 'D365 F&O', Icon: D365FOLogo, color: '#61b0ff' },
        { label: 'Microsoft Navision', Icon: NavisionLogo, color: '#9dc3e6' },
      ],
    },
  ];

  const engineeringFoundations = [
    {
      category: 'Core Software Engineering',
      skills: [
        'Object-Oriented Design (OOP)',
        'Data Structures and Algorithms',
        'Problem Decomposition',
        'Code Refactoring and Maintainability',
        'Debugging and Troubleshooting',
        'Test-Driven Development (TDD)',
        'Version Control (Git and GitHub)',
      ],
    },
    {
      category: 'Backend Development',
      skills: [
        'RESTful API Design',
        'Authentication and Authorization (Session-based, Token-based/JWT concepts)',
        'CRUD Operations',
        'Database Design and Schema Modeling',
        'JSON Data Handling',
        'Input Validation and Error Handling',
        'Environment-Based Configuration (.env)',
        'Logging and Basic Monitoring',
      ],
    },
    {
      category: 'Databases and Data Handling',
      skills: [
        'Relational Databases (SQL fundamentals)',
        'File-Based Storage (JSON persistence)',
        'Data Modeling and Relationships',
        'Query Optimization (basic)',
      ],
    },
    {
      category: 'Frontend Development',
      skills: [
        'React (Component-based architecture)',
        'State Management (useState, props)',
        'Form Handling and Validation',
        'API Integration (fetch / axios)',
        'Responsive UI Design (basic CSS)',
      ],
    },
    {
      category: 'Full-Stack Development',
      skills: [
        'Frontend and Backend Integration',
        'API Consumption and Data Flow',
        'Separation of Concerns',
        'Modular Architecture',
        'Project Structuring (frontend/backend split)',
      ],
    },
    {
      category: 'Python Development',
      skills: [
        'CLI Application Development',
        'File I/O Operations',
        'Working with APIs',
        'Virtual Environments',
        'Dependency Management (requirements.txt)',
      ],
    },
    {
      category: 'Tools and Workflow',
      skills: [
        'Git (branching, merging, rebasing basics)',
        'GitHub (repos, collaboration, version tracking)',
        'Postman (API testing and debugging)',
        'Command Line / Terminal',
        'VS Code / IDE usage',
      ],
    },
    {
      category: 'Project-Specific Skills',
      skills: [
        'Game Logic Design (state, mechanics)',
        'Data-Driven Design (JSON-based systems)',
        'Asset Management',
        'Application Architecture Design',
        'Feature Planning and Iteration',
      ],
    },
    {
      category: 'Soft Engineering Skills',
      skills: [
        'Technical Problem Solving',
        'Independent Learning',
        'Debugging Complex Systems',
        'Breaking Down Ambiguous Problems',
      ],
    },
    {
      category: 'Optional Enhancements',
      skills: [
        'Basic Security Practices',
        'API Testing Strategies',
        'Code Documentation',
        'Agile / Iterative Development',
      ],
    },
    {
      category: 'Sound Design Integration (Game Development)',
      skills: [
        'Integrated sound effects and music into gameplay systems to enhance player feedback and immersion',
        'Implemented event-driven audio (triggering sounds on actions like attacks, menu navigation, and collisions)',
        'Designed and edited audio assets using DAW tools (for example, REAPER) for in-game use',
        'Managed audio assets (SFX, music, ambient sounds) with organized file structures for scalability',
        'Controlled audio playback (volume, looping, layering) based on game state and user interaction',
        'Synced sound effects with animations and timing systems for responsive gameplay feel',
        'Optimized audio files for performance (compression, format selection) to reduce memory usage',
        'Implemented basic audio mixing and balancing to maintain clarity across multiple sound sources',
        'Debugged and tested audio triggers to ensure consistency across gameplay scenarios',
      ],
    },
  ];

  const managementLeadership = [
    {
      category: 'Core Management',
      skills: [
        'Team Leadership and Supervision',
        'Cross-Functional Collaboration',
        'Task Prioritization and Delegation',
        'Performance Monitoring and Accountability',
        'Conflict Resolution',
      ],
    },
    {
      category: 'Process and Operations',
      skills: [
        'Process Improvement (Lean Six Sigma Yellow Belt)',
        'Workflow Optimization',
        'Standard Operating Procedures (SOPs)',
        'Quality Control and Compliance (cGMP experience)',
        'Root Cause Analysis',
      ],
    },
    {
      category: 'Project and Execution',
      skills: [
        'Project Planning and Coordination',
        'Agile / Iterative Development Mindset',
        'Time Management and Deadline Tracking',
        'Risk Identification and Mitigation',
        'Resource Allocation',
      ],
    },
    {
      category: 'Communication',
      skills: [
        'Technical Communication',
        'Stakeholder Communication',
        'Documentation and Reporting',
        'Training and Mentorship',
      ],
    },
    {
      category: 'Analytical Thinking',
      skills: [
        'Data-Driven Decision Making',
        'Problem Analysis and Troubleshooting',
        'Continuous Improvement Mindset',
      ],
    },
  ];

  const projects = [
    {
      title: 'Pokedex (React + FastAPI), Deployed by Render',
      subtitle: 'Interactive full-stack Pokedex with account login, version-aware encounter lookup, route filtering, movesets, and team analysis backed by live PokeAPI data. Some features may be disabled, delayed or slowed down as the spinup time can take up to 60 seconds for certain requests.',
      stack: ['React', 'JavaScript', 'FastAPI', 'Python'],
      demoUrl: process.env.REACT_APP_POKEDEX_DEMO_URL || 'https://pokedex-frontend-ejys.onrender.com',
      demoTitle: 'Pokedex Production Demo',
      repoUrl: 'https://github.com/Daveparisi8/pkmn',
      repoLabel: 'View Pokedex Repository',
      linkId: 'project-pokedex-fullstack-repo',
    },
    {
      title: 'CrossFit Training Manager (React + Flask + MySQL)',
      subtitle: 'Full-stack fitness application with runtime database configuration, exercise movement management, dynamic workout generation, and customizable training recommendations. Built as a course project for Database Principles.',
      stack: ['React', 'JavaScript', 'Flask', 'Python', 'MySQL'],
      demoUrl: process.env.REACT_APP_CROSSFIT_DEMO_URL || 'https://crossfit-frontend-ejys.onrender.com',
      demoTitle: 'CrossFit App Production Demo',
      repoUrl: 'https://github.com/Daveparisi8/CrossFitApp',
      repoLabel: 'View CrossFit Repository',
      linkId: 'project-crossfit-fullstack-repo',
    },
  ];

  const resumeSections = [
    {
      category: 'Education',
      items: [
        {
          school: 'Merrimack College',
          location: 'North Andover, MA',
          date: '2026',
          degree: 'Master of Science in Computer Science',
          concentration: 'Concentration in Software Engineering',
          courses: [
            'Foundations of Programming',
            'Algorithms and Discrete Structures',
            'Advanced Algorithms',
            'Language, Automata and Decidability',
            'Database Principles',
            'Software Design and Documentation',
            'System and Languages Survey',
            'Advanced Programming Concepts',
          ],
        },
        {
          school: 'Bridgewater State University',
          location: 'Bridgewater, MA',
          date: '2018',
          degree: 'Bachelor of Science in Biology',
          undergraduateHighlights: [
            {
              title: 'Undergraduate Research Associate',
              institution: 'Bridgewater State University',
              timeframe: '2016-2018',
              description:
                'Conducted guided research under Conservation Biologist Dr. Thilina Surasinghe surveying local reptile species, followed by analysis and drafting scientific results.',
            },
            {
              title: 'ATP Award Summer Research Grant Recipient',
              institution: 'Bridgewater State University',
              timeframe: '2017',
              description:
                'Conducted independent research funded by BSU through a selective application process.',
              presentations: [
                'Northeast Natural History Conference - Burlington, VT (2017)',
                'The Wildlife Society Conference - Cleveland, OH (2018)',
              ],
            },
            {
              title: 'Officer, National Honor Society (BSU Chapter)',
              institution: 'Bridgewater State University',
              timeframe: '2018',
              description:
                'Served as Secretary officer of the local chapter of the National Biological Honor Society (3B).',
            },
          ],
        },
      ],
    },
    {
      category: 'Work Experience',
      items: [
        {
          company: 'Cambridge Isotope Laboratories',
          location: 'Andover, MA',
          title: 'Documentation Manager',
          date: '2023-2026',
          highlights: [
            'Directed an 8-person documentation team in producing and managing compliant customer deliverables (SDSs, COAs) via structured workflows and internal systems, prioritizing accuracy, version control, and deadline adherence.',
            'Partnered cross-functionally with supply chain and quality stakeholders to streamline document processes, ensuring regulatory compliance and traceability.',
          ],
        },
        {
          company: 'Element Materials Technology',
          location: 'Acton, MA',
          title: 'Environmental Monitoring Supervisor',
          date: '2019-2023',
          highlights: [
            'Supervised a group of eight technicians conducting environmental monitoring of GMP-controlled spaces, sterile facilities, and USP <797>-compliant facilities in a microbiology contract-lab environment.',
            'Conducted initial review of certificates of analysis prior to quality review, ensuring quality and accuracy.',
            'Managed daily technician client schedules.',
            'Drafted and controlled all client-specific submittal forms used daily by technicians.',
          ],
        },
      ],
    },
    {
      category: 'Early Career',
      items: [
        {
          company: 'Bose Corporation / Randstad',
          location: 'Westborough, MA',
          title: 'Sales and Technical Solutions Level II Specialist',
          date: '2012-2016',
          highlights: [
            'Hired through Bose\'s temp-to-hire HR organization, Randstad, after a 6-month probation period.',
            'Provided technical product troubleshooting in a call-center environment, averaging 50-80 calls per day.',
            'Set up new orders, provided status updates to customers, communicated with adjacent departments regarding customer feedback, maintained proper notation of interactions, and modified billing information.',
            'Sold Bose products and provided customer service, including account modifications, in an inbound call center.',
          ],
        },
        {
          company: 'Target',
          location: 'Hanover, MA',
          title: 'Guest Services Representative',
          date: '2010-2012',
          highlights: [
            'Provided professional customer service for Guest Services and the Photo departments.',
            'Covered front-end manager breaks.',
            'Handled damaged products and hazardous materials properly during disposal.',
          ],
        },
        {
          company: 'D&B Logistics, Inc.',
          location: 'Hanover, MA',
          title: 'Customer Service Representative',
          date: '2007-2010',
          highlights: [
            'Answered and directed inbound phone calls.',
            'Assisted with opening mail and sorting freight bills.',
            'Converted freight bills to digital storage by scanning.',
            'Performed maintenance on office equipment (computers, printers, and related hardware).',
          ],
        },
      ],
    },
    {
      category: 'Certifications',
      items: [
        {
          certification: 'Six Sigma Yellow Belt',
          date: '2023',
        },
        {
          certification: 'ISO 9001 and 9000 Internal Auditor',
          date: '2023',
        },
        {
          certification: 'OSHA-10',
          date: '2022',
        },
        {
          certification: 'Safe Driving',
          date: '2021',
        },
      ],
    },
  ];

  const track = (linkId, label, url) => {
    if (typeof onTrackLinkClick === 'function') {
      onTrackLinkClick(linkId, label, url);
    }
  };

  const openTrackedExternalLink = (linkId, label, url) => {
    track(linkId, label, url);
    window.open(url, '_blank');
  };

  return (
    <div>
      <SpaceBackground />
      <div className='overlay' />

      <div id='MainContent-Wrapper'>
        {viewMode === 'administrator' && (
          <div className="admin-visit-banner">
            Administrator mode selected. Content is shown in portfolio context; admin controls are not exposed on this site.
          </div>
        )}

        {/* HERO */}
        <section id='hero'>
          <div id='MainContent-1'>
            <div id='welcome'>
              <p>
                Hello, I'm <span className="highlight">Dave</span>.
                <br /><br />
                I am a Software Engineer<br />
                and MSCS candidate.
              </p>
            </div>

            <div id='view-project'>
              <button
                className="hero-button"
                onClick={() => {
                  track('hero-about', 'Hero About', '#about-section');
                  document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                About
              </button>

              <button
                className="hero-button"
                onClick={() => {
                  track('hero-projects', 'Hero Projects', '#projects-section');
                  document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Projects
              </button>

              <button
                className="hero-button"
                onClick={() => {
                  track('hero-resume', 'Hero Resume', '#resume-section');
                  document.getElementById('resume-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Education and Work History
              </button>

              <button
                className="hero-button"
                onClick={() => {
                  track('hero-blog', 'Hero Blog', '#blog-section');
                  document.getElementById('blog-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Blog
              </button>
            </div>
          </div>
        </section>

        <div className='section-spacer' />

        {/* ABOUT SECTION WITH TABS */}
        <section id="about-section">
          <div id='about-logo'>About Me</div>

          {/* ABOUT TAB BUTTONS */}
          <div id="about-tabs">
            <button
              className={`tab-button ${activeAboutTab === 'technologies' ? 'active' : ''}`}
              onClick={() => setActiveAboutTab('technologies')}
            >
              Applied Technologies
            </button>

            <button
              className={`tab-button ${activeAboutTab === 'engineering' ? 'active' : ''}`}
              onClick={() => setActiveAboutTab('engineering')}
            >
              Engineering Foundations
            </button>

            <button
              className={`tab-button ${activeAboutTab === 'professional' ? 'active' : ''}`}
              onClick={() => setActiveAboutTab('professional')}
            >
              Management and Leadership
            </button>

            <button
              className={`tab-button ${activeAboutTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveAboutTab('personal')}
            >
              Personal
            </button>
          </div>

          {/* ABOUT TAB CONTENT */}
          <div id="about-content">
            {activeAboutTab === 'professional' && (
              <div className="about-panel">
                <h2>Management and Leadership</h2>
                <p className="engineering-subtitle">
                  Leadership and operational strengths that support delivery, execution, and team alignment.
                </p>
                <div className="engineering-dropdowns">
                  {managementLeadership.map((group) => (
                    <details className="engineering-dropdown" key={group.category}>
                      <summary>{group.category}</summary>
                      <ul className="engineering-list">
                        {group.skills.map((skill) => (
                          <li key={skill}>{skill}</li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {activeAboutTab === 'personal' && (
              <div className="about-panel">
                <h2>Personal</h2>
              </div>
            )}

            {activeAboutTab === 'technologies' && (
              <div className="about-panel">
                <h2>Applied Technologies</h2>
                <div className="tech-groups-grid">
                  {technologyGroups.map((group) => (
                    <section className="tech-group" key={group.category}>
                      <h3 className="tech-group-title">{group.category}</h3>
                      <div className="tech-grid">
                        {group.items.map((item) => (
                          <div className="tech-icon-wrapper" key={item.label} style={{ '--tech-color': item.color }}>
                            <div className="tech-icon-badge">
                              <item.Icon className="tech-stack" />
                            </div>
                            <span className="tech-label">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            )}

            {activeAboutTab === 'engineering' && (
              <div className="about-panel">
                <h2>Engineering Foundations</h2>
                <p className="engineering-subtitle">
                  Organized by area for quick review of architecture, backend, frontend, and delivery skills.
                </p>
                <div className="engineering-dropdowns">
                  {engineeringFoundations.map((group) => (
                    <details className="engineering-dropdown" key={group.category}>
                      <summary>{group.category}</summary>
                      <ul className="engineering-list">
                        {group.skills.map((skill) => (
                          <li key={skill}>{skill}</li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <div className='section-spacer' />

        {/* PROJECTS SECTION WITH TABS */}
        <section id="projects-section">
          <div id='about-logo'>Projects</div>
          <div id="project-content">
            <div className="projects-grid">
              {projects.map((project) => (
                <details className="project-dropdown" key={project.title}>
                  <summary>{project.title}</summary>
                  <div className="project-card project-card-featured">
                    <p className="Project-desc">{project.subtitle}</p>

                    <div className="project-stack-list">
                      {project.stack.map((item) => (
                        <span className="project-stack-pill" key={`${project.title}-${item}`}>{item}</span>
                      ))}
                    </div>

                    {project.demoUrl ? (
                      <div className="project-demo-wrap">
                        <iframe
                          className="project-demo-frame"
                          src={project.demoUrl}
                          title={project.demoTitle || `${project.title} Demo`}
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="project-demo-placeholder">
                        <p>Project preview coming soon.</p>
                      </div>
                    )}

                    <div className="project-actions-row">
                      {project.demoUrl && (
                        <button
                          className="hero-button project-action"
                          onClick={() => openTrackedExternalLink(`${project.linkId}-demo`, `${project.title} Demo`, project.demoUrl)}
                        >
                          Launch Full Screen Demo
                        </button>
                      )}

                      {project.repoUrl ? (
                        <button
                          className="hero-button project-action"
                          onClick={() => openTrackedExternalLink(project.linkId, project.title, project.repoUrl)}
                        >
                          {project.repoLabel}
                        </button>
                      ) : (
                        <p className="project-coming-soon">Details coming soon.</p>
                      )}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <div className='section-spacer' />

        {/* RESUME */}
        <section id="resume-section">
          <div id='about-logo'>Education and Work History</div>
          <div id='resume'>
            <div className="resume-shell">
              <p className="resume-intro">Click a section to expand resume details.</p>
              <div className="resume-dropdowns">
                {resumeSections.map((section) => (
                  <details className="resume-dropdown" key={section.category}>
                    <summary>{section.category}</summary>
                    <div className="resume-section-content">
                      {section.items.map((entry) => (
                        <article className="resume-entry" key={`${entry.school || entry.company}-${entry.date}`}>
                          {entry.school && (
                            <>
                              <div className="resume-entry-header">
                                <h3>{entry.school}</h3>
                                <div className="resume-entry-meta">
                                  {entry.location && <span className="resume-entry-location">{entry.location}</span>}
                                  <span>{entry.date}</span>
                                </div>
                              </div>
                              <p className="resume-degree">{entry.degree}</p>
                              {entry.concentration && <p className="resume-concentration">{entry.concentration}</p>}
                              {entry.courses && (
                                <>
                                  <details className="resume-courses-dropdown">
                                    <summary>MSCS Relevant Courses</summary>
                                    <ul className="resume-course-list">
                                      {entry.courses.map((course) => (
                                        <li key={course}>{course}</li>
                                      ))}
                                    </ul>
                                  </details>
                                </>
                              )}
                              {entry.undergraduateHighlights && (
                                <details className="resume-courses-dropdown">
                                  <summary>Undergraduate Research and Leadership</summary>
                                  <div className="resume-highlight-list">
                                    {entry.undergraduateHighlights.map((highlight) => (
                                      <div className="resume-highlight-item" key={`${highlight.title}-${highlight.timeframe}`}>
                                        <p className="resume-highlight-title">
                                          {highlight.title} / {highlight.institution} / {highlight.timeframe}
                                        </p>
                                        <p>{highlight.description}</p>
                                        {highlight.presentations && (
                                          <>
                                            <p className="resume-subheading">Presented Findings At</p>
                                            <ul className="resume-course-list">
                                              {highlight.presentations.map((event) => (
                                                <li key={event}>{event}</li>
                                              ))}
                                            </ul>
                                          </>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </details>
                              )}
                            </>
                          )}

                          {entry.company && (
                            <>
                              <div className="resume-entry-header">
                                <h3>{entry.company}</h3>
                                <div className="resume-entry-meta">
                                  {entry.location && <span className="resume-entry-location">{entry.location}</span>}
                                  <span>{entry.date}</span>
                                </div>
                              </div>
                              <p className="resume-degree">{entry.title}</p>
                              <details className="resume-courses-dropdown">
                                <summary>Responsibilities</summary>
                                <ul className="resume-course-list resume-work-list">
                                  {entry.highlights.map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </ul>
                              </details>
                            </>
                          )}

                          {entry.certification && (
                            <>
                              <div className="resume-entry-header">
                                <h3>{entry.certification}</h3>
                                <div className="resume-entry-meta">
                                  <span>{entry.date}</span>
                                </div>
                              </div>
                            </>
                          )}
                        </article>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className='section-spacer' />

        {/* BLOG */}
        <section id="blog-section">
          <div id='about-logo'>Blog</div>
          <div id='blog'>
            <BlogSection onTrackLinkClick={onTrackLinkClick} />
          </div>
        </section>

        {/* FOOTER */}
        <footer id='footer-links'>
          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#aaa', marginTop: '40px' }}>
            © {new Date().getFullYear()} Dave Parisi. All rights reserved.<br />
            This website was built with React and is optimized for desktop use.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default MainContent;
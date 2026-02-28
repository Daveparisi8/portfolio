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

import parrot from '../../assets/parrot.jpeg';
import pkmnlogin from '../../assets/pokelogin.png';
import pkmnpage from '../../assets/pokepage.png';
import bs1 from '../../assets/bs1.png';
import bs2 from '../../assets/bs2.png';
import bs3 from '../../assets/bs3.png';
import bank1 from '../../assets/bank1.png';
import bank2 from '../../assets/bank2.png';
import resume from '../../assets/resume.png';
import SpaceBackground from './SpaceBackground';

function MainContent() {
  const [activeAboutTab, setActiveAboutTab] = useState('professional');
  const [activeProjectTab, setActiveProjectTab] = useState('banking');

  return (
    <div>
      <SpaceBackground />
      <div className='overlay' />

      <div id='MainContent-Wrapper'>
        {/* HERO */}
        <section id='hero'>
          <div id='MainContent-1'>
            <div id='welcome'>
              <p>
                Hello, I'm <span className="highlight">Dave</span>.
                <br /><br />
                I am a full-stack developer<br />
                and MSCS candidate.
              </p>
            </div>

            <div id='view-project'>
              <button
                className="hero-button"
                onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                About
              </button>

              <button
                className="hero-button"
                onClick={() => document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Projects
              </button>

              <button
                className="hero-button"
                onClick={() => document.getElementById('resume-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Resume
              </button>

              <button
                className="hero-button"
                onClick={() => document.getElementById('blog-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Blog
              </button>
            </div>
          </div>
        </section>

        <div id='MainContent-2' />

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
              className={`tab-button ${activeAboutTab === 'opensource' ? 'active' : ''}`}
              onClick={() => setActiveAboutTab('opensource')}
            >
              Open Source Contributions
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
              Professional
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
                <h2>Professional</h2>
                <p>
                  I am a full-stack developer and Master of Science in Computer Science candidate
                  with a background in biology and biotechnology.
                </p>
                <p>
                  I build applications that combine clean code with real-world functionality,
                  from APIs to interactive frontends.
                </p>
              </div>
            )}

            {activeAboutTab === 'personal' && (
              <div className="about-panel">
                <h2>Personal</h2>
                <p>
                  When I’m not coding, I enjoy outdoor photography, hiking, and spending time with family.
                </p>
                <p>
                  Gaming and competitive fitness also help me stay creative and disciplined.
                </p>
                <img src={parrot} alt="Parrot in nature" />
              </div>
            )}

            {activeAboutTab === 'technologies' && (
              <div className="about-panel">
                <h2>Applied Technologies</h2>
                <div className="tech-grid">
                  <div className="tech-icon-wrapper">
                    <PythonLogo className="tech-stack" />
                    <span className="tech-label">Python</span>
                  </div>
                  <div className="tech-icon-wrapper">
                    <JavaScriptLogo className="tech-stack" />
                    <span className="tech-label">JavaScript</span>
                  </div>
                  <div className="tech-icon-wrapper">
                    <CSSLogo className="tech-stack" />
                    <span className="tech-label">CSS</span>
                  </div>
                  <div className="tech-icon-wrapper">
                    <HTML5Logo className="tech-stack" />
                    <span className="tech-label">HTML5</span>
                  </div>
                  <div className="tech-icon-wrapper">
                    <ReactLogo className="tech-stack" />
                    <span className="tech-label">React</span>
                  </div>
                  <div className="tech-icon-wrapper">
                    <FlaskLogo className="tech-stack" />
                    <span className="tech-label">Flask</span>
                  </div>
                  <div className="tech-icon-wrapper">
                    <GitLogo className="tech-stack" />
                    <span className="tech-label">Git</span>
                  </div>
                  <div className="tech-icon-wrapper">
                    <GitHubLogo className="tech-stack" />
                    <span className="tech-label">GitHub</span>
                  </div>
                  <div className="tech-icon-wrapper">
                    <GitHubPagesLogo className="tech-stack" />
                    <span className="tech-label">GitHub Pages</span>
                  </div>
                  <div className="tech-icon-wrapper">
                    <LeetCodeLogo className="tech-stack" />
                    <span className="tech-label">LeetCode</span>
                  </div>
                  <div className="tech-icon-wrapper">
                    <ArcGISLogo className="tech-stack" />
                    <span className="tech-label">ArcGIS</span>
                  </div>
                </div>
              </div>
            )}

            {activeAboutTab === 'opensource' && (
              <div className="about-panel">
                <h2>Open Source Contributions</h2>
                <p>
                  I contribute to projects that improve developer workflows and accessibility.
                  Open source is a powerful way to learn and collaborate.
                </p>
              </div>
            )}

            {activeAboutTab === 'engineering' && (
              <div className="about-panel">
                <h2>Engineering Foundations</h2>
                <p>
                  My engineering approach focuses on problem-solving, maintainability,
                  and delivering meaningful solutions.
                </p>
              </div>
            )}
          </div>
        </section>

        <div id='MainContent-2' />

        {/* PROJECTS SECTION WITH TABS */}
        <section id="projects-section">
          <div id='about-logo'>Projects</div>

          {/* PROJECT TAB BUTTONS */}
          <div id="project-tabs">
            <button
              className={`tab-button ${activeProjectTab === 'banking' ? 'active' : ''}`}
              onClick={() => setActiveProjectTab('banking')}
            >
              Banking App
            </button>

            <button
              className={`tab-button ${activeProjectTab === 'pokemon' ? 'active' : ''}`}
              onClick={() => setActiveProjectTab('pokemon')}
            >
              Pokémon Tracker
            </button>

            <button
              className={`tab-button ${activeProjectTab === 'battleboats' ? 'active' : ''}`}
              onClick={() => setActiveProjectTab('battleboats')}
            >
              Battle Boats & Tools
            </button>
          </div>

          {/* PROJECT CONTENT */}
          <div id="project-content">

  {activeProjectTab === 'banking' && (
    <div className="project-panel">
      <h3>CLI Banking App</h3>
      <p className='Project-desc'>
        A command-line banking system built in Python with account management and transactions.
      </p>

      <img src={bank1} alt="Banking app screenshot" />
      <img src={bank2} alt="Banking app screenshot" />

      <button
        className="hero-button project-action"
        onClick={() => window.open('https://github.com/Daveparisi8/bank-app', '_blank')}
      >
        View Banking App Repository
      </button>
    </div>
  )}

  {activeProjectTab === 'pokemon' && (
    <div className="project-panel">
      <h3>Pokémon Catch Tracker</h3>
      <p className='Project-desc'>
        A full-stack app for tracking caught Pokémon with persistent state.
      </p>

      <img src={pkmnlogin} alt="Pokémon login screen" />
      <img src={pkmnpage} alt="Pokémon tracker screen" />

      <button
        className="hero-button project-action"
        onClick={() => window.open('https://github.com/Daveparisi8/Pokemontracker', '_blank')}
      >
        View Pokémon Repository
      </button>
    </div>
  )}

  {activeProjectTab === 'battleboats' && (
    <div className="project-panel">
      <h3>Battle Boats & CLI Tools</h3>

      <p className='Project-desc'>
        A terminal-based Battleship game and additional Python CLI utilities.
      </p>

      <div id='Battleship-pictures'>
        <img src={bs1} alt="Battleship start" />
        <img src={bs2} alt="Battleship gameplay" />
        <img src={bs3} alt="Battleship end" />
      </div>

      <button
        className="hero-button project-action"
        onClick={() => window.open('https://github.com/Daveparisi8/battleship', '_blank')}
      >
        View Battle Boats Repository
      </button>

      <h3>CLI Text Editor</h3>
      <p className='Project-desc'>
        A command-line text editor with search and editing capabilities.
      </p>

      <button
        className="hero-button project-action"
        onClick={() => window.open('https://github.com/Daveparisi8/text-editor', '_blank')}
      >
        View Text Editor Repository
      </button>
    </div>
  )}

</div>
        </section>

        <div id='MainContent-2' />

        {/* RESUME */}
        <section id="resume-section">
          <div id='about-logo'>Live Resume</div>
          <div id='resume'>
            {/* <img src={resume} alt="Resume" /> */}
          </div>
        </section>

        <div id='MainContent-2' />

        {/* BLOG */}
        <section id="blog-section">
          <div id='about-logo'>Blog</div>
          <div id='blog'>
            <h1>Blog Coming Soon</h1>
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
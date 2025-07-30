import './MainContent.css'
import { ReactComponent as ReactLogo } from '../../assets/react.svg'
import { ReactComponent as FlaskLogo } from '../../assets/flask.svg'
import { ReactComponent as JavaScriptLogo } from '../../assets/javascript.svg'
import { ReactComponent as HTML5Logo } from '../../assets/html5.svg'
import { ReactComponent as CSSLogo } from '../../assets/css.svg'
import { ReactComponent as GitLogo } from '../../assets/git.svg'
import { ReactComponent as GitHubLogo } from '../../assets/github.svg'
import { ReactComponent as GitHubPagesLogo } from '../../assets/githubpages.svg'
import { ReactComponent as LeetCodeLogo } from '../../assets/leetcode.svg'
import { ReactComponent as ArcGISLogo } from '../../assets/arcgis.svg'
import { ReactComponent as PythonLogo } from '../../assets/python.svg'
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
  
    return (
        <div>
          <SpaceBackground />
          <div className='overlay'/>
            <div id='MainContent-Wrapper'>
                <div id='MainContent-1'>
                    <div id='welcome'>
                        <p>
                          Hello, I'm <span className="highlight">Dave</span>.
                          <br/><br/> I am a full-stack developer<br/> and MSCS candidate.<br/>
                        </p>
                    </div>
                    <div id='view-project'>
                        <button 
                          className="hero-button" 
                          onClick={() => {
                            const element = document.getElementById('about')
                            if(element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}>
                          About
                        </button>
                        <button 
                          className="hero-button" 
                          onClick={() => {
                            const element = document.getElementById('projects')
                            if(element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}>
                          Projects
                        </button>
                        <button 
                          className="hero-button" 
                          onClick={() => {
                            const element = document.getElementById('resume')
                            if(element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}>
                          Resume
                        </button>
                        <button 
                          className="hero-button" 
                          onClick={() => {
                            const element = document.getElementById('blog')
                            if(element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}>
                          Blog
                        </button>
                    </div>
                </div>
                <div id='MainContent-2'></div>
                <section id="about"><div id='about-logo'>About</div>
                    <div id='about-me'>
                        <div id='about-me-split-left'><div>Technologies</div>
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
                        <div id='about-me-split-cen'>
                            <p>
                                <h1>Hi there! I'm <span className="highlight">Dave Parisi</span>.</h1><br/><br/><h2>Professional.</h2> I am a full-stack developer and current Master of Science in Computer Science candidate with <br/>
                                a strong foundation in biology and biotechnology and software development.
                                <br /><br />
                                I enjoy building intuitive, responsive applications—from Flask-powered APIs to dynamic React<br/> 
                                frontends. My projects blend creativity with clean code, often incorporating data-driven features<br/> 
                                and automation to solve real-world problems and functionality.
                                <br /><br />
                                Currently, I'm working on a number of portfolio projects that showcase my versatility in full-stack<br/> 
                                engineering, and I'm actively seeking opportunities where I can apply and grow my technical skills <br/>
                                in impactful, real-world projects.
                                </p><div id='about-me-personal'>                            <p>
                               <br/><br/><h2>Personal.</h2> When I’m not building apps or debugging code,<br/><br/> you’ll probably find me outdoors taking photos, or at the gym. I’m a big fan of hiking and camping—there’s 
                               something about disconnecting in nature that helps recharge my creativity.<br/><br/> I also enjoy competitive fitness, which fuels my drive for continuous improvement and discipline, much like coding does.

                              Gaming has always been a part of my life, from classic handhelds to modern consoles, and I enjoy how it blends storytelling, design, and problem-solving—skills that 
                              translate well into software development. Most importantly, I value time with my family and strive to maintain a healthy balance between work, hobbies, and the people I care about most. <br/><br/><br/><br/>
                              <img src={parrot} alt="Pokemnon Catcher Login Image" />

                                </p></div>
                        </div>
                    </div>
                </section>

                <div id='MainContent-2'></div>
                <section id="projects"><div id='about-logo'>Projects</div>
                    <div id='projects'>
                      <div id='Project-wrapper'>
                        <div id='Project-Showcase-1'><h3>CLI Banking App </h3>
                            <p className='Project-desc'>Tech Stack: Python (OOP, CLI), datetime, random, sys<br/><br/>

                              A full-featured command-line banking system built in Python using object-oriented design. Users can securely create accounts, log in, and perform transactions such as deposits, withdrawals, PIN changes, money transfers, and ATM logic. It includes account interest calculation and coin parsing for change deposits, all backed by input validation and error handling.

                              <br/><br/>Features:<br/><br/>

                              Account creation & login via SSN/PIN<br/>

                              Deposits, withdrawals, and ATM cash breakdown<br/>

                              Intra-account transfers with balance checks<br/>

                              Monthly interest calculation<br/>

                              Coin-based deposit parser<br/>

                              PIN management and account closure<br/>

                              </p>
                            <img src={bank1} alt="Pokemnon Catcher Login Image" />
                            <img src={bank2} alt="Pokemnon Catcher Login Image" />
                          <a 
                            href="https://github.com/Daveparisi8/bank-app" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hero-button"
                          >
                            View Banking App Repository
                          </a>
                        </div>
                        <div id='Project-Showcase-2'>
                          <h3>Pokemon Catch Tracker App</h3>
                          <p className='Project-desc'>Tech Stack: React, Flask, Bootstrap, JSON, LocalStorage<br/><br/>

                              A full-stack app for tracking caught Pokémon using a personalized, interactive Pokédex. <br/>Features include 
                              secure login, persistent selection via localStorage, and optional backend syncing with <br/>Flask. 
                              Built for responsiveness, with real-time updates and smooth UI interactions.
                              <br/><br/>
                              Key Features:<br/>

                              <br/>Secure demo login<br/>

                              User-specific catch tracking<br/>

                              Persistent state with localStorage<br/>

                              Flask API for syncing<br/>

                              Responsive, click-to-toggle UI<br/>
                          </p>
                          <img src={pkmnlogin} alt="Pokemnon Catcher Login Image" />
                          <img src={pkmnpage} alt="Pokemon Catcher Landing Page" />

                          <a 
                            href="https://github.com/Daveparisi8/Pokemontracker" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hero-button"
                          >
                            View Pokemon Catch Tracker Repository
                          </a>

                        </div>
                        <div id='Project-Showcase-3'><h3>Battle Boats</h3>
                            <p className='Project-desc'>Tech Stack: Python (CLI)<br/><br/>

                                A terminal-based Battleship game where players hunt for 5 hidden ships on a 10×10 grid.<br/> Ships are randomly placed, and gameplay includes real-time hit/miss feedback, input validation, and win detection.

                                <br/><br/>Key Features:

                                <br/><br/>Random ship placement

                                <br/>Validated user input

                                <br/>CLI grid display

                                <br/>Hit/miss tracking

                                <br/>Win condition logic

                            </p>
                          <div id='Battleship-pictures'>
                          <img src={bs1} alt="Battleship game start" />
                          <img src={bs2} alt="Battleship game" />
                          <img src={bs3} alt="Battleship game end" />
                          </div>
                          <a 
                            href="https://github.com/Daveparisi8/battleship" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hero-button"
                          >
                            View Battle Boats Repository
                          </a><br/><h3>CLI Text Editor </h3>
                            <p className='Project-desc'>Tech Stack: Python (CLI), re, collections, sys<br/><br/>

                              A command-line text editor built in Python that allows users to open, modify, and analyze .txt files interactively.<br/> Features include word frequency analysis, single-word search, text replacement, addition, deletion, and custom highlighting. <br/>All operations include input validation and error handling for a smooth user experience.

                              <br/><br/>Features:<br/><br/>

                              Top 5 most common words<br/>

                              Word search with frequency count<br/>

                              Append, delete, or highlight text<br/>

                              Safe word replacement<br/>

                              Input validation with try/except handling<br/>

                              </p>
                          <a 
                            href="https://github.com/Daveparisi8/text-editor" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hero-button"
                          >
                            View Text Editor Repository
                          </a></div>
                      </div>
                    </div>
                </section>

                <div id='MainContent-2'></div>
                <section id="about"><div id='about-logo'>Resume</div>
                    <div id='resume'>
                          <img src={resume} alt="Resume 2025" />
                    </div>
                </section>
                <div id='MainContent-2'></div>
                <section id="about"><div id='about-logo'>Blog</div>
                    <div id='blog'><h1>Blog Coming Soon</h1></div>
                </section>

                <div id='footer-links'>
      `          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#aaa', marginTop: '40px' }}>
                  © {new Date().getFullYear()} Dave Parisi. All rights reserved.<br/>This website was built with React and is optimized for desktop use.
                </p>
`
                </div>
            </div>
        </div>
    )
}

export default MainContent;

export const navigation = [
  { label: 'Introduction', id: 'introduction' },
  { label: 'About Me', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills & Tools', id: 'skills' },
  { label: 'Currently Exploring', id: 'currentlyExploring' },
  { label: 'Experience', id: 'experience' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' },
  { label: 'Stats', id: 'stats' },
];

export const projects = [
  {
    id: 'crossfit-companion',
    name: 'CrossFit Companion',
    summary: 'A full-stack training planner for generating workouts, managing exercises, and personalizing fitness routines.',
    metric: 'Metric: 10+ configurable workout inputs transformed into generated training plans.',
    overview:
      'CrossFit Companion helps athletes build structured workouts from a customizable exercise library, with reliable data modeling and clean frontend-backend coordination for real-world use.',
    outcome:
      'Delivered a production-ready planning workflow that supports configurable workout generation, exercise CRUD, and stable user experience across devices.',
    stack: ['React', 'FastAPI', 'Python', 'MySQL', 'Render'],
    features: [
      'Workout generation based on user goals, equipment, and configurable training inputs',
      'Full CRUD exercise management for creating and maintaining custom movements',
      'Relational data modeling for routines, preferences, and exercise metadata',
      'Responsive frontend tied to RESTful APIs for smooth user workflows',
    ],
    challenges: [
      'Balancing flexibility in workout logic while keeping generated plans predictable and reusable',
      'Designing API contracts that support both dynamic UI rendering and maintainable backend logic',
      'Keeping exercise and plan data consistent across create/edit/delete operations',
    ],
    learnings: [
      'Improved full-stack architecture decisions for feature-rich CRUD applications',
      'Strengthened SQL schema design for extensible fitness-domain data',
      'Refined deployment and environment practices for production-ready API apps',
    ],
    links: {
      live: process.env.REACT_APP_CROSSFIT_DEMO_URL || 'https://crossfit-frontend-ejys.onrender.com',
      github: 'https://github.com/Daveparisi8/CrossFitApp',
    },
  },
  {
    id: 'termidex',
    name: 'TermiDex',
    summary: 'A game-inspired collection platform for searching, tracking, and organizing digital entries with rich metadata.',
    metric: 'Metric: 150+ indexed entities rendered with metadata-driven detail views and filtering.',
    overview:
      'TermiDex combines a polished visual interface with structured backend behavior to support scalable data exploration, clean navigation patterns, and reusable frontend components.',
    outcome:
      'Shipped a full-stack catalog experience with dynamic search and metadata-driven rendering, integrated with external APIs and deployed on Render.',
    stack: ['React', 'FastAPI', 'Python', 'REST APIs', 'Render'],
    features: [
      'Dynamic search and detail views for collection items with metadata-driven rendering',
      'Custom backend endpoints to support filtered retrieval and collection interactions',
      'Reusable UI components for consistent item cards, views, and navigation patterns',
      'External API integration and response transformation into app-ready structures',
    ],
    challenges: [
      'Normalizing third-party data into a stable internal format for frontend usage',
      'Maintaining responsive performance while rendering high-volume visual content',
      'Keeping UI consistency across multiple data states and filtering combinations',
    ],
    learnings: [
      'Deepened API consumption and transformation patterns for complex datasets',
      'Improved component architecture for scalable, design-forward React apps',
      'Strengthened end-to-end testing mindset for data-heavy user interactions',
    ],
    links: {
      live: process.env.REACT_APP_POKEDEX_DEMO_URL || 'https://pokedex-frontend-ejys.onrender.com',
      github: 'https://github.com/Daveparisi8/pkmn',
    },
  },
];

export const skillGroups = [
  {
    title: 'Languages',
    items: [
      { label: 'Python', icon: 'python' },
      { label: 'Java', icon: 'java' },
      { label: 'C++', icon: 'cpp' },
      { label: 'JavaScript', icon: 'javascript' },
      { label: 'HTML5', icon: 'html5' },
      { label: 'CSS', icon: 'css' },
    ],
  },
  {
    title: 'Frameworks and Engines',
    items: [
      { label: 'React', icon: 'react' },
      { label: 'Flask', icon: 'flask' },
      { label: 'Node.js', icon: 'nodejs' },
      { label: 'Godot', icon: 'godot' },
    ],
  },
  {
    title: 'Data and Platforms',
    items: [
      { label: 'SQL', icon: 'mysql' },
      { label: 'MySQL', icon: 'mysql' },
      { label: 'ArcGIS', icon: 'arcgis' },
      { label: 'Render', icon: 'render' },
      { label: 'GitHub Pages', icon: 'githubpages' },
    ],
  },
  {
    title: 'Developer Tools',
    items: [
      { label: 'Git', icon: 'git' },
      { label: 'GitHub', icon: 'github' },
      { label: 'GitLab', icon: 'gitlab' },
      { label: 'LeetCode', icon: 'leetcode' },
    ],
  },
  {
    title: 'Engineering Practices',
    items: [
      { label: 'Frontend and Backend Integration', icon: 'practice' },
      { label: 'API Consumption and Data Flow', icon: 'practice' },
      { label: 'Separation of Concerns', icon: 'practice' },
      { label: 'Modular Architecture', icon: 'practice' },
      { label: 'Project Structuring (frontend/backend split)', icon: 'practice' },
    ],
  },
];

export const skillPlaybook = [
  {
    id: 'core-software-engineering',
    title: 'Core Software Engineering',
    items: [
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
    id: 'backend-development',
    title: 'Backend Development',
    items: [
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
    id: 'full-stack-development',
    title: 'Full-Stack Development',
    items: [
      'Frontend and Backend Integration',
      'API Consumption and Data Flow',
      'Separation of Concerns',
      'Modular Architecture',
      'Project Structuring (frontend/backend split)',
    ],
  },
  {
    id: 'frontend-development',
    title: 'Frontend Development',
    items: [
      'React (Component-based architecture)',
      'State Management (useState, props)',
      'Form Handling and Validation',
      'API Integration (fetch / axios)',
      'Responsive UI Design (basic CSS)',
    ],
  },
  {
    id: 'databases-data-handling',
    title: 'Databases and Data Handling',
    items: [
      'Relational Databases (SQL fundamentals)',
      'File-Based Storage (JSON persistence)',
      'Data Modeling and Relationships',
      'Query Optimization (basic)',
    ],
  },
  {
    id: 'python-development',
    title: 'Python Development',
    items: [
      'CLI Application Development',
      'File I/O Operations',
      'Working with APIs',
      'Virtual Environments',
      'Dependency Management (requirements.txt)',
    ],
  },
  {
    id: 'tools-workflow',
    title: 'Tools and Workflow',
    items: [
      'Git (branching, merging, rebasing basics)',
      'GitHub (repos, collaboration, version tracking)',
      'Postman (API testing and debugging)',
      'Command Line / Terminal',
      'VS Code / IDE usage',
    ],
  },
  {
    id: 'soft-engineering-skills',
    title: 'Soft Engineering Skills',
    items: [
      'Technical Problem Solving',
      'Independent Learning',
      'Debugging Complex Systems',
      'Breaking Down Ambiguous Problems',
    ],
  },
  {
    id: 'project-specific-skills',
    title: 'Project-Specific Skills',
    items: [
      'Game Logic Design (state, mechanics)',
      'Data-Driven Design (JSON-based systems)',
      'Asset Management',
      'Application Architecture Design',
      'Feature Planning and Iteration',
    ],
  },
  {
    id: 'optional-enhancements',
    title: 'Optional Enhancements',
    items: [
      'Basic Security Practices',
      'API Testing Strategies',
      'Code Documentation',
      'Agile / Iterative Development',
    ],
  },
  {
    id: 'sound-design-integration',
    title: 'Sound Design Integration (Game Development)',
    items: [
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

export const currentlyExploring = [
  {
    id: 'react-native-mobile',
    track: 'Building',
    topic: 'Mobile development with React Native',
    reason: 'Expanding full-stack skills into native-feeling cross-platform mobile experiences.',
  },
  {
    id: 'kubernetes-orchestration',
    track: 'Learning',
    topic: 'Kubernetes fundamentals',
    reason: 'Understanding orchestration patterns for scalable and reliable application deployments.',
  },
  {
    id: 'aws-cloud',
    track: 'Exploring',
    topic: 'AWS cloud services',
    reason: 'Building cloud fluency for production architecture, deployment, and operations workflows.',
  },
];

export const experience = [
  {
    title: 'Graduate Peer Tutor',
    company: 'Merrimack College',
    period: 'Feb 2026 - May 2026',
    location: 'North Andover, MA',
    description: 'Supported graduate Computer Science students in Python, SQL, software engineering, and application development through one-on-one technical coaching. Helped students debug, design, and complete software projects while reinforcing core architecture and programming fundamentals.',
  },
  {
    title: 'Documentation Manager',
    company: 'Cambridge Isotope Laboratories',
    period: 'Jan 2023 - Feb 2026',
    location: 'Andover, MA',
    description: 'Led an 8-person documentation team responsible for customer-facing deliverables across 12,000+ items, improving quality, structure, and turnaround consistency. Managed end-to-end document lifecycle workflows and partnered with supply chain and quality teams to strengthen compliance and traceability.',
  },
  {
    title: 'EM Administrative Supervisor',
    company: 'Element Materials Technology',
    period: 'Apr 2021 - Jan 2023',
    location: 'Acton, MA',
    description: 'Oversaw EM administrative quality systems by auditing certificates, standardizing client documentation, and authoring SOPs used across daily operations. Built risk-based qualification and training programs that expanded team capacity while supporting high-quality, scalable delivery in controlled cGMP environments.',
  },
  {
    title: 'Environmental Monitoring Lead',
    company: 'Microbiology Research Associates',
    period: 'Jan 2019 - Apr 2021',
    location: 'Acton, MA',
    description: 'Led environmental monitoring operations for cleanroom and controlled-space testing, including viable and particulate sampling and USP <797> proficiency support. Coordinated schedules for 100+ clients, trained new technicians, and drove planning for large-scale EM project execution.',
  },
];

export const education = [
  {
    title: 'Merrimack College',
    institution: 'Master of Science in Computer Science; Concentration in Software Engineering',
    period: 'May 2026',
    description: '3.9 GPA',
  },
  {
    title: 'Bridgewater State University',
    institution: 'Bachelor of Science in Biology',
    period: 'December 2018',
  },
];

export const stats = [
  { value: '4+', label: 'Years building projects' },
  { value: '45K+', label: 'Annual cost savings through initiatives' },
  { value: '12K+', label: 'Unique records supported' },
  { value: 'Palm Coast', label: 'Location' },
  { value: '6+', label: 'Years of leadership and management experience', className: 'leadership-stat' },
];

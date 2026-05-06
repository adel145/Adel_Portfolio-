import {
  backend,
  bsc,
  creator,
  CYDEO,
  cpp,
  csharp,
  css,
  git,
  html,
  java,
  javascript,
  machineLearning,
  mobile,
  mongodb,
  nodejs,
  nvidia,
  PetsShop,
  Programmer,
  python,
  reactjs,
  sprintcity,
  systemTesting,
  visit,
  web,
  Welocalize,
  waitertip,
} from "../assets";

export const profileLinks = {
  github: "https://github.com/adel145",
  linkedin: "https://www.linkedin.com/in/adel-mohsen-9702aa15b/",
  email: "mailto:adelmohsen145@gmail.com",
  cv: "https://www.linkedin.com/in/adel-mohsen-9702aa15b/",
};

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Experience" },
  { id: "education", title: "Education" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

const services = [
  {
    title: "Full-Stack Developer",
    icon: web,
  },
  {
    title: "AI-Powered Apps Developer",
    icon: creator,
  },
  {
    title: "Automation Developer",
    icon: mobile,
  },
  {
    title: "Data / ML Engineer",
    icon: backend,
  },
];

const technologies = [
  { name: "React", icon: reactjs },
  { name: "JavaScript / TypeScript", icon: javascript },
  { name: "Node.js / Express", icon: nodejs },
  { name: "MongoDB", icon: mongodb },
  { name: "Python", icon: python },
  { name: "Java", icon: java },
  { name: "C++", icon: cpp },
  { name: "C#", icon: csharp },
  { name: "SQL", icon: systemTesting },
  { name: "Machine Learning", icon: machineLearning },
  { name: "Computer Vision", icon: creator },
  { name: "Automation", icon: git },
  { name: "HTML", icon: html },
  { name: "CSS / Tailwind", icon: css },
];

const experiences = [
  {
    title: "Freelance Software Developer",
    company_name: "Independent Projects",
    icon: Programmer,
    iconBg: "#E6DEDD",
    date: "2021 - Present",
    location: "Remote",
    URL: profileLinks.linkedin,
    points: [
      "Build React and Node.js applications, static portfolio sites, and practical automation tools for real product and business needs.",
      "Work across frontend UI, API design, MongoDB data models, deployment, and integrations with tools such as Shopify, AWS, Python, and n8n.",
      "Focus on clear user flows, maintainable code, and practical AI-assisted features without overstating experimental work.",
    ],
  },
  {
    title: "Founder / CEO",
    company_name: "SprintCity Courier Company",
    icon: sprintcity,
    iconBg: "#383E56",
    date: "2018 - 2020",
    location: "Tiberias, Israel",
    URL: "https://www.checkid.co.il/company/%D7%A1%D7%A4%D7%A8%D7%99%D7%A0%D7%98-%D7%A1%D7%99%D7%98%D7%99-%D7%91%D7%A2~%D7%9E-516124096",
    points: [
      "Founded and operated a courier company, managing day-to-day operations, customer relationships, scheduling, and service quality.",
      "Developed a business-first mindset that now shapes how I design software around users, reliability, and measurable outcomes.",
      "Sold my ownership stake before transitioning into Computer Science studies.",
    ],
  },
  {
    title: "Ads Quality Rater",
    company_name: "Welocalize",
    icon: Welocalize,
    iconBg: "#383E56",
    date: "2021",
    location: "Remote",
    URL: "https://www.welocalize.com/",
    points: [
      "Evaluated ad quality and search relevance against detailed guidelines in a remote, deadline-driven environment.",
      "Strengthened attention to detail, consistency, and judgment around how users interpret online content.",
    ],
  },
  {
    title: "Computer Technical Service",
    company_name: "ATRIIS Technologies",
    icon: systemTesting,
    iconBg: "#E6DEDD",
    date: "2020 - 2021",
    location: "Tiberias, Israel",
    URL: "https://www.dunsguide.co.il/",
    points: [
      "Diagnosed hardware and software issues, supported end users, and maintained computer systems in client-facing environments.",
      "Built a practical foundation in troubleshooting, documentation, and explaining technical problems clearly.",
    ],
  },
];

const projects = [
  {
    name: "Miktsoan / מקצוען",
    status: "Final CS Project",
    description:
      "A full-stack service marketplace that matches users with trusted professionals using authentication, profiles, AI text analysis, and recommendation logic.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "express", color: "green-text-gradient" },
      { name: "mongodb", color: "orange-text-gradient" },
      { name: "ai", color: "pink-text-gradient" },
    ],
    image: visit,
    source_code_link: "https://github.com/adel145",
    live_demo_link: "",
  },
  {
    name: "Crystallia",
    status: "In Progress",
    description:
      "An e-commerce and automation project combining React, Node, Shopify workflows, Python automation, and AI-assisted content operations.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "nodejs", color: "green-text-gradient" },
      { name: "shopify", color: "pink-text-gradient" },
      { name: "automation", color: "orange-text-gradient" },
    ],
    image: backend,
    source_code_link: "https://github.com/adel145",
    live_demo_link: "",
  },
  {
    name: "Tips Predictor",
    status: "ML Project",
    description:
      "A Python machine learning project for predicting tips from historical shift data, including preprocessing, model training, and practical analysis.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "machine-learning", color: "green-text-gradient" },
      { name: "data", color: "orange-text-gradient" },
    ],
    image: waitertip,
    source_code_link: "https://github.com/adel145/Tips_Predictor",
    live_demo_link: "",
  },
  {
    name: "Portfolio Website",
    status: "Live",
    description:
      "This site: a React, Vite, Tailwind, Framer Motion, and Three.js portfolio optimized for GitHub Pages and static routing.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "vite", color: "green-text-gradient" },
      { name: "threejs", color: "pink-text-gradient" },
    ],
    image: web,
    source_code_link: "https://github.com/adel145/Adel_Portfolio-",
    live_demo_link: "https://adel145.github.io/Adel_Portfolio-/",
  },
  {
    name: "Pet Shop E-Commerce",
    status: "Demo",
    description:
      "A React and Node/MongoDB e-commerce demo focused on registration, product UI, and full-stack data flow practice.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "nodejs", color: "green-text-gradient" },
      { name: "mongodb", color: "orange-text-gradient" },
    ],
    image: PetsShop,
    source_code_link: "https://adel145.github.io/Pets_Shop_Registration/",
    live_demo_link: "https://adel145.github.io/Pets_Shop_Registration/",
  },
];

const certificates = [
  {
    name: "B.Sc. Computer Science",
    college: "Sapir Academic College",
    description:
      "Computer Science student with expected graduation in 07/2026. Coursework and projects cover software engineering, algorithms, data, systems, and applied AI topics.",
    tags: [
      { name: "B.Sc.", color: "blue-text-gradient" },
      { name: "Expected 07/2026", color: "pink-text-gradient" },
    ],
    image: bsc,
    source_code_link: "https://www.sapir.ac.il/ba/computer_science",
  },
  {
    name: "Java Developer",
    college: "Cydeo",
    description:
      "Java developer training focused on object-oriented programming, backend fundamentals, and professional development practices.",
    tags: [
      { name: "java", color: "blue-text-gradient" },
      { name: "backend", color: "green-text-gradient" },
    ],
    image: CYDEO,
    source_code_link: "https://cydeo.com/program/java-developer/",
  },
  {
    name: "Deep Learning",
    college: "NVIDIA",
    description:
      "NVIDIA deep learning training covering neural networks, image processing concepts, and accelerated AI development workflows.",
    tags: [
      { name: "ai", color: "blue-text-gradient" },
      { name: "deep-learning", color: "green-text-gradient" },
    ],
    image: nvidia,
    source_code_link: "https://www.nvidia.com/en-eu/training/online/",
  },
];

export const pages = [
  {
    name: "To-Do App",
    description:
      "A focused task manager with priorities, completed states, and a clean workflow for everyday planning.",
    tags: [
      { name: "localStorage", color: "text-blue-300" },
      { name: "client-only", color: "text-green-300" },
    ],
    image: web,
    page_link: "/todo",
  },
  {
    name: "Movie App",
    description:
      "A polished movie collection demo with curated data and a lightweight detail view.",
    tags: [
      { name: "static-data", color: "text-red-300" },
      { name: "demo", color: "text-purple-300" },
    ],
    image: visit,
    page_link: "/movie-app",
  },
  {
    name: "Event Calendar",
    description:
      "A compact calendar for saving events and keeping a simple personal schedule.",
    tags: [
      { name: "calendar", color: "text-green-300" },
      { name: "localStorage", color: "text-blue-300" },
    ],
    image: mobile,
    page_link: "/event-calendar",
  },
  {
    name: "Notes App",
    description:
      "A small notes workspace for saving ideas, project reminders, and short drafts.",
    tags: [
      { name: "notes", color: "text-yellow-300" },
      { name: "client-only", color: "text-green-300" },
    ],
    image: creator,
    page_link: "/notes-app",
  },
];

export { services, technologies, experiences, projects, certificates };

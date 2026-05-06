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
  cv: "https://drive.google.com/file/d/1VQltCUnXzyQwG5-n9xPpmp1BnYWDP8BG/view?usp=sharing",
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
    title: "Full-Stack / AI Projects Developer",
    company_name: "Independent Projects / Portfolio Projects",
    icon: Programmer,
    iconBg: "#E6DEDD",
    date: "2023 - Present",
    location: "Remote",
    URL: profileLinks.linkedin,
    points: [
      "Built and maintained full-stack React and Node.js applications with MongoDB data models, authentication flows, APIs, and GitHub Pages/static deployments.",
      "Developed AI-assisted features and automation workflows using Python, LLM-assisted tools, n8n, and data-driven content/process automation.",
      "Created portfolio-ready products including Miktsoan, Crystallia, Tips Predictor, e-commerce demos, and client-side productivity apps.",
      "Practiced production-style workflows across Git/GitHub, deployment, environment variables, security cleanup, performance optimization, and responsive UI.",
    ],
  },
  {
    title: "Miktsoan / מקצוען - Final CS Project",
    company_name: "Academic Capstone / Full-Stack AI Project",
    icon: web,
    iconBg: "#E6DEDD",
    date: "2025 - 2026",
    location: "Sapir Academic College",
    URL: "https://github.com/adel145/FinalProject26_2",
    points: [
      "Developed a full-stack service marketplace connecting users with professionals using React/Vite, Node/Bun/Express, MongoDB, JWT authentication, and role-based user flows.",
      "Implemented AI text analysis, problem categorization, and recommendation logic for matching users to relevant professionals.",
      "Built product flows including user authentication, professional profiles, problem reports, leads, reviews, admin dashboard, media/gallery, and story features.",
      "Collaborated in a small team while owning major parts of architecture, backend integration, data modeling, and UI flow.",
    ],
  },
  {
    title: "Crystallia - E-Commerce & Automation Project",
    company_name: "Business / Full-Stack / Automation Project",
    icon: backend,
    iconBg: "#383E56",
    date: "2025 - Present",
    location: "Remote",
    URL: "https://www.crystalliaworld.com/",
    points: [
      "Built and operated e-commerce brand infrastructure combining Shopify, custom web work, analytics, content operations, and automation workflows.",
      "Developed automation flows using Python, n8n, and AI-assisted tools for product content, SEO text, social media workflows, and operational efficiency.",
      "Gained hands-on experience in product strategy, conversion-focused UX, marketing analytics, and business operations.",
    ],
  },
  {
    title: "Founder / CEO",
    company_name: "SprintCity Courier Company",
    icon: sprintcity,
    iconBg: "#383E56",
    date: "01/2020 - 08/2022",
    location: "Tiberias, Israel",
    URL: "https://www.checkid.co.il/company/%D7%A1%D7%A4%D7%A8%D7%99%D7%A0%D7%98-%D7%A1%D7%99%D7%98%D7%99-%D7%91%D7%A2~%D7%9E-516124096",
    points: [
      "Founded and managed a courier company, handling operations, customer relationships, scheduling, service quality, and business growth.",
      "Built practical experience in ownership, decision-making, customer service, and process optimization.",
      "Sold my ownership stake before transitioning into Computer Science and software development.",
    ],
  },
  {
    title: "Ads Quality Rater",
    company_name: "Welocalize",
    icon: Welocalize,
    iconBg: "#383E56",
    date: "2023",
    location: "Remote",
    URL: "https://www.welocalize.com/",
    points: [
      "Evaluated online advertisements and search relevance according to detailed quality guidelines.",
      "Strengthened analytical judgment, consistency, attention to detail, and understanding of user intent.",
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
    source_code_link: "https://github.com/adel145/FinalProject26_2",
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
    source_code_link: "",
    live_demo_link: "https://www.crystalliaworld.com/",
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
    source_code_link: "",
    live_demo_link: "https://adel145.github.io/Pets_Shop_Registration/",
  },
];

const certificates = [
  {
    name: "B.Sc. Computer Science",
    college: "Sapir Academic College",
    description:
      "Computer Science student with expected graduation in 07/2026. Coursework and projects cover software engineering, algorithms, databases, systems, machine learning, computer vision/image processing, numerical methods, and full-stack application development.",
    tags: [
      { name: "BSc", color: "blue-text-gradient" },
      { name: "ComputerScience", color: "green-text-gradient" },
      { name: "SoftwareEngineering", color: "orange-text-gradient" },
      { name: "Expected2026", color: "pink-text-gradient" },
    ],
    image: bsc,
    source_code_link: "https://www.sapir.ac.il/ba/computer_science",
  },
  {
    name: "Java Developer",
    college: "Cydeo",
    description:
      "Java developer training covering object-oriented programming, backend fundamentals, Java development practices, testing mindset, and professional software workflows.",
    tags: [
      { name: "java", color: "blue-text-gradient" },
      { name: "backend", color: "green-text-gradient" },
    ],
    image: CYDEO,
    source_code_link: "https://cydeo.com/program/java-developer/",
  },
  {
    name: "NVIDIA Deep Learning / Accelerated Computing",
    college: "NVIDIA",
    description:
      "NVIDIA training focused on neural networks, image processing concepts, GPU/CUDA fundamentals, and AI development workflows.",
    tags: [
      { name: "ai", color: "blue-text-gradient" },
      { name: "deep-learning", color: "green-text-gradient" },
    ],
    image: nvidia,
    source_code_link: "https://www.nvidia.com/en-eu/training/online/",
  },
  {
    name: "AI-Powered Apps Development",
    college: "Udemy",
    description:
      "Practical course focused on building AI-powered applications, integrating LLM APIs, and designing app workflows around AI features.",
    tags: [
      { name: "ai-apps", color: "blue-text-gradient" },
      { name: "llm", color: "green-text-gradient" },
      { name: "Completed 02/2026", color: "pink-text-gradient" },
    ],
    image: creator,
    source_code_link: "",
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

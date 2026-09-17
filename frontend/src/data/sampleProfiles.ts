export interface SampleProfile {
  id: string;
  name: string;
  role: string;
  targetRole: string;
  currentSkills: string;
  experienceYears: string;
  resumeText: string;
  targetJobDescription: string;
}

export const SAMPLE_PROFILES: SampleProfile[] = [
  {
    id: "swe-to-ai",
    name: "Alex Rivera",
    role: "Full-Stack Software Engineer",
    targetRole: "Senior AI Solutions Engineer",
    currentSkills: "TypeScript, React, Node.js, Express, PostgreSQL, Docker, AWS (S3/EC2), REST APIs, Git",
    experienceYears: "3",
    resumeText: `ALEX RIVERA
Full-Stack Software Engineer | San Francisco, CA | alex.rivera@example.com | github.com/alexrivera

PROFESSIONAL SUMMARY
Dynamic software engineer with 3+ years of experience engineering scalable web applications and distributed backend microservices. Skilled in TypeScript, React, Node.js, and relational database architecture. Interested in transitioning to AI systems engineering and LLM application development.

WORK EXPERIENCE
Software Engineer | CloudScale Systems | 2022 - Present
- Responsible for developing web applications and fixing bugs in the frontend and backend.
- Worked with team members to create backend APIs and integrate databases for internal reporting.
- Built reusable UI components in React and TypeScript for customer dashboard.
- Participated in weekly agile standups and code reviews with senior engineering colleagues.
- Maintained CI/CD pipelines and deployed containerized services on AWS ECS.

Junior Web Developer | Apex Interactive | 2021 - 2022
- Maintained client websites using HTML, CSS, JavaScript, and WordPress.
- Integrated third-party payment gateways including Stripe and PayPal.
- Improved site performance and conducted cross-browser compatibility testing.

EDUCATION & SKILLS
B.S. in Computer Science, University of California, Davis (2021)
Languages & Tools: JavaScript, TypeScript, Python (Basic), React, Node.js, Express, PostgreSQL, Docker, Git, RESTful APIs.`,
    targetJobDescription: `Senior AI Solutions Engineer - Generative Systems
We are seeking an AI Solutions Engineer to spearhead our generative AI platform. You will build enterprise RAG applications, orchestrate multi-agent workflows, integrate vector databases, and design resilient LLM guardrails.

Requirements:
- Proven experience with Python or TypeScript in production environments.
- Hands-on familiarity with LLM orchestration (LangChain, Google GenAI, or LlamaIndex).
- Deep understanding of vector databases (Pinecone, Chroma, pgvector), chunking, and semantic embeddings.
- Experience with cloud architecture (GCP / AWS), Docker, and microservice resilience.
- Ability to conduct architectural trade-offs around token latency, cost, and hallucination reduction.`,
  },
  {
    id: "data-analyst-to-ml",
    name: "Sarah Chen",
    role: "Data Analyst",
    targetRole: "Machine Learning / Applied AI Scientist",
    currentSkills: "Python, SQL, Pandas, NumPy, Tableau, Power BI, Scikit-Learn, Statistics, A/B Testing",
    experienceYears: "2.5",
    resumeText: `SARAH CHEN
Data Analyst & BI Specialist | New York, NY | sarah.chen@example.com

PROFESSIONAL SUMMARY
Analytical data specialist with 2.5 years experience querying large-scale datasets, architecting business intelligence dashboards, and building basic predictive models. Passionate about machine learning pipelines and deep learning.

WORK EXPERIENCE
Data Analyst | FinTech Analytics Global | 2023 - Present
- Query financial databases using SQL to generate quarterly compliance and revenue reports.
- Built 15+ automated Tableau dashboards used by senior executives for operational tracking.
- Assisted data science team in cleaning and preprocessing customer transaction data for churn modeling.
- Conducted statistical A/B test analysis on user retention experiments.

Junior Data Specialist | Insight Metrics | 2022 - 2023
- Cleaned CSV datasets with Python and Pandas for client marketing reports.
- Automated daily email report generation using Python scripts and cron jobs.

SKILLS
Python, SQL (PostgreSQL, Snowflake), Pandas, NumPy, Scikit-Learn, Matplotlib, Tableau, Excel, Git.`,
    targetJobDescription: `Machine Learning / Applied AI Engineer
Seeking an ML Engineer to develop, train, and deploy predictive models and deep learning pipelines. 
Key requirements:
- Strong Python, PyTorch or TensorFlow, and Scikit-Learn.
- Experience building end-to-end MLOps pipelines (MLflow, Kubeflow, or Docker).
- Track record of deploying machine learning models via REST APIs into cloud production.`,
  },
  {
    id: "pm-to-ai-pm",
    name: "Marcus Vance",
    role: "Technical Product Manager",
    targetRole: "Lead AI Product Manager",
    currentSkills: "Agile/Scrum, Product Roadmap, User Research, SQL, PRD Writing, Jira, Metric Analysis",
    experienceYears: "4",
    resumeText: `MARCUS VANCE
Technical Product Manager | Seattle, WA | marcus.vance@example.com

PROFESSIONAL SUMMARY
User-centric Product Manager with 4 years directing software product roadmaps from inception through launch. Adept at cross-functional leadership, data-informed prioritization, and working closely with engineering teams.

EXPERIENCE
Product Manager | NextGen SaaS | 2022 - Present
- Led cross-functional team of 8 engineers and 2 product designers to ship enterprise workflow features.
- Gathered customer requirements and translated them into detailed user stories and PRDs.
- Monitored product analytics in Mixpanel and formulated product growth experiments.
- Reduced customer onboarding friction and tracked North Star engagement metrics.

Associate Product Manager | Venture Labs | 2020 - 2022
- Managed sprint backlogs and sprint planning meetings.
- Authored release notes and coordinated with sales and marketing teams for launch readiness.`,
    targetJobDescription: `Lead AI Product Manager
Lead our AI Product initiative. You will define product strategy for cutting-edge generative AI capabilities, agentic automation, and developer-facing APIs.
Requirements:
- 4+ years in product management with tech products.
- Deep comprehension of LLM capabilities, limitations, latency/cost trade-offs, and ethical safety guardrails.
- Proven track record launching AI or ML-powered features that drove measurable user retention.`,
  },
];

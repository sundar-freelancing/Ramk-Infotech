// Internship Data Interfaces and Constants

export interface InternshipRole {
  id: string;
  name: string;
  duration: string;
  mode: "Remote" | "Hybrid" | "On-site";
  description: string;
  requirements: string[];
  icon: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Skill {
  id: string;
  name: string;
  category: "Technical" | "Soft";
  proficiency?: number; // 0-100 for progress bars
  icon: string;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
  color?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  company?: string;
  testimonial: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface CompanyCulture {
  description: string;
  values: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  address?: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

// About the Program Data
export const aboutProgram = {
  title: "About the Program",
  description:
    "Our internship program is designed to provide hands-on experience and mentorship to help you kickstart your career in technology.",
  duration: "3 months / 6 months",
  type: "Remote" as const,
  targetAudience: ["Students", "Recent Graduates", "Career Switchers"],
  companyCulture: {
    description:
      "At RamK Infotech, we foster a culture of innovation, collaboration, and continuous learning. We believe in empowering our team members to grow both professionally and personally.",
    values: [
      "Innovation & Creativity",
      "Collaboration & Teamwork",
      "Continuous Learning",
      "Work-Life Balance",
      "Diversity & Inclusion",
    ],
  } as CompanyCulture,
};

// Benefits Data
export const benefits: Benefit[] = [
  {
    id: "1",
    title: "Real-world Project Experience",
    description:
      "Work on live projects and gain hands-on experience with industry-standard tools and technologies.",
    icon: "briefcase",
  },
  {
    id: "2",
    title: "Mentorship from Industry Professionals",
    description:
      "Get guidance from experienced professionals who will help you navigate your career path.",
    icon: "users",
  },
  {
    id: "3",
    title: "Certificate of Completion",
    description:
      "Receive a recognized certificate upon successful completion of your internship program.",
    icon: "award",
  },
  {
    id: "4",
    title: "Letter of Recommendation",
    description:
      "Get a personalized letter of recommendation from your mentor to boost your career prospects.",
    icon: "file-text",
  },
  {
    id: "5",
    title: "Flexible Schedule",
    description:
      "Enjoy flexible working hours that accommodate your academic or personal commitments.",
    icon: "calendar",
  },
  {
    id: "6",
    title: "Pre-placement Offers",
    description:
      "Outstanding interns may receive pre-placement offers to join our team full-time.",
    icon: "handshake",
  },
];

// Available Internship Roles
export const internshipRoles: InternshipRole[] = [
  {
    id: "web-dev",
    name: "Web Development",
    duration: "3-6 months",
    mode: "Remote",
    description:
      "Build modern web applications using React, Next.js, and other cutting-edge technologies.",
    requirements: [
      "Basic knowledge of HTML, CSS, JavaScript",
      "Familiarity with React or willingness to learn",
      "Strong problem-solving skills",
    ],
    icon: "code",
  },
  {
    id: "ui-ux",
    name: "UI/UX Design",
    duration: "3-6 months",
    mode: "Hybrid",
    description:
      "Create beautiful and intuitive user interfaces and experiences for web and mobile applications.",
    requirements: [
      "Understanding of design principles",
      "Familiarity with design tools (Figma, Adobe XD)",
      "Creative thinking and attention to detail",
    ],
    icon: "palette",
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    duration: "3 months",
    mode: "Remote",
    description:
      "Learn and implement digital marketing strategies including SEO, SEM, and social media marketing.",
    requirements: [
      "Good communication skills",
      "Interest in marketing and analytics",
      "Basic understanding of social media platforms",
    ],
    icon: "megaphone",
  },
  {
    id: "content-writing",
    name: "Content Writing",
    duration: "3 months",
    mode: "Remote",
    description:
      "Create engaging content for blogs, websites, and social media platforms.",
    requirements: [
      "Excellent writing skills",
      "Research abilities",
      "Understanding of SEO basics",
    ],
    icon: "pen-tool",
  },
  {
    id: "mobile-dev",
    name: "Mobile App Development",
    duration: "6 months",
    mode: "Hybrid",
    description:
      "Develop mobile applications for iOS and Android using modern frameworks and tools.",
    requirements: [
      "Programming fundamentals",
      "Interest in mobile development",
      "Problem-solving mindset",
    ],
    icon: "smartphone",
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    duration: "6 months",
    mode: "Remote",
    description:
      "Analyze data, create visualizations, and derive insights to support business decisions.",
    requirements: [
      "Analytical thinking",
      "Basic knowledge of Excel or Python",
      "Attention to detail",
    ],
    icon: "bar-chart",
  },
];

// Skills You'll Learn
export const skills: Skill[] = [
  // Technical Skills
  {
    id: "html",
    name: "HTML",
    category: "Technical",
    proficiency: 90,
    icon: "code",
  },
  {
    id: "css",
    name: "CSS",
    category: "Technical",
    proficiency: 85,
    icon: "palette",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Technical",
    proficiency: 80,
    icon: "code-2",
  },
  {
    id: "react",
    name: "React",
    category: "Technical",
    proficiency: 75,
    icon: "atom",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Technical",
    proficiency: 70,
    icon: "layers",
  },
  // Soft Skills
  {
    id: "communication",
    name: "Communication",
    category: "Soft",
    proficiency: 95,
    icon: "message-circle",
  },
  {
    id: "project-management",
    name: "Project Management",
    category: "Soft",
    proficiency: 80,
    icon: "folder-kanban",
  },
  {
    id: "problem-solving",
    name: "Problem Solving",
    category: "Soft",
    proficiency: 90,
    icon: "puzzle",
  },
  {
    id: "teamwork",
    name: "Teamwork",
    category: "Soft",
    proficiency: 85,
    icon: "users",
  },
  {
    id: "time-management",
    name: "Time Management",
    category: "Soft",
    proficiency: 88,
    icon: "clock",
  },
];

// Internship Process Steps
export const processSteps: ProcessStep[] = [
  {
    id: "1",
    step: 1,
    title: "Submit Application",
    description:
      "Fill out our online application form with your details and portfolio.",
    icon: "file-text",
  },
  {
    id: "2",
    step: 2,
    title: "Shortlisting",
    description:
      "Our team reviews applications and shortlists candidates based on qualifications.",
    icon: "filter",
  },
  {
    id: "3",
    step: 3,
    title: "Interview or Task",
    description:
      "Selected candidates undergo an interview or complete a practical task.",
    icon: "user-check",
  },
  {
    id: "4",
    step: 4,
    title: "Selection",
    description:
      "Final selection is made and offer letters are sent to successful candidates.",
    icon: "check-circle",
  },
  {
    id: "5",
    step: 5,
    title: "Onboarding",
    description:
      "Welcome session and orientation to help you get started with your internship.",
    icon: "rocket",
  },
];

// Testimonials
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Web Development Intern",
    image: "/api/placeholder/100/100",
    company: "RamK Infotech",
    testimonial:
      "The internship program at RamK Infotech was transformative. I gained real-world experience working on live projects and received excellent mentorship. The flexible schedule allowed me to balance my studies while building my portfolio.",
    rating: 5,
  },
  {
    id: "2",
    name: "Rahul Kumar",
    role: "UI/UX Design Intern",
    image: "/api/placeholder/100/100",
    company: "RamK Infotech",
    testimonial:
      "As a design intern, I worked on multiple client projects and learned industry best practices. The mentorship I received helped me improve my design skills significantly. I'm now working as a full-time designer!",
    rating: 5,
  },
  {
    id: "3",
    name: "Anjali Patel",
    role: "Digital Marketing Intern",
    image: "/api/placeholder/100/100",
    company: "RamK Infotech",
    testimonial:
      "The digital marketing internship gave me hands-on experience with SEO, social media marketing, and analytics. The team was supportive, and I learned so much in just 3 months. Highly recommended!",
    rating: 5,
  },
  {
    id: "4",
    name: "Vikram Singh",
    role: "Mobile App Development Intern",
    image: "/api/placeholder/100/100",
    company: "RamK Infotech",
    testimonial:
      "Working on mobile app development projects was an incredible learning experience. I got to work with React Native and Flutter, and the code reviews from senior developers helped me write better, cleaner code. The internship exceeded my expectations!",
    rating: 5,
  },
  {
    id: "5",
    name: "Sneha Reddy",
    role: "Content Writing Intern",
    image: "/api/placeholder/100/100",
    company: "RamK Infotech",
    testimonial:
      "I learned so much about SEO writing, content strategy, and creating engaging copy. The feedback I received was constructive and helped me grow as a writer. Plus, I got to work on diverse projects that added great pieces to my portfolio.",
    rating: 5,
  },
  {
    id: "6",
    name: "Arjun Mehta",
    role: "Data Analysis Intern",
    image: "/api/placeholder/100/100",
    company: "RamK Infotech",
    testimonial:
      "The data analysis internship taught me how to work with real business data and create meaningful insights. I learned Python, SQL, and data visualization tools. The mentorship was top-notch, and I received a pre-placement offer!",
    rating: 5,
  },
  {
    id: "7",
    name: "Kavya Nair",
    role: "Web Development Intern",
    image: "/api/placeholder/100/100",
    company: "RamK Infotech",
    testimonial:
      "Starting with basic HTML/CSS knowledge, I now feel confident building full-stack applications. The team was patient and always willing to help. The projects I worked on are now live, which looks great on my resume!",
    rating: 5,
  },
  {
    id: "8",
    name: "Rohan Desai",
    role: "UI/UX Design Intern",
    image: "/api/placeholder/100/100",
    company: "RamK Infotech",
    testimonial:
      "The design thinking workshops and client project experience were invaluable. I learned to create user-centered designs and present my work professionally. The portfolio I built during this internship helped me land my dream job!",
    rating: 5,
  },
  {
    id: "9",
    name: "Meera Joshi",
    role: "Digital Marketing Intern",
    image: "/api/placeholder/100/100",
    company: "RamK Infotech",
    testimonial:
      "I managed real social media campaigns and learned Google Analytics, Facebook Ads, and content creation. The hands-on experience with actual client accounts was amazing. The certificate and recommendation letter were great additions to my profile.",
    rating: 5,
  },
  {
    id: "10",
    name: "Aditya Verma",
    role: "Web Development Intern",
    image: "/api/placeholder/100/100",
    company: "RamK Infotech",
    testimonial:
      "The remote internship was perfectly structured. I learned React, Next.js, and TypeScript while working on real projects. The weekly code reviews and pair programming sessions accelerated my learning. Highly recommend to anyone starting their tech career!",
    rating: 5,
  },
  {
    id: "11",
    name: "Isha Gupta",
    role: "Content Writing Intern",
    image: "/api/placeholder/100/100",
    company: "RamK Infotech",
    testimonial:
      "As a content writing intern, I wrote blogs, social media posts, and website copy. The editorial feedback helped me refine my writing style. I also learned about content marketing strategies and SEO optimization. Great experience overall!",
    rating: 5,
  },
  {
    id: "12",
    name: "Karan Malhotra",
    role: "Mobile App Development Intern",
    image: "/api/placeholder/100/100",
    company: "RamK Infotech",
    testimonial:
      "Building mobile apps from scratch was challenging but rewarding. I worked on both iOS and Android projects, learned about app deployment, and even got one of my apps published on the Play Store. The mentorship was exceptional!",
    rating: 5,
  },
];

// Students Testimonials
export const studentsTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Web Development Intern",
    image: "/api/placeholder/100/100",
    testimonial:
      "The internship program at RamK Infotech was transformative. I gained real-world experience working on live projects and received excellent mentorship. The flexible schedule allowed me to balance my studies while building my portfolio.",
    rating: 5,
  },
  {
    id: "2",
    name: "Rahul Kumar",
    role: "UI/UX Design Intern",
    image: "/api/placeholder/100/100",
    testimonial:
      "As a design intern, I worked on multiple client projects and learned industry best practices. The mentorship I received helped me improve my design skills significantly. I'm now working as a full-time designer!",
    rating: 5,
  },
  {
    id: "3",
    name: "Anjali Patel",
    role: "Digital Marketing Intern",
    image: "/api/placeholder/100/100",
    testimonial:
      "The digital marketing internship gave me hands-on experience with SEO, social media marketing, and analytics. The team was supportive, and I learned so much in just 3 months. Highly recommended!",
    rating: 5,
  },
  {
    id: "4",
    name: "Vikram Singh",
    role: "Mobile App Development Intern",
    image: "/api/placeholder/100/100",
    testimonial:
      "Building mobile apps from scratch was challenging but rewarding. I worked on both iOS and Android projects, learned about app deployment, and even got one of my apps published on the Play Store. The mentorship was exceptional!",
    rating: 5,
  },
  {
    id: "5",
    name: "Sneha Reddy",
    role: "Content Writing Intern",
    image: "/api/placeholder/100/100",
    testimonial:
      "I learned so much about SEO writing, content strategy, and creating engaging copy. The feedback I received was constructive and helped me grow as a writer. Plus, I got to work on diverse projects that added great pieces to my portfolio.",
    rating: 5,
  },
  {
    id: "6",
    name: "Arjun Mehta",
    role: "Data Analysis Intern",
    image: "/api/placeholder/100/100",
    testimonial:
      "The data analysis internship taught me how to work with real business data and create meaningful insights. I learned Python, SQL, and data visualization tools. The mentorship was top-notch, and I received a pre-placement offer!",
    rating: 5,
  },
  {
    id: "7",
    name: "Kavya Nair",
    role: "Web Development Intern",
    image: "/api/placeholder/100/100",
    testimonial:
      "Starting with basic HTML/CSS knowledge, I now feel confident building full-stack applications. The team was patient and always willing to help. The projects I worked on are now live, which looks great on my resume!",
    rating: 5,
  },
  {
    id: "8",
    name: "Rohan Desai",
    role: "UI/UX Design Intern",
    image: "/api/placeholder/100/100",
    testimonial:
      "The design thinking workshops and client project experience were invaluable. I learned to create user-centered designs and present my work professionally. The portfolio I built during this internship helped me land my dream job!",
    rating: 5,
  },
];
// FAQs
export const faqs: FAQ[] = [
  {
    id: "1",
    question: "Is this internship paid?",
    answer:
      "Yes, we offer competitive stipends for our internship programs. The amount varies based on the role and duration of the internship.",
  },
  {
    id: "2",
    question: "How long is the duration?",
    answer:
      "Our internships typically last 3 to 6 months, depending on the role. Some positions offer flexible durations based on mutual agreement.",
  },
  {
    id: "3",
    question: "Will I get a certificate?",
    answer:
      "Yes, all interns who successfully complete their internship program receive a certificate of completion that can be added to their resume and LinkedIn profile.",
  },
  {
    id: "4",
    question: "Can I do it remotely?",
    answer:
      "Yes, most of our internship positions are available in remote mode. Some roles may offer hybrid options (combination of remote and on-site work).",
  },
  {
    id: "5",
    question: "What are the working hours?",
    answer:
      "We offer flexible working hours to accommodate your schedule. Typically, interns work 20-40 hours per week, depending on their availability and the role requirements.",
  },
  {
    id: "6",
    question: "Do you provide mentorship?",
    answer:
      "Absolutely! Each intern is assigned a dedicated mentor who provides guidance, feedback, and support throughout the internship period.",
  },
  {
    id: "7",
    question: "Are there opportunities for full-time employment?",
    answer:
      "Yes, outstanding interns may receive pre-placement offers (PPOs) to join our team full-time upon completion of their internship.",
  },
  {
    id: "8",
    question: "What qualifications do I need?",
    answer:
      "Requirements vary by role, but generally we look for candidates with relevant skills, enthusiasm to learn, and a strong work ethic. Check individual role descriptions for specific requirements.",
  },
];

// Contact Information
export const contactInfo: ContactInfo = {
  email: "internships@ramkinfotech.com",
  phone: "+91 83760 48808",
  address: "32/Jenin, London",
  socialMedia: {
    facebook: "https://facebook.com/ramkinfotech",
    twitter: "https://twitter.com/ramkinfotech",
    instagram: "https://instagram.com/ramkinfotech",
    linkedin: "https://linkedin.com/company/ramkinfotech",
  },
};

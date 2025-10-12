// Dynamic page content data
export interface PageSection {
  title: string;
  content: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactMethod {
  title: string;
  icon: string;
  description: string;
  contact: string;
  responseTime: string;
  color?: string;
  bgColor?: string;
}

export interface ResourceItem {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export interface CareerPath {
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  skills: string[];
  salary: string;
  duration: string;
}

export interface SuccessStory {
  name: string;
  role: string;
  company: string;
  image: string;
  story: string;
}

export interface CookieType {
  name: string;
  description: string;
  examples: string[];
  purpose: string;
}

// Privacy Policy Data
export const privacyPolicyData = {
  title: "Privacy Policy",
  icon: "shield-check",
  lastUpdated: "January 2025",
  introduction: {
    title: "Our Commitment to Your Privacy",
    content: "At RamK Infotech, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our educational platform and services."
  },
  sections: [
    {
      title: "Information We Collect",
      content: [
        "Personal Information: Name, email address, phone number, and other contact details when you register or contact us.",
        "Educational Information: Course preferences, learning progress, and academic records.",
        "Technical Information: IP address, browser type, device information, and usage patterns.",
        "Payment Information: Billing details processed securely through our payment partners."
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide and improve our educational services and courses.",
        "To communicate with you about your courses, updates, and important announcements.",
        "To process payments and manage your account.",
        "To personalize your learning experience and recommend relevant courses.",
        "To analyze usage patterns and improve our platform functionality."
      ]
    },
    {
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "We may share information with trusted service providers who assist in operating our platform.",
        "We may disclose information when required by law or to protect our rights and safety.",
        "Aggregated, non-personal information may be shared for research and analytics purposes."
      ]
    },
    {
      title: "Data Security",
      content: [
        "We implement industry-standard security measures to protect your personal information.",
        "All data transmission is encrypted using SSL/TLS protocols.",
        "Access to personal information is restricted to authorized personnel only.",
        "We regularly review and update our security practices to maintain the highest standards."
      ]
    },
    {
      title: "Your Rights",
      content: [
        "Access: You can request access to your personal information we hold.",
        "Correction: You can request correction of inaccurate or incomplete information.",
        "Deletion: You can request deletion of your personal information under certain circumstances.",
        "Portability: You can request a copy of your data in a structured format.",
        "Opt-out: You can opt-out of marketing communications at any time."
      ]
    },
    {
      title: "Cookies and Tracking",
      content: [
        "We use cookies to enhance your browsing experience and analyze site traffic.",
        "You can control cookie settings through your browser preferences.",
        "Some features may not function properly if cookies are disabled.",
        "We use analytics tools to understand user behavior and improve our services."
      ]
    }
  ] as PageSection[],
  contactInfo: {
    title: "Contact Us About Privacy",
    description: "If you have any questions about this Privacy Policy or our privacy practices, please contact us:",
    email: "privacy@ramkinfotech.com",
    phone: "+91 83760 48808",
    address: "32/Jenin, London"
  },
  footerNote: "This Privacy Policy may be updated from time to time. We will notify you of any significant changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date."
};

// Terms of Service Data
export const termsOfServiceData = {
  title: "Terms of Service",
  icon: "file-text",
  lastUpdated: "January 2025",
  introduction: {
    title: "Welcome to RamK Infotech",
    content: "These Terms of Service (\"Terms\") govern your use of RamK Infotech's educational platform, courses, and related services. Please read these terms carefully before using our services. By using our platform, you agree to be bound by these terms and conditions."
  },
  sections: [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using RamK Infotech's services, you accept and agree to be bound by these Terms of Service.",
        "If you do not agree to these terms, you may not use our services.",
        "We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of changes.",
        "These terms apply to all users, including students, instructors, and visitors to our platform."
      ]
    },
    {
      title: "Use of Services",
      content: [
        "Our services are intended for educational purposes and personal learning.",
        "You must be at least 13 years old to use our platform, or have parental consent.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You agree to use our services only for lawful purposes and in accordance with these terms.",
        "Prohibited activities include harassment, spam, copyright infringement, and unauthorized access."
      ]
    },
    {
      title: "Course Content and Intellectual Property",
      content: [
        "All course materials, including videos, documents, and resources, are protected by copyright.",
        "You may not reproduce, distribute, or share course content without explicit permission.",
        "Course completion certificates are provided for personal use and professional development.",
        "We respect intellectual property rights and expect users to do the same.",
        "User-generated content remains the property of the user but grants us a license to use it."
      ]
    },
    {
      title: "Payment and Refunds",
      content: [
        "Course fees are clearly displayed before enrollment and are non-negotiable.",
        "Payment is required in advance for all paid courses and services.",
        "Refunds are available within 7 days of course enrollment, subject to our refund policy.",
        "We accept various payment methods including credit cards, debit cards, and digital wallets.",
        "All transactions are processed securely through our payment partners."
      ]
    },
    {
      title: "User Responsibilities",
      content: [
        "Provide accurate and complete information during registration and enrollment.",
        "Maintain the security of your account and notify us of any unauthorized access.",
        "Respect other users and maintain a professional learning environment.",
        "Complete assignments and assessments honestly and independently.",
        "Follow all course guidelines and instructor instructions."
      ]
    },
    {
      title: "Limitation of Liability",
      content: [
        "Our services are provided 'as is' without warranties of any kind.",
        "We are not liable for any indirect, incidental, or consequential damages.",
        "Our total liability is limited to the amount paid for the specific service in question.",
        "We do not guarantee specific learning outcomes or career results.",
        "Users are responsible for their own learning progress and outcomes."
      ]
    },
    {
      title: "Termination",
      content: [
        "We may terminate or suspend your account for violations of these terms.",
        "You may terminate your account at any time by contacting our support team.",
        "Upon termination, your access to course materials and services will cease.",
        "Certain provisions of these terms will survive termination.",
        "We reserve the right to refuse service to anyone at our discretion."
      ]
    }
  ] as PageSection[],
  contactInfo: {
    title: "Questions About These Terms?",
    description: "If you have any questions about these Terms of Service, please contact us:",
    email: "legal@ramkinfotech.com",
    phone: "+91 83760 48808",
    address: "32/Jenin, London"
  },
  footerNote: "These Terms of Service are effective as of the date of last update and will remain in effect except with respect to any changes in their provisions, which will take effect immediately upon posting."
};

// Cookie Policy Data
export const cookiePolicyData = {
  title: "Cookie Policy",
  icon: "cookie",
  lastUpdated: "January 2025",
  introduction: {
    title: "Our Cookie Policy",
    content: "This Cookie Policy explains how RamK Infotech uses cookies and similar technologies when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them."
  },
  cookieTypes: [
    {
      name: "Essential Cookies",
      description: "These cookies are necessary for the website to function properly and cannot be disabled.",
      examples: ["Authentication", "Security", "Session management"],
      purpose: "Required for basic website functionality"
    },
    {
      name: "Analytics Cookies",
      description: "These cookies help us understand how visitors interact with our website.",
      examples: ["Google Analytics", "Page views", "User behavior"],
      purpose: "To improve website performance and user experience"
    },
    {
      name: "Functional Cookies",
      description: "These cookies enable enhanced functionality and personalization.",
      examples: ["Language preferences", "Theme settings", "Course progress"],
      purpose: "To provide personalized features and remember your preferences"
    },
    {
      name: "Marketing Cookies",
      description: "These cookies are used to deliver relevant advertisements and track campaign effectiveness.",
      examples: ["Ad targeting", "Campaign tracking", "Social media integration"],
      purpose: "To show relevant ads and measure marketing effectiveness"
    }
  ] as CookieType[],
  cookieDetails: [
    {
      title: "What Are Cookies?",
      content: [
        "Cookies are small text files that are stored on your device when you visit our website.",
        "They help us provide you with a better experience by remembering your preferences and settings.",
        "Cookies can be 'session cookies' (temporary) or 'persistent cookies' (stored longer).",
        "Most web browsers accept cookies automatically, but you can modify your browser settings to decline cookies."
      ]
    },
    {
      title: "How We Use Cookies",
      content: [
        "To remember your login status and keep you signed in.",
        "To track your progress through our courses and learning materials.",
        "To personalize your experience based on your preferences and interests.",
        "To analyze website traffic and usage patterns to improve our services.",
        "To provide relevant content and recommendations based on your learning history."
      ]
    },
    {
      title: "Managing Your Cookie Preferences",
      content: [
        "You can control cookies through your browser settings.",
        "Most browsers allow you to refuse cookies or delete them.",
        "Disabling certain cookies may affect the functionality of our website.",
        "You can update your cookie preferences at any time through our cookie settings panel.",
        "We respect your privacy choices and will honor your preferences."
      ]
    },
    {
      title: "Third-Party Cookies",
      content: [
        "We may use third-party services that set their own cookies.",
        "These include analytics providers, social media platforms, and advertising networks.",
        "We do not control these third-party cookies and recommend reviewing their privacy policies.",
        "You can opt-out of third-party cookies through their respective opt-out mechanisms.",
        "We are committed to transparency about all cookies used on our platform."
      ]
    }
  ] as PageSection[],
  browsers: [
    { name: "Google Chrome", icon: "chrome", color: "text-blue-600" },
    { name: "Mozilla Firefox", icon: "firefox", color: "text-orange-600" },
    { name: "Safari", icon: "safari", color: "text-blue-500" },
    { name: "Microsoft Edge", icon: "edge", color: "text-blue-600" }
  ],
  contactInfo: {
    title: "Questions About Cookies?",
    description: "If you have any questions about our use of cookies, please contact us:",
    email: "privacy@ramkinfotech.com",
    phone: "+91 83760 48808"
  }
};

// FAQ Data
export const faqData = {
  title: "Frequently Asked Questions",
  icon: "help-circle",
  description: "Find answers to the most common questions about our courses and services.",
  categories: [
    {
      title: "General Questions",
      icon: "help-circle",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      questions: [
        {
          question: "What is RamK Infotech?",
          answer: "RamK Infotech is a leading educational platform offering comprehensive courses in technology, programming, data science, and digital skills. We provide high-quality training programs designed to help students and professionals advance their careers."
        },
        {
          question: "Who can enroll in your courses?",
          answer: "Our courses are designed for students, working professionals, and anyone interested in learning new skills. We offer courses for all skill levels, from beginners to advanced learners."
        },
        {
          question: "Do you offer certificates upon completion?",
          answer: "Yes! We provide industry-recognized certificates upon successful completion of our courses. These certificates can be shared on LinkedIn and added to your professional portfolio."
        }
      ]
    },
    {
      title: "Course Information",
      icon: "book-open",
      color: "text-green-600",
      bgColor: "bg-green-50",
      questions: [
        {
          question: "How long do I have access to course materials?",
          answer: "You have lifetime access to all course materials once you enroll. You can revisit the content anytime, even after completing the course."
        },
        {
          question: "Are the courses self-paced?",
          answer: "Yes, most of our courses are self-paced, allowing you to learn at your own speed. However, some courses may have deadlines for assignments or projects."
        },
        {
          question: "What if I need help during the course?",
          answer: "We provide comprehensive support through our help center, email support, and community forums. Instructors are also available to answer questions and provide guidance."
        }
      ]
    },
    {
      title: "Payment & Pricing",
      icon: "credit-card",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, debit cards, PayPal, and various digital wallets. All transactions are processed securely through our payment partners."
        },
        {
          question: "Do you offer refunds?",
          answer: "Yes, we offer a 7-day money-back guarantee. If you're not satisfied with your course, you can request a full refund within 7 days of enrollment."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No hidden fees! The price displayed is the total cost. There are no additional charges for course materials, certificates, or support."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: "settings",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      questions: [
        {
          question: "What devices can I use to access courses?",
          answer: "You can access our courses on any device - desktop computers, laptops, tablets, and smartphones. Our platform is fully responsive and works on all modern browsers."
        },
        {
          question: "What if I have technical issues?",
          answer: "Our technical support team is available to help with any issues. Contact us via email, phone, or live chat, and we'll resolve your problem quickly."
        },
        {
          question: "Do I need to download any software?",
          answer: "No additional software is required! All courses are accessible through your web browser. Some courses may recommend specific tools for hands-on practice."
        }
      ]
    }
  ],
  additionalResources: [
    { name: "Help Center", link: "/help" },
    { name: "Privacy Policy", link: "/privacy-policy" },
    { name: "Terms of Service", link: "/terms-of-service" }
  ]
};

// Help Center Data
export const helpCenterData = {
  title: "Help Center",
  icon: "help-circle",
  description: "Find answers to common questions, get technical support, and learn how to make the most of your learning experience.",
  categories: [
    {
      title: "Getting Started",
      icon: "play-circle",
      color: "text-green-600",
      bgColor: "bg-green-50",
      items: [
        "How to create an account",
        "How to enroll in a course",
        "Understanding the platform",
        "Setting up your profile"
      ]
    },
    {
      title: "Course Management",
      icon: "book-open",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      items: [
        "Accessing course materials",
        "Tracking your progress",
        "Submitting assignments",
        "Taking quizzes and exams"
      ]
    },
    {
      title: "Technical Support",
      icon: "settings",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      items: [
        "Video playback issues",
        "Login problems",
        "Mobile app support",
        "Browser compatibility"
      ]
    },
    {
      title: "Payment & Billing",
      icon: "credit-card",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      items: [
        "Payment methods",
        "Refund requests",
        "Invoice generation",
        "Subscription management"
      ]
    }
  ],
  faqItems: [
    {
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email."
    },
    {
      question: "Can I access courses on mobile devices?",
      answer: "Yes! Our platform is fully responsive and works on all mobile devices. We also have dedicated mobile apps for iOS and Android."
    },
    {
      question: "How long do I have access to my courses?",
      answer: "You have lifetime access to all courses you purchase. You can revisit the materials anytime, even after completing the course."
    },
    {
      question: "What if I'm not satisfied with a course?",
      answer: "We offer a 7-day money-back guarantee. If you're not satisfied, contact our support team within 7 days of enrollment for a full refund."
    },
    {
      question: "How do I get my completion certificate?",
      answer: "Certificates are automatically generated when you complete a course with a passing grade. You can download them from your dashboard."
    }
  ] as FAQItem[],
  contactMethods: [
    {
      title: "Email Support",
      icon: "mail",
      description: "Get detailed help via email",
      contact: "support@ramkinfotech.com",
      responseTime: "Within 24 hours"
    },
    {
      title: "Phone Support",
      icon: "phone",
      description: "Speak directly with our team",
      contact: "+91 83760 48808",
      responseTime: "Mon-Fri, 9 AM - 6 PM"
    },
    {
      title: "Live Chat",
      icon: "message-circle",
      description: "Instant help when you need it",
      contact: "Available on website",
      responseTime: "Real-time"
    }
  ] as ContactMethod[],
  quickActions: [
    { title: "Contact Support", icon: "mail", action: "contact" },
    { title: "View Documentation", icon: "book", action: "docs" },
    { title: "Watch Tutorials", icon: "video", action: "tutorials" }
  ]
};

// Student Support Data
export const studentSupportData = {
  title: "Student Support Center",
  icon: "users",
  description: "We're committed to your success! Find all the support you need to excel in your learning journey.",
  supportServices: [
    {
      title: "Academic Support",
      icon: "graduation-cap",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Get help with course content, assignments, and learning materials",
      services: [
        "Course content clarification",
        "Assignment assistance",
        "Study group coordination",
        "Learning resource recommendations"
      ]
    },
    {
      title: "Technical Support",
      icon: "settings",
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Resolve technical issues and platform-related problems",
      services: [
        "Login and access issues",
        "Video playback problems",
        "Mobile app support",
        "Browser compatibility"
      ]
    },
    {
      title: "Career Guidance",
      icon: "briefcase",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Professional development and career advancement support",
      services: [
        "Resume building",
        "Interview preparation",
        "Job search strategies",
        "Industry insights"
      ]
    },
    {
      title: "Mental Health Support",
      icon: "heart",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      description: "Wellness and mental health resources for students",
      services: [
        "Stress management",
        "Study-life balance",
        "Motivation and encouragement",
        "Peer support groups"
      ]
    }
  ],
  resources: [
    {
      title: "Study Guides",
      description: "Comprehensive study materials and guides for all courses",
      icon: "book",
      link: "/study-guides"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video tutorials for complex topics",
      icon: "video",
      link: "/tutorials"
    },
    {
      title: "Practice Tests",
      description: "Mock exams and practice questions to test your knowledge",
      icon: "clipboard-check",
      link: "/practice-tests"
    },
    {
      title: "Community Forum",
      description: "Connect with fellow students and share experiences",
      icon: "users",
      link: "/community"
    }
  ] as ResourceItem[],
  contactOptions: [
    {
      title: "Emergency Support",
      icon: "phone-call",
      description: "For urgent technical issues",
      contact: "+91 83760 48808",
      availability: "24/7",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Academic Advisor",
      icon: "user-check",
      description: "For course-related questions",
      contact: "advisor@ramkinfotech.com",
      availability: "Mon-Fri, 9 AM - 6 PM",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Technical Support",
      icon: "tool",
      description: "For platform and technical issues",
      contact: "tech@ramkinfotech.com",
      availability: "Mon-Sun, 8 AM - 10 PM",
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ] as ContactMethod[],
  tips: [
    {
      title: "Set Realistic Goals",
      description: "Break down your learning into manageable chunks and set achievable milestones.",
      icon: "target"
    },
    {
      title: "Create a Study Schedule",
      description: "Establish a consistent study routine that fits your lifestyle and commitments.",
      icon: "calendar"
    },
    {
      title: "Take Regular Breaks",
      description: "Avoid burnout by taking short breaks every 45-60 minutes of study time.",
      icon: "clock"
    },
    {
      title: "Join Study Groups",
      description: "Connect with other students to share knowledge and stay motivated.",
      icon: "users"
    },
    {
      title: "Ask Questions",
      description: "Don't hesitate to ask for help when you need it. Our support team is here for you.",
      icon: "help-circle"
    },
    {
      title: "Practice Regularly",
      description: "Consistent practice is key to mastering new skills and retaining knowledge.",
      icon: "repeat"
    }
  ],
  quickActions: [
    { title: "Contact Support", icon: "mail", action: "contact" },
    { title: "Schedule Consultation", icon: "calendar", action: "consultation" },
    { title: "Join Study Group", icon: "users", action: "study-group" },
    { title: "Access Resources", icon: "book", action: "resources" }
  ]
};

// Career Guidance Data
export const careerGuidanceData = {
  title: "Career Guidance Center",
  icon: "trending-up",
  description: "Discover your career path, develop essential skills, and land your dream job with our comprehensive career guidance program.",
  careerPaths: [
    {
      title: "Web Development",
      icon: "code",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Build modern web applications and websites",
      skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "Database"],
      salary: "₹3-8 LPA",
      duration: "6-12 months"
    },
    {
      title: "Data Science",
      icon: "bar-chart-3",
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Analyze data to drive business decisions",
      skills: ["Python", "R", "SQL", "Machine Learning", "Statistics"],
      salary: "₹4-10 LPA",
      duration: "8-15 months"
    },
    {
      title: "Cloud Computing",
      icon: "cloud",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Manage cloud infrastructure and services",
      skills: ["AWS", "Azure", "Docker", "Kubernetes", "DevOps"],
      salary: "₹5-12 LPA",
      duration: "6-10 months"
    },
    {
      title: "Mobile Development",
      icon: "smartphone",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Create mobile applications for iOS and Android",
      skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      salary: "₹4-9 LPA",
      duration: "8-12 months"
    }
  ] as CareerPath[],
  careerSteps: [
    {
      step: "1",
      title: "Self Assessment",
      description: "Identify your interests, strengths, and career goals",
      icon: "user-check",
      details: [
        "Take career assessment tests",
        "Identify your skills and interests",
        "Set realistic career goals",
        "Research different career paths"
      ]
    },
    {
      step: "2",
      title: "Skill Development",
      description: "Learn the technical and soft skills required for your chosen field",
      icon: "book-open",
      details: [
        "Enroll in relevant courses",
        "Practice with real projects",
        "Build a portfolio",
        "Develop soft skills"
      ]
    },
    {
      step: "3",
      title: "Portfolio Building",
      description: "Create a strong portfolio showcasing your skills and projects",
      icon: "briefcase",
      details: [
        "Complete personal projects",
        "Contribute to open source",
        "Create a professional portfolio",
        "Document your achievements"
      ]
    },
    {
      step: "4",
      title: "Job Search",
      description: "Apply for positions and prepare for interviews",
      icon: "search",
      details: [
        "Update your resume and LinkedIn",
        "Apply for relevant positions",
        "Prepare for technical interviews",
        "Network with professionals"
      ]
    }
  ],
  resources: [
    {
      title: "Resume Builder",
      description: "Create professional resumes tailored to your field",
      icon: "file-text",
      link: "/resume-builder"
    },
    {
      title: "Interview Prep",
      description: "Practice common interview questions and scenarios",
      icon: "message-circle",
      link: "/interview-prep"
    },
    {
      title: "Job Board",
      description: "Find relevant job opportunities in your field",
      icon: "briefcase",
      link: "/jobs"
    },
    {
      title: "Networking Events",
      description: "Connect with industry professionals and peers",
      icon: "users",
      link: "/networking"
    }
  ] as ResourceItem[],
  successStories: [
    {
      name: "Priya Sharma",
      role: "Frontend Developer",
      company: "TechCorp",
      image: "/images/avatar1.jpg",
      story: "After completing the Web Development course, I landed my dream job at TechCorp. The hands-on projects and mentorship were invaluable."
    },
    {
      name: "Rajesh Kumar",
      role: "Data Scientist",
      company: "DataFlow Inc",
      image: "/images/avatar2.jpg",
      story: "The Data Science program helped me transition from finance to tech. The practical approach and industry insights made all the difference."
    },
    {
      name: "Anita Patel",
      role: "Cloud Engineer",
      company: "CloudTech Solutions",
      image: "/images/avatar3.jpg",
      story: "Starting with zero tech background, I'm now a Cloud Engineer. The structured learning path and continuous support were key to my success."
    }
  ] as SuccessStory[],
  contactOptions: [
    {
      title: "Career Counselor",
      icon: "user-check",
      description: "For course-related questions",
      contact: "career@ramkinfotech.com",
      availability: "Mon-Fri, 9 AM - 6 PM",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Job Placement",
      icon: "briefcase",
      description: "For platform and technical issues",
      contact: "placement@ramkinfotech.com",
      availability: "Mon-Fri, 10 AM - 5 PM",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "General Support",
      icon: "phone",
      description: "For urgent technical issues",
      contact: "+91 83760 48808",
      availability: "Mon-Sun, 8 AM - 10 PM",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ] as ContactMethod[],
  quickActions: [
    { title: "Book Consultation", icon: "calendar", action: "consultation" },
    { title: "Download Career Guide", icon: "download", action: "guide" },
    { title: "Join Career Community", icon: "users", action: "community" }
  ]
};

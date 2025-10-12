import { images } from "./images";
import { pageLink } from "./pageURL";

export const developerData = {
  name: "Naga Sundar",
  link: "https://sundar-1007.github.io/portfolio/",
};

export const phoneNumberData = {
  icon: "phone",
  link: "tel:+918376048808",
  showCase: "+91 83760 48808",
};

export const emailData = {
  icon: "mail",
  link: "mailto:support@ramkinfotech.com",
  showCase: "support@ramkinfotech.com",
};

export const addressData = {
  icon: "map-pin",
  link: "https://maps.app.goo.gl/4Kg6Gc7R8gFkN8fM6",
  showCase: "32/Jenin, London",
};

export const SocialIcons = [
  {
    href: pageLink.home,
    icon: "instagram",
    color: "hover:text-pink-500",
    fill: false,
  },

  {
    href: pageLink.home,
    icon: "facebook",
    color: "hover:text-[#1877F2]",
    fill: true,
  },

  {
    href: pageLink.home,
    icon: "twitter",
    color: "hover:text-[#1DA1F2]",
    fill: true,
  },

  {
    href: pageLink.home,
    icon: "linkedin",
    color: "hover:text-[#0A66C2]",
    fill: true,
  },
];

export const breakpoint = {
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1400,
};

export const categories = [
  "All Categories",
  "Web Development",
  "Data Science",
  "Machine Learning",
  "Cloud Computing",
  "Cybersecurity",
];

export const categoryCards = [
  {
    id: "business",
    title: "Business",
    courseCount: 4,
    icon: "briefcase",
    iconColor: "#8B5CF6",
  },
  {
    id: "marketing",
    title: "Marketing",
    courseCount: 88,
    icon: "rocket",
    iconColor: "#10B981",
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    courseCount: 29,
    icon: "heart",
    iconColor: "#3B82F6",
  },
  {
    id: "cyber",
    title: "Cyber",
    courseCount: 45,
    icon: "shield",
    iconColor: "#EF4444",
  },
  {
    id: "design",
    title: "Design",
    courseCount: 4,
    icon: "palette",
    iconColor: "#F59E0B",
  },
  {
    id: "development",
    title: "Development",
    courseCount: 88,
    icon: "code",
    iconColor: "#3B82F6",
  },
  {
    id: "finance",
    title: "Finance",
    courseCount: 29,
    icon: "dollar-sign",
    iconColor: "#EF4444",
  },
  {
    id: "photography",
    title: "Photography",
    courseCount: 45,
    icon: "camera",
    iconColor: "#F59E0B",
  },
];

export const featuresData = [
  {
    id: "educator-support",
    title: "Educator Support",
    description:
      "Excedteur sint occaecat cupidatat non the proident sunt in culpa",
    icon: "headphones",
    color: "#F59E0B",
  },
  {
    id: "top-instructor",
    title: "Top Instructor",
    description:
      "Excedteur sint occaecat cupidatat non the proident sunt in culpa",
    icon: "graduation-cap",
    color: "#10B981",
  },
  {
    id: "award-winning",
    title: "Award Winning",
    description:
      "Excedteur sint occaecat cupidatat non the proident sunt in culpa",
    icon: "medal",
    color: "#EF4444",
  },
];

export const carouselData = [
  // after deletion placeholder image should be remove next config .ts image object
  {
    id: 1,
    companyLogo: images.adobeLogo,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit.",
    user: {
      name: "Alice Johnson",
      image: "https://via.placeholder.com/150",
      role: "Product Manager",
    },
  },
  {
    id: 2,
    companyLogo: images.asanaLogo,
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    user: {
      name: "Michael Smith",
      image: "",
      role: "UI/UX Designer",
    },
  },
  {
    id: 3,
    companyLogo: images.atlassianLogo,
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    user: {
      name: "Samantha Lee",
      image: "https://via.placeholder.com/150",
      role: "Marketing Lead",
    },
  },
  {
    id: 4,
    companyLogo: images.canvaLogo,
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
    user: {
      name: "Daniel Kim",
      image: "",
      role: "Data Scientist",
    },
  },
  {
    id: 5,
    companyLogo: images.uberLogo,
    description: "Cillum dolore eu fugiat nulla pariatur.",
    user: {
      name: "Rachel Green",
      image: "https://via.placeholder.com/150",
      role: "HR Specialist",
    },
  },
  {
    id: 6,
    companyLogo: images.dribbbleLogo,
    description: "Excepteur sint occaecat cupidatat non proident.",
    user: {
      name: "Tom Hanks",
      image: "https://via.placeholder.com/150",
      role: "Frontend Developer",
    },
  },
  {
    id: 7,
    companyLogo: images.dropboxLogo,
    description:
      "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    user: {
      name: "Lucy Hale",
      image: "",
      role: "QA Engineer",
    },
  },
  {
    id: 8,
    companyLogo: images.githubLogo,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    user: {
      name: "Chris Evans",
      image: "https://via.placeholder.com/150",
      role: "DevOps Engineer",
    },
  },
  {
    id: 9,
    companyLogo: images.gitlabLogo,
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    user: {
      name: "Nina Brown",
      image: "",
      role: "Business Analyst",
    },
  },
  {
    id: 10,
    companyLogo: images.googleLogo,
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    user: {
      name: "Mark Twain",
      image: "https://via.placeholder.com/150",
      role: "Technical Writer",
    },
  },
  {
    id: 11,
    companyLogo: images.grammarlyLogo,
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
    user: {
      name: "Isla Fisher",
      image: "",
      role: "Project Manager",
    },
  },
  {
    id: 12,
    companyLogo: images.ibmLogo,
    description: "Cillum dolore eu fugiat nulla pariatur.",
    user: {
      name: "Leonardo DiCaprio",
      image: "https://via.placeholder.com/150",
      role: "Team Lead",
    },
  },
  {
    id: 13,
    companyLogo: images.instagramLogo,
    description: "Excepteur sint occaecat cupidatat non proident.",
    user: {
      name: "Emma Watson",
      image: "",
      role: "Software Engineer",
    },
  },
  {
    id: 14,
    companyLogo: images.gumroadLogo,
    description:
      "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    user: {
      name: "George Martin",
      image: "https://via.placeholder.com/150",
      role: "System Architect",
    },
  },
  {
    id: 15,
    companyLogo: images.microsoftLogo,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    user: {
      name: "Sophia Turner",
      image: "",
      role: "Graphic Designer",
    },
  },
  {
    id: 16,
    companyLogo: images.mediumLogo,
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    user: {
      name: "Jack Black",
      image: "https://via.placeholder.com/150",
      role: "Scrum Master",
    },
  },
  {
    id: 17,
    companyLogo: images.webflowLogo,
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    user: {
      name: "Lily Collins",
      image: "",
      role: "Content Strategist",
    },
  },
  {
    id: 18,
    companyLogo: images.adobeLogo,
    description: "Duis aute irure dolor in reprehenderit in voluptate.",
    user: {
      name: "Brad Pitt",
      image: "https://via.placeholder.com/150",
      role: "Solutions Engineer",
    },
  },
  {
    id: 19,
    companyLogo: images.gitlabLogo,
    description: "Cillum dolore eu fugiat nulla pariatur.",
    user: {
      name: "Olivia Wilde",
      image: "",
      role: "Product Designer",
    },
  },
  {
    id: 20,
    companyLogo: images.dribbbleLogo,
    description: "Excepteur sint occaecat cupidatat non proident.",
    user: {
      name: "Henry Cavill",
      image: "https://via.placeholder.com/150",
      role: "Cloud Architect",
    },
  },
];

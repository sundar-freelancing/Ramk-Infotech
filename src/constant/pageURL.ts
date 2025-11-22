export const pageLink = {
  home: "/",
  homePage: "/home",
  about: "/about",
  courses: "/courses",
  trainers: "/trainers",
  internship: "/internship",
  contact: "/contact",
  collegeStudents: "/college-students",
  notFound: "/not-found",
  // Legal Pages
  privacyPolicy: "/privacy-policy",
  termsOfService: "/terms-of-service",
  cookiePolicy: "/cookie-policy",
  refundPolicy: "/refund-policy",
  // Support Pages
  helpCenter: "/help",
  faq: "/faq",
  studentSupport: "/support",
  careerGuidance: "/career-guidance",
  dashboard: "/dashboard",
};

export const pageURL: Record<
  string,
  {
    href: string;
    key: string;
    hasDropdown: boolean | undefined;
    title?: string;
  }
> = {
  home: {
    href: pageLink.home,
    key: "home",
    hasDropdown: false,
  },
  about: {
    href: pageLink.about,
    key: "about",
    hasDropdown: false,
    title: "About Us",
  },
  courses: {
    href: pageLink.courses,
    key: "courses",
    hasDropdown: true,
    title: "Courses",
  },
  trainers: {
    href: pageLink.trainers,
    key: "trainers",
    hasDropdown: false,
    title: "Trainers",
  },
  internship: {
    href: pageLink.internship,
    key: "internship",
    hasDropdown: false,
    title: "Internship",
  },
  contact: {
    href: pageLink.contact,
    key: "contact",
    hasDropdown: false,
    title: "Contact Us",
  },
  collegeStudents: {
    href: pageLink.collegeStudents,
    key: "collegeStudents",
    hasDropdown: false,
    title: "College Students",
  },
  notFound: {
    href: pageLink.notFound,
    key: "notFound",
    hasDropdown: false,
    title: "Not Found",
  },
};

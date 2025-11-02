export const pageLink = {
  home: "/",
  homePage: "/home",
  about: "/about",
  courses: "/courses",
  trainers: "/trainers",
  internship: "/internship",
  contact: "/contact",
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
};

export const pageURL: Record<string, { href: string; key: string; hasDropdown: boolean; title?: string }> = {
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
  notFound: {
    href: pageLink.notFound,
    key: "notFound",
    hasDropdown: false,
    title: "Not Found",
  },
};

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

export const pageURL = {
  home: {
    href: pageLink.home,
    key: "home",
    hasDropdown: false,
  },
  about: {
    href: pageLink.about,
    key: "about",
    hasDropdown: false,
  },
  courses: {
    href: pageLink.courses,
    key: "courses",
    hasDropdown: true,
  },
  trainers: {
    href: pageLink.trainers,
    key: "trainers",
    hasDropdown: false,
  },
  internship: {
    href: pageLink.internship,
    key: "internship",
    hasDropdown: false,
  },
  contact: {
    href: pageLink.contact,
    key: "contact",
    hasDropdown: false,
  },
  notFound: {
    href: pageLink.notFound,
    key: "notFound",
    hasDropdown: false,
  },
};

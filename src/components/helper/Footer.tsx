"use client";

import React from "react";
import { Container } from "../ui/Container";
import { AppIcon } from "../ui/Icon";
import Image from "next/image";
import { images } from "@/constant/images";
import {
  SocialIcons,
  phoneNumberData,
  emailData,
  addressData,
  developerData,
} from "@/constant/constant";
import { pageLink } from "@/constant/pageURL";
import { Title2, Title3 } from "./Titles";
import { Input } from "../ui/input";
import { PrimaryButton } from "../ui/button";
import Link from "next/link";
import { AppLogo } from "./AppLogo";

const FooterSupport = ({
  data,
  title,
}: {
  data: {
    name?: string;
    href?: string;
    link?: string;
    showCase?: string;
    icon?: string;
  }[];
  title: string;
}) => {
  return (
    <div className="space-y-6 lg:space-y-8">
      <Title3>{title}</Title3>
      <ul className="space-y-3 lg:space-y-4">
        {data.map((link, index) => {
          const { name, href, link: href2, showCase, icon } = link;
          return (
            <Link
              key={index}
              data-aos="fade"
              data-aos-delay={index * 100}
              href={href ?? href2 ?? "#"}
              className="flex items-center gap-2 group text-gray-800 dark:text-gray-300 hover:!text-blue-600 transition-colors text-sm md:text-base w-fit"
            >
              <AppIcon
                name={icon ? icon : "chevron-right"}
                className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform"
              />
              {name || showCase}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export const Footer = () => {
  const footerLinks = [
    { name: "About Us", href: pageLink.about },
    { name: "Our Courses", href: pageLink.courses },
    { name: "College Students", href: pageLink.home },
    { name: "Internship", href: pageLink.internship },
    { name: "Contact Us", href: pageLink.contact },
  ];

  const contactInfo = [phoneNumberData, emailData, addressData];

  const footerCourses = [
    { name: "All Courses", href: pageLink.courses },
    { name: "Web Development", href: pageLink.courses },
    { name: "Data Science", href: pageLink.courses },
    { name: "Machine Learning", href: pageLink.courses },
    { name: "Cloud Computing", href: pageLink.courses },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "FAQ", href: "/faq" },
    { name: "Student Support", href: "/support" },
    { name: "Career Guidance", href: "/career-guidance" },
  ];

  return (
    <footer className="relative overflow-hidden pt-20">
      <div className="absolute bottom-20 right-0 translate-x-1/4">
        <Image
          src={images.shape7}
          alt="shape6"
          className="w-40 animate-shape-2"
        />
      </div>
      <div className="absolute bottom-1/2 left-0">
        <Image
          src={images.shape8}
          alt="shape8"
          className="w-20 animate-shape-1"
        />
      </div>
      <Container className="py-12 md:py-16 lg:py-20 relative z-10">
        {/* Top Section - Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Brand Column */}
          <div className="space-y-6 lg:space-y-8">
            <AppLogo dataAos="zoom-out" dataAosDelay="100" />
            <p
              data-aos="fade"
              className="text-gray-800 dark:text-gray-300 leading-relaxed text-sm md:text-base max-w-md"
            >
              Accusam nonumy clita sed rebum kasd eirmod elitr. Ipsum ea lorem
              at et diam est, tempor rebum ipsum sit ea tempor stet et
              consetetur dolores. Justo stet diam ipsum lorem vero clita diam
            </p>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4 lg:space-y-6">
            <Title2>Newsletter</Title2>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Your Email Address"
                className="py-3 md:py-4 lg:py-6 w-full"
                data-aos="zoom-out"
                data-aos-delay="100"
              />
              <PrimaryButton
                className="w-full sm:w-auto justify-center"
                dataAos="zoom-out"
                dataAosDelay="100"
              >
                Subscribe Now
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* Bottom Section - Links & Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Contact Info */}
          <div className="space-y-6 lg:space-y-8">
            <FooterSupport data={contactInfo} title="Get in touch" />

            {/* Social Icons */}
            <div className="flex gap-3 lg:gap-4 flex-wrap">
              {SocialIcons.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  data-aos="zoom-out"
                  data-aos-delay={index * 100}
                  className="transition-all duration-300 hover:scale-110 rounded-lg p-1"
                >
                  <AppIcon
                    name={social.icon}
                    className={`w-7 h-7 md:w-8 md:h-8 ${social.color} ${
                      social.fill && "fill-current stroke-0"
                    }`}
                  />
                </Link>
              ))}
            </div>
          </div>

          <FooterSupport data={footerCourses} title="Our Courses" />
          <FooterSupport data={footerLinks} title="Quick Links" />
          <FooterSupport data={supportLinks} title="Support & Legal" />
        </div>
      </Container>

      {/* Copyright Bar */}
      <div className="border-t">
        <Container className="py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left text-muted-foreground text-xs md:text-sm">
              © 2025 RamK Infotech. All Rights Reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-xs md:text-sm">
              <Link
                href="/privacy-policy"
                className="text-muted-foreground hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-muted-foreground hover:text-blue-600 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookie-policy"
                className="text-muted-foreground hover:text-blue-600 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
            <div className="text-center md:text-right text-muted-foreground text-xs md:text-sm">
              Developed by{" "}
              <Link
                target="_blank"
                href={developerData.link}
                className="font-semibold text-primary hover:text-blue-700 transition-colors cursor-pointer"
              >
                {developerData.name}
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

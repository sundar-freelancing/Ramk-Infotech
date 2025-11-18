"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { courses as staticCourses } from "@/constant/staticCourse";
import { pageURL } from "@/constant/pageURL";
import { navbarLinks, publicPageURL } from "@/constant/public_PageURL";
import { Button, buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { ContainerFluid } from "../ui/Container";
import { emailData, phoneNumberData, SocialIcons } from "@/constant/constant";
import { useWindowSize } from "../../hooks/useWindowSize";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { AppIcon } from "../ui/Icon";
import ModeToggleV2 from "./ModeToggleV2";
import { AppLogo } from "./AppLogo";
import { usePathname, useRouter } from "next/navigation";
import { createCourseSlug } from "@/lib/courseUtils";
import { CourseSearchBar } from "./CourseSearchBar";

// Types
interface Course {
  id: number;
  name: string;
  duration: string;
  level: string;
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  dataActive?: boolean;
}

interface CourseItemProps {
  course: Course;
  pathname: string;
}

interface CollegeStudentsButtonProps {
  onClick?: () => void;
}

interface SidebarWrapperProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CourseItem = ({ course, pathname }: CourseItemProps) => {
  const courseSlug = createCourseSlug(course.name);
  const courseURL = `${pageURL.courses.href}/${courseSlug}`;
  const isActive = pathname === courseURL;
  return (
    <NavigationMenuLink asChild>
      <Link
        href={courseURL}
        className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground`}
        aria-label={`Learn more about ${course.name} course`}
        data-active={isActive}
      >
        <div className="text-sm font-medium leading-none">{course.name}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          Duration: {course.duration} • Level: {course.level}
        </p>
      </Link>
    </NavigationMenuLink>
  );
};

const NavLink = ({
  href,
  children,
  className,
  onClick,
  ariaLabel,
  dataActive,
}: NavLinkProps) => (
  <NavigationMenuLink
    asChild
    className={cn(className)}
    onClick={onClick}
    data-active={dataActive}
  >
    <Link href={href} aria-label={ariaLabel}>
      {children}
    </Link>
  </NavigationMenuLink>
);

const CollegeStudentsButton = ({ onClick }: CollegeStudentsButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(publicPageURL.collegeStudents.href);
    onClick?.();
  };
  return (
    <Button
      variant="yellow"
      size="lg"
      className="rounded-full relative overflow-hidden group"
      onClick={handleClick}
      aria-label="College Students Program"
    >
      <span className="relative z-10">College Students</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine"></div>
    </Button>
  );
};

export const Navbar = () => {
  const { isDesktop } = useWindowSize();
  console.log("render navbar");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navbarRef = useRef<HTMLDivElement>(null);
  const handleMenuToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        navbarRef.current?.classList.add(
          "fixed",
          "w-full",
          "shadow-md",
          "navbar-animation"
        );
        navbarRef.current?.classList.remove("relative");
      } else {
        navbarRef.current?.classList.remove(
          "fixed",
          "w-full",
          "shadow-md",
          "navbar-animation"
        );
        navbarRef.current?.classList.add("relative");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="navbar" className="absolute top-0 left-0 w-full">
      <Navbar1 />
      <div
        ref={navbarRef}
        className={`bg-background top-0 z-40 relative`}
        suppressHydrationWarning={true}
      >
        <ContainerFluid className="py-3" wrapperClassName="overflow-visible">
          <SidebarWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
            <div
              className={`flex xl:justify-between xl:items-center xl:flex-row flex-col gap-3 flex-1 px-3 xl:px-0`}
            >
              {/* Navigation Menu */}
              <NavigationMenu className="flex-0 xl:flex-1">
                <NavigationMenuList className="flex-col xl:flex-row items-start xl:items-center">
                  {navbarLinks.map((item) => (
                    <NavigationMenuItem key={item.key}>
                      {item.hasDropdown && !isDesktop ? (
                        <>
                          <NavigationMenuTrigger
                            aria-label={`${item.key} menu`}
                            aria-expanded="false"
                            dataActive={pathname.includes(item.href)}
                          >
                            {item.key}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className="w-full">
                            <div className="grid gap-3 p-4 w-[400px] md:w-[900px]">
                              <div
                                className={`grid gap-3 ${
                                  staticCourses.length > 8
                                    ? "grid-cols-3"
                                    : "grid-cols-2"
                                }`}
                              >
                                {staticCourses.length > 0 &&
                                  staticCourses.map((course) => (
                                    <CourseItem
                                      key={course.id}
                                      course={course}
                                      pathname={pathname}
                                    />
                                  ))}
                                {staticCourses.length === 0 && (
                                  <div className="col-span-2">
                                    <p className="text-sm text-muted-foreground">
                                      No courses available
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="border-t pt-3">
                                <NavLink
                                  href={item.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  ariaLabel="View all courses"
                                >
                                  <div className="text-sm font-medium leading-none">
                                    View All Courses
                                  </div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    Explore our complete course catalog
                                  </p>
                                </NavLink>
                              </div>
                            </div>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavLink
                          href={item.href}
                          className={`${navigationMenuTriggerStyle()}`}
                          onClick={handleMenuClose}
                          key={item.key}
                          dataActive={pathname === item.href}
                        >
                          {item.key}
                        </NavLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
              {isDesktop && (
                <CollegeStudentsButton onClick={handleMenuToggle} />
              )}
              <div className="flex xl:items-center flex-wrap mt-auto pt-10 xl:pt-0 mb-3 xl:mb-0">
                <Link
                  href={phoneNumberData.link}
                  className={cn(
                    buttonVariants({
                      variant: isDesktop ? "highlightLink" : "highlight",
                    }),
                    "w-fit relative overflow-hidden"
                  )}
                  aria-label="Call us"
                >
                  {phoneNumberData.showCase}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine"></div>
                </Link>
                <Link
                  href={emailData.link}
                  className={cn(
                    buttonVariants({
                      variant: isDesktop ? "highlightLink" : "highlight",
                    }),
                    "w-fit relative overflow-hidden px-2"
                  )}
                  aria-label="Email us"
                >
                  {emailData.showCase}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine"></div>
                </Link>
                <Separator
                  orientation="vertical"
                  className="!h-4 bg-gray-500 hidden xl:block mx-4"
                />
                <ModeToggleV2 />
              </div>
            </div>
          </SidebarWrapper>
        </ContainerFluid>
      </div>
    </div>
  );
};

Navbar.displayName = "Navbar";

const Navbar1 = () => {
  return (
    <ContainerFluid
      suppressHydrationWarning={true}
      className="py-5 relative hidden xl:block z-50"
    >
      <div className="flex justify-between items-center gap-10 xl:gap-15">
        <AppLogo />
        <CourseSearchBar />
        {/* Social Icons */}
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Social media links"
        >
          {SocialIcons.map(({ href, icon: Icon, color, fill }, index) => (
            <Link href={href} key={index} aria-label={`Visit our ${Icon} page`}>
              <AppIcon
                name={Icon}
                className={cn(
                  "size-4.5 transition-all duration-200",
                  color,
                  fill && "fill-current stroke-0"
                )}
              />
            </Link>
          ))}
        </div>
        <CollegeStudentsButton />
      </div>
    </ContainerFluid>
  );
};

const SidebarWrapper = ({
  children,
  isOpen,
  setIsOpen,
}: SidebarWrapperProps) => {
  const { isDesktop } = useWindowSize();

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
    },
    [setIsOpen]
  );

  return isDesktop ? (
    <div className="flex justify-between items-center">
      <AppLogo />
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
          >
            <AppIcon name="menu" className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="shadow">
            <SheetTitle>
              <AppLogo />
            </SheetTitle>
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    </div>
  ) : (
    <>{children}</>
  );
};

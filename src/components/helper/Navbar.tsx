"use client";

import React, { useState, useCallback } from "react";
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
import { publicPageURL } from "@/constant/public_PageURL";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { ContainerFluid } from "../ui/Container";
import {
  categories,
  emailData,
  phoneNumberData,
  SocialIcons,
} from "@/constant/constant";
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
import { usePathname } from "next/navigation";

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
}

interface CollegeStudentsButtonProps {
  onClick?: () => void;
}

interface SidebarWrapperProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CourseItem = ({ course }: CourseItemProps) => (
  <NavigationMenuLink asChild>
    <Link
      href={`${pageURL.courses.href}/${course.id}`}
      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      aria-label={`Learn more about ${course.name} course`}
    >
      <div className="text-sm font-medium leading-none">{course.name}</div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
        Duration: {course.duration} • Level: {course.level}
      </p>
    </Link>
  </NavigationMenuLink>
);

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

const CollegeStudentsButton = ({ onClick }: CollegeStudentsButtonProps) => (
  <Button
    variant="yellow"
    size="lg"
    className="rounded-full relative overflow-hidden group"
    onClick={onClick}
    aria-label="College Students Program"
  >
    <span className="relative z-10">College Students</span>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine"></div>
  </Button>
);

export const Navbar = () => {
  const { isTablet, low200px } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleMenuToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      {!isTablet && <Navbar1 />}
      <div
        className={`bg-background top-0 z-50 ${
          low200px ? "sticky shadow-md navbar-animation" : "relative"
        }`}
        suppressHydrationWarning={true}
      >
        <ContainerFluid className="py-3" wrapperClassName="overflow-visible">
          <SidebarWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
            <div
              className={`flex lg:justify-between lg:items-center lg:flex-row flex-col gap-3 flex-1 px-3 lg:px-0`}
            >
              {/* Navigation Menu */}
              <NavigationMenu className="flex-0 lg:flex-1">
                <NavigationMenuList className="flex-col lg:flex-row items-start lg:items-center">
                  {Object.values(publicPageURL).map((item) => (
                    <NavigationMenuItem key={item.key}>
                      {item.hasDropdown && !isTablet ? (
                        <>
                          <NavigationMenuTrigger
                            aria-label={`${item.key} menu`}
                            aria-expanded="false"
                          >
                            {item.key}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className="w-full">
                            <div className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px]">
                              <div className="grid grid-cols-2 gap-3">
                                {staticCourses.map((course) => (
                                  <CourseItem key={course.id} course={course} />
                                ))}
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
                          className={`${navigationMenuTriggerStyle()} capitalize`}
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
              {isTablet && <CollegeStudentsButton onClick={handleMenuToggle} />}
              <div className="flex lg:items-center flex-wrap mt-auto mb-3 lg:mb-0">
                <Link
                  href={phoneNumberData.link}
                  className={cn(
                    buttonVariants({
                      variant: isTablet ? "highlightLink" : "highlight",
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
                      variant: isTablet ? "highlightLink" : "highlight",
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
                  className="!h-4 bg-gray-500 hidden lg:block mx-4"
                />
                <ModeToggleV2 />
              </div>
            </div>
          </SidebarWrapper>
        </ContainerFluid>
      </div>
    </>
  );
};

Navbar.displayName = "Navbar";

const CategorySelect = () => {
  const [category, setCategory] = useState(categories[0]);

  return (
    <Select value={category} onValueChange={setCategory}>
      <SelectTrigger
        className="max-w-[300px] border-none shadow-none pl-6 hidden lg:flex dark:bg-transparent"
        isFocusLess
        aria-label="Select course category"
      >
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const Navbar1 = () => {
  return (
    <ContainerFluid
      suppressHydrationWarning={true}
      className="py-5 relative z-10"
    >
      <div className="flex justify-between items-center gap-10 xl:gap-15">
        <AppLogo />
        <div className="bg-white dark:bg-gray-800 flex items-center flex-1 gap-2 shadow border border-gray-400 rounded-full p-1 h-full">
          <CategorySelect />
          <Separator
            orientation="vertical"
            className="!h-4 bg-gray-500 hidden lg:block"
          />
          <Input
            placeholder="Search Your Course..."
            isFocusLess
            aria-label="Search courses"
            className="dark:bg-transparent"
          />
          <Button
            variant="default"
            className="rounded-full"
            aria-label="Search"
          >
            <AppIcon name="search" className="size-4" />
            Search
          </Button>
        </div>
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
  const { isTablet } = useWindowSize();

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
    },
    [setIsOpen]
  );

  return isTablet ? (
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
          <SheetHeader className="bg-gray-100 shadow">
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

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { pageURL } from "@/constant/pageURL";
import { AppIcon } from "@/components/ui/Icon";
import { AppLogo } from "@/components/helper/AppLogo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";

interface NotFoundProps {
  courseName?: string | null;
  disabledReason?: string;
}

export default function NotFound({
  courseName,
  disabledReason,
}: NotFoundProps) {
  const router = useRouter();

  const navigationCards = [
    {
      icon: "info",
      title: "About",
      description: "Learn more about our company and mission.",
      href: pageURL.about.href,
      linkText: "Go to about",
    },
    {
      icon: "book-open",
      title: "Courses",
      description: "Explore our wide range of courses and programs.",
      href: pageURL.courses.href,
      linkText: "Go to courses",
    },
    {
      icon: "message-circle",
      title: "Contact",
      description: "Get in touch with us for any questions or support.",
      href: pageURL.contact.href,
      linkText: "Go to contact",
    },
  ];

  return (
    <Container className="flex items-center justify-center min-h-screen py-12">
      <div className="w-full ">
        <div className="flex flex-col items-center max-w-lg mx-auto text-center">
          <div className="mb-8">
            <AppLogo height={30} />
          </div>
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            {disabledReason
              ? `Course Unavailable`
              : courseName
              ? `Course not found`
              : "We lost this page"}
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            {disabledReason
              ? disabledReason
              : courseName
              ? `The course ${courseName} is not found`
              : "We searched high and low, but couldn't find what you're looking for.Let's find a better place for you to go."}
          </p>
          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <Button
              variant="outline"
              size="default"
              onClick={() => router.back()}
              className="w-1/2 sm:w-auto"
            >
              <AppIcon name="move-left" className="w-4 h-4" />
              <span>Go back</span>
            </Button>
            <Button
              variant="default"
              size="default"
              asChild
              className="w-1/2 sm:w-auto"
            >
              <Link
                href={courseName ? pageURL.courses.href : pageURL.home.href}
              >
                {courseName ? "Go to courses" : "Take me home"}
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid w-full max-w-6xl grid-cols-1 gap-8 mx-auto mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {navigationCards.map((card, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-blue-50 dark:bg-gray-800 flex flex-col space-y-4"
            >
              <div className="flex flex-col gap-2">
                <span className="text-gray-500 dark:text-gray-400">
                  <AppIcon name={card.icon} className="w-6 h-6" />
                </span>
                <h3 className="font-medium text-gray-700 dark:text-gray-200 ">
                  {card.title}
                </h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 ">
                {card.description}
              </p>
              <Link
                href={card.href}
                className="group inline-flex items-center mt-auto text-sm text-blue-500 gap-x-2 dark:text-blue-400 hover:underline transition-all w-fit"
              >
                <span>{card.linkText}</span>
                <AppIcon
                  name="move-right"
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

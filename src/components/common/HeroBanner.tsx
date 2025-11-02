"use client";

import { pageURL } from "@/constant/pageURL";
import { Container } from "../ui/Container";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Image from "next/image";
import { images } from "@/constant/images";
export const HeroBanner = () => {
  const pathname = usePathname();

  console.log(pathname);
  const pageData = Object.values(pageURL).find(
    (item) => item.href === pathname
  );
  const alterPath = pathname.replace("/", "");
  return (
    <div
      className="min-h-[400px] dark:bg-gray-900 flex items-center justify-center hero-banner relative overflow-hidden 
      translate-y-[-70px] pt-[70px] lg:pt-[150px] lg:translate-y-[-150px]"
    >
      <Container className="text-center">
        <div data-aos="fade-up">
          <h2 className="text-4xl font-bold capitalize mb-3">
            {pageData?.title || alterPath}
          </h2>
          <DynamicBreadcrumb />
        </div>
      </Container>
      <div className="absolute top-1/2 -translate-y-1/2 left-0" data-aos="fade">
        <Image src={images.shape6} alt="shape2" width={50} className="w-10 " />
      </div>
      <div className="absolute bottom-0 right-0 translate-1/4">
        <Image
          src={images.shape7}
          alt="shape6"
          className="w-30 animate-shape-2"
          data-aos="fade"
        />
      </div>
    </div>
  );
};

const DynamicBreadcrumb = () => {
  const pathname = usePathname(); // e.g. "/course/data-analyst"

  // Split path into parts and filter out empty strings
  const pathSegments = pathname.split("/").filter(Boolean);
  // ['course', 'data-analyst']

  // Build partial hrefs for each segment
  const pathLinks = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    return { name: segment, href };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList className="justify-center uppercase text-xs font-semibold">
        {/* Always show Home */}
        <BreadcrumbItem>
          <BreadcrumbLink
            className="text-[var(--app-secondary-color)] dark:text-[var(--app-primary-color)]"
            href="/"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathLinks.length > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}

        {pathLinks.map((item, index) => (
          <BreadcrumbItem key={item.href}>
            {index < pathLinks.length - 1 ? (
              <>
                <BreadcrumbLink
                  className="text-[var(--app-secondary-color)] dark:text-[var(--app-primary-color)]"
                  href={item.href}
                >
                  {formatTitle(item.name)}
                </BreadcrumbLink>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
              </>
            ) : (
              <BreadcrumbPage>{formatTitle(item.name)}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

// Helper function to format the name (e.g. "data-analyst" → "Data Analyst")
function formatTitle(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

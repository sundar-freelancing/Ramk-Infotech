"use Client";

import { images } from "@/constant/images";
import { pageLink } from "@/constant/pageURL";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const AppLogo = ({
  href = pageLink.home,
  height,
  dataAos,
  dataAosDelay,
  className,
}: {
  href?: string;
  height?: number;
  dataAos?: string;
  dataAosDelay?: string;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      aria-label="RamK Infotech Home"
      className={cn("block", className)}
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
    >
      <Image
        src={images.mainlogoV2}
        alt="RamK Infotech"
        priority
        height={height || 40}
        // width={width || 120}
      />
    </Link>
  );
};

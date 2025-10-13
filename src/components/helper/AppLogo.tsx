"use Client";

import { images } from "@/constant/images";
import { pageLink } from "@/constant/pageURL";
import Image from "next/image";
import Link from "next/link";

export const AppLogo = ({
  height,
  dataAos,
  dataAosDelay,
}: {
  height?: number;
  dataAos?: string;
  dataAosDelay?: string;
}) => {
  return (
    <Link
      href={pageLink.home}
      aria-label="RamK Infotech Home"
      className="block"
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
    >
      <Image
        src={images.mainlogo}
        alt="RamK Infotech"
        height={height || 60}
        // width={width || 120}
      />
    </Link>
  );
};

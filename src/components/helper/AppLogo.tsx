"use Client";

import { images } from "@/constant/images";
import { pageLink } from "@/constant/pageURL";
import Image from "next/image";
import Link from "next/link";

export const AppLogo = ({ height }: { height?: number }) => {
  return (
    <Link href={pageLink.home} aria-label="RamK Infotech Home" className="block">
      <Image
        src={images.mainlogo}
        alt="RamK Infotech"
        height={height || 70}
        // width={width || 120}
      />
    </Link>
  );
};

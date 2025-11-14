"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/constant/images";
import {
  phoneNumberData,
  emailData,
  whatsappNumberData,
} from "@/constant/constant";
import { AppIcon } from "../ui/Icon";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Text1, Title2 } from "../helper/Titles";

interface SiteMaintenanceProps {
  reason?: string;
}

export const SiteMaintenance: React.FC<SiteMaintenanceProps> = ({ reason }) => {
  const contactDatas = [
    phoneNumberData,
    whatsappNumberData,
    emailData,
  ] as const;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <Image
            src={images.mainlogoV2}
            alt="RamK Infotech"
            height={50}
            priority
          />
        </div>

        <div className="space-y-3">
          <Title2 className="flex gap-4 items-center justify-center">
            <AppIcon name="wrench" size={32} />
            Site Under Maintenance
          </Title2>
          <Text1>
            {reason ||
              "We're currently performing scheduled maintenance. Please check back soon."}
          </Text1>
        </div>

        <div className="pt-4">
          <Text1 className="mb-4">Need assistance? Contact us:</Text1>
          <div className="flex justify-center gap-4">
            {contactDatas.map((data) => (
              <Link
                href={data.link}
                target={data.link.startsWith("http") ? "_blank" : undefined}
                rel={
                  data.link.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={data.showCase}
                className={cn(buttonVariants({ variant: "secondary" }))}
                key={data.link}
              >
                <AppIcon name={data.icon} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

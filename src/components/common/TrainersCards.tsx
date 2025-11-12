"use client";

import Image from "next/image";
import { Card } from "../ui/card";
import Link from "next/link";
import { AppIcon } from "../ui/Icon";
import { Title4 } from "../helper/Titles";
import { TrainerInterface } from "@/constant/staticTrainers";
import { Button } from "../ui/button";

export const TrainersCards = ({
  trainers,
  className,
  freeToConnect = false,
}: {
  trainers: TrainerInterface[];
  className?: string;
  freeToConnect?: boolean;
}) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {trainers.map((trainer, index) => {
        const { name, trainersKey, image, socialMedia } = trainer;

        return (
          <Card
            className="overflow-hidden shadow-none border-0 transition-all duration-300 group p-0"
            data-aos="fade-up"
            key={index}
          >
            <div className="relative">
              {/* Trainer Image */}
              <div className="relative w-full h-100 overflow-hidden bg-gray-200 dark:bg-gray-800 rounded-lg">
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="bg-gradient-to-b from-[rgba(1,28,26,0)] to-[rgba(1,28,26,0.65)] absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full h-full translate-y-full group-hover:translate-y-0"></span>

                {/* Social Media Icons Overlay */}
                {socialMedia && (
                  <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 group-hover:bottom-3 transition-all duration-300 p-2.5 invisible group-hover:visible -z-1 group-hover:z-10">
                    <div className="flex items-center gap-4">
                      {Object.keys(socialMedia).map((social) => (
                        <Link
                          key={social}
                          href={
                            socialMedia[
                              social as keyof typeof socialMedia
                            ] as string
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-blue-400 transition-colors"
                          aria-label={social as string}
                        >
                          <AppIcon
                            name={social as string}
                            // size={16}
                            className="w-5 h-5"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Trainer Info */}
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2 font-medium">
                  {trainersKey}
                </p>
                <Title4 aos={false}>{name}</Title4>
                {freeToConnect && (
                  <Button className="mt-3">
                    <AppIcon name="message-circle" className="w-4 h-4 mr-2" />
                    Free to connect
                  </Button>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

"use client";

import { images } from "@/constant/images";
import React from "react";
import Image from "next/image";
import { Container } from "../ui/Container";
import { GraduationCap } from "lucide-react";
import { Title1, Title2 } from "../helper/Titles";

export const DigitalAcademy = () => {
  return (
    <Container className="pb-28">
      <div className="grid lg:grid-cols-2 gap-12 items-center relative">
        <div className="relative" data-aos="zoom-out">
          <Image
            src={images.digitalacademy}
            alt="Student Learning"
            width={500}
            height={600}
            className="rounded-2xl shadow-2xl rounded-br-[200px]"
          />

          {/* Enrollment Stats Overlay */}
          <div className="absolute top-1/2 animate-shape-1 -left-6 bg-white rounded-xl p-4 shadow-lg border border-pink-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-pink-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-600">9,394+</div>
                <div className="text-sm text-gray-600">Enrolled Learners</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="space-y-8">
          {/* Welcome Text */}
          <Title1>Welcome to Ramk Infotech</Title1>

          {/* Main Title */}
          <Title2>
            Digital Online Academy: Your Path to Creative Excellence
          </Title2>

          {/* Description */}
          <p
            data-aos="fade-up"
            className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            Excedteur sint occaecat cupidatat non proident sunt in culpa qui
            officia deserunt mollit.
          </p>

          {/* Features List */}
          <div className="space-y-4">
            {[
              "Our Expert Trainers",
              "Online Remote Learning",
              "Easy to follow curriculum",
              "Lifetime Access",
            ].map((feature, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="flex items-center space-x-3"
              >
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>
          <div data-aos="zoom-out">
            <Image
              src={images.shape7}
              alt="Element 1"
              className="w-32 absolute bottom-0 right-0 animate-pulse"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

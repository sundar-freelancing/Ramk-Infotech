"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PrimaryButton } from "@/components/ui/button";
import { Title1, Title2 } from "@/components/helper/Titles";
import { images } from "@/constant/images";
import Image from "next/image";
import { submitContactForm } from "@/services/googleSheetService";

interface FormData {
  fullName: string;
  email: string;
  mobileNumber: string;
  course?: string;
  message?: string;
  privacyPolicy: boolean;
}

interface ContactFormSectionProps {
  isFromCollegeStudents?: boolean;
}

export const ContactFormSection = ({
  isFromCollegeStudents = false,
}: ContactFormSectionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      course: "",
      message: "",
      privacyPolicy: true, // Default checked
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const result = await submitContactForm({
        fullName: data.fullName,
        email: data.email,
        mobileNumber: data.mobileNumber,
        message: data.message || "",
        privacyPolicy: data.privacyPolicy,
        course: isFromCollegeStudents ? data.course : undefined,
      });

      if (result.message === "contact_saved") {
        setSubmitMessage({
          type: "success",
          text: isFromCollegeStudents
            ? "Thank you! Your booking request has been submitted successfully."
            : "Thank you! Your message has been sent successfully.",
        });
        // Reset form after successful submission
        reset({
          fullName: "",
          email: "",
          mobileNumber: "",
          course: "",
          message: "",
          privacyPolicy: true,
        });
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const className =
    "border-0 border-b border-gray-300 rounded-none px-0 py-6 focus-visible:ring-0  focus-visible:border-[var(--app-primary-color)] bg-transparent! text-[16px]! placeholder:text-gray-400";

  return (
    <Container id="contact-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Image */}
        <div
          className="relative h-full min-h-[500px] rounded-lg overflow-hidden"
          data-aos="zoom-out"
        >
          <Image
            src={images.contactImg}
            alt="Contact us"
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right Column - Contact Form */}
        <div className="w-full lg:px-10">
          <div className="mb-8 space-y-6">
            <Title1>
              {isFromCollegeStudents ? "BOOK GUIDANCE" : "CONTACT US"}
            </Title1>
            <Title2>
              {isFromCollegeStudents
                ? "Book Guidance For Your Future"
                : "Have questions? Contact with us today"}
            </Title2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name Input */}
            <div className="relative" data-aos="zoom-out">
              <Input
                type="text"
                placeholder="Full name"
                className={`${className} ${
                  errors.fullName ? "border-red-500" : ""
                }`}
                aria-invalid={errors.fullName ? "true" : "false"}
                {...register("fullName", {
                  required: "Name is required",
                  minLength: {
                    value: 4,
                    message: "Name must be above 3 letters",
                  },
                })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="relative" data-aos="zoom-out">
              <Input
                type="email"
                placeholder="Enter your email"
                className={`${className} ${
                  errors.email ? "border-red-500" : ""
                }`}
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Mobile Number Input */}
            <div className="relative" data-aos="zoom-out">
              <Input
                type="tel"
                placeholder="Mobile number"
                className={`${className} ${
                  errors.mobileNumber ? "border-red-500" : ""
                }`}
                aria-invalid={errors.mobileNumber ? "true" : "false"}
                {...register("mobileNumber", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit mobile number",
                  },
                })}
              />
              {errors.mobileNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>

            {/* Course/Stream Input - Only for College Students */}
            {isFromCollegeStudents && (
              <div className="relative" data-aos="zoom-out">
                <Input
                  type="text"
                  placeholder="Stream / Course (e.g., B.Tech CSE, B.Sc, B.Com)"
                  className={`${className} ${
                    errors.course ? "border-red-500" : ""
                  }`}
                  aria-invalid={errors.course ? "true" : "false"}
                  {...register("course", {
                    required: isFromCollegeStudents
                      ? "Stream / Course is required"
                      : false,
                    minLength: {
                      value: 2,
                      message: "Please enter a valid course/stream",
                    },
                  })}
                />
                {errors.course && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.course.message}
                  </p>
                )}
              </div>
            )}

            {/* Message Textarea */}
            <div className="relative" data-aos="zoom-out">
              <Textarea
                placeholder="How can we help you? Feel free to get in touch!"
                rows={5}
                className={`${className} resize-none h-[120px]`}
                {...register("message")}
              />
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="flex items-start gap-3 pt-2" data-aos="zoom-out">
              <Controller
                name="privacyPolicy"
                control={control}
                rules={{ required: "You must agree to the Privacy Policy" }}
                render={({ field }) => (
                  <Checkbox
                    id="privacyPolicy"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                )}
              />
              <label
                htmlFor="privacyPolicy"
                className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                I agree to the Privacy Policy.
              </label>
            </div>
            {errors.privacyPolicy && (
              <p className="text-red-500 text-sm -mt-2">
                {errors.privacyPolicy.message}
              </p>
            )}

            {/* Submit Message */}
            {submitMessage && (
              <div
                className={`p-4 rounded-md ${
                  submitMessage.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
                data-aos="zoom-out"
              >
                <p className="text-sm">{submitMessage.text}</p>
              </div>
            )}

            {/* Submit Button */}
            <PrimaryButton
              type="submit"
              className="w-full sm:w-auto justify-center"
              dataAos="zoom-out"
              dataAosDelay="100"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Sending..."
                : isFromCollegeStudents
                ? "Book Now"
                : "Send Message"}
            </PrimaryButton>
          </form>
        </div>
      </div>
    </Container>
  );
};

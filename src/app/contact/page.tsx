"use client";

import { useForm, Controller } from "react-hook-form";
import { HeroBanner } from "@/components/common/HeroBanner";
import { Container } from "@/components/ui/Container";
import { AppIcon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PrimaryButton } from "@/components/ui/button";
import { addressData, emailData, phoneNumberData } from "@/constant/constant";
import { images } from "@/constant/images";
import Image from "next/image";
import { Title1, Title2 } from "@/components/helper/Titles";

const contactData = [phoneNumberData, emailData, addressData] as const;

export default function Contact() {
  return (
    <>
      <HeroBanner />
      <ContactInfo />
      <ContactFormSection />
      <div style={{ width: "100%", height: "400px" }}>
        <iframe
          title="Ramk InfoTech Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124444.45053776157!2d77.56899409004333!3d12.914850041477642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6db79897c325%3A0xe89033972e84394f!2sRamK%20InfoTech%20pvt%20ltd!5e0!3m2!1sen!2sin!4v1762104650464!5m2!1sen!2sin&maptype=hybrid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}

const ContactInfo = () => {
  return (
    <section className="pb-16 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactData.map((item, index) => (
            <div
              key={item.icon}
              className="bg-gray-100 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Purple square icon */}
              <div className="mb-6">
                <div className="w-20 h-20 bg-[var(--app-primary-color)] rounded-lg flex items-center justify-center shadow-md">
                  <AppIcon
                    name={item.icon}
                    size={32}
                    className="text-white"
                    color="white"
                  />
                </div>
              </div>

              {/* Contact information */}
              <div className="text-gray-800">
                {item.showCase.split("\n").map((line, lineIndex) => (
                  <p
                    key={lineIndex}
                    className="text-base leading-relaxed mb-1 last:mb-0 break-words"
                  >
                    {line.trim()}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

interface FormData {
  fullName: string;
  email: string;
  message?: string;
  privacyPolicy: boolean;
}

const ContactFormSection = () => {
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
      message: "",
      privacyPolicy: true, // Default checked
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    // Reset form after submission
    reset({
      fullName: "",
      email: "",
      message: "",
      privacyPolicy: true,
    });
  };

  const className =
    "border-0 border-b border-gray-300 rounded-none px-0 py-6 focus-visible:ring-0  focus-visible:border-[var(--app-primary-color)] bg-transparent text-[16px]! placeholder:text-gray-400";

  return (
    <Container className="py-16 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
        <div className="w-full px-10">
          <div className="mb-8 space-y-6">
            <Title1>CONTACT US</Title1>
            <Title2>Have questions? Contact with us today</Title2>
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
                className="text-sm text-gray-700 cursor-pointer"
              >
                I agree to the Privacy Policy.
              </label>
            </div>
            {errors.privacyPolicy && (
              <p className="text-red-500 text-sm -mt-2">
                {errors.privacyPolicy.message}
              </p>
            )}

            {/* Submit Button */}
            <PrimaryButton
              type="submit"
              className="w-full sm:w-auto justify-center"
              dataAos="zoom-out"
              dataAosDelay="100"
            >
              Send Message
            </PrimaryButton>
          </form>
        </div>
      </div>
    </Container>
  );
};

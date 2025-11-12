"use client";

import { Container } from "@/components/ui/Container";
import { AppIcon } from "@/components/ui/Icon";
import { addressData, emailData, phoneNumberData } from "@/constant/constant";
import Link from "next/link";
import { ContactFormSection } from "@/components/common/ContactFormSection";

const contactData = [phoneNumberData, emailData, addressData] as const;

export default function Contact() {
  return (
    <>
      <ContactInfo />
      <ContactFormSection />
      <Map />
    </>
  );
}

const ContactInfo = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactData.map((item, index) => (
          <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
            <Link
              href={item.link}
              className="bg-gray-100 block dark:bg-card rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 h-full"
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
              <div className="text-gray-800 dark:text-gray-200">
                {item.showCase.split("\n").map((line, lineIndex) => (
                  <p
                    key={lineIndex}
                    className="text-base leading-relaxed mb-1 last:mb-0 break-words"
                  >
                    {line.trim()}
                  </p>
                ))}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};

const Map = () => {
  return (
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
  );
};

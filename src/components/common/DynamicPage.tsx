"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import {
  PageHeader,
  SearchBar,
  PageSection,
  ContactInfo,
  FooterNote,
  FAQItem,
  ContactMethod,
  ResourceCard,
  QuickActions,
} from "@/components/common/PageComponents";

interface DynamicPageProps {
  pageData: {
    title: string;
    icon: string;
    description?: string;
    lastUpdated?: string;
    introduction?: {
      title: string;
      content: string;
    };
    sections?: Array<{
      title: string;
      content: string[];
    }>;
    faqItems?: Array<{
      question: string;
      answer: string;
    }>;
    contactMethods?: Array<{
      title: string;
      icon: string;
      description: string;
      contact: string;
      responseTime: string;
      color?: string;
      bgColor?: string;
    }>;
    resources?: Array<{
      title: string;
      description: string;
      icon: string;
      link: string;
    }>;
    quickActions?: Array<{
      title: string;
      icon: string;
      action: string;
    }>;
    contactInfo?: {
      title: string;
      description: string;
      email: string;
      phone: string;
      address?: string;
    };
    footerNote?: string;
    searchPlaceholder?: string;
  };
}

export const DynamicPage: React.FC<DynamicPageProps> = ({ pageData }) => {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  console.log(searchQuery)

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <PageHeader
            title={pageData.title}
            icon={pageData.icon}
            description={pageData.description}
            lastUpdated={pageData.lastUpdated}
          />

          {/* Search Bar */}
          {pageData.searchPlaceholder && (
            <SearchBar
              placeholder={pageData.searchPlaceholder}
              onSearch={handleSearch}
            />
          )}

          {/* Introduction */}
          {pageData.introduction && (
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {pageData.introduction.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {pageData.introduction.content}
              </p>
            </div>
          )}

          {/* Sections */}
          {pageData.sections && (
            <div className="space-y-8 mb-12">
              {pageData.sections.map((section, index) => (
                <PageSection
                  key={index}
                  title={section.title}
                  content={section.content}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* FAQ Items */}
          {pageData.faqItems && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Frequently Asked Questions
              </h3>
              <div className="bg-white rounded-lg shadow-sm">
                {pageData.faqItems.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQIndex === index}
                    onToggle={() => toggleFAQ(index)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Contact Methods */}
          {pageData.contactMethods && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Get Help Now
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pageData.contactMethods.map((method, index) => (
                  <ContactMethod
                    key={index}
                    title={method.title}
                    icon={method.icon}
                    description={method.description}
                    contact={method.contact}
                    responseTime={method.responseTime}
                    color={method.color}
                    bgColor={method.bgColor}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {pageData.resources && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pageData.resources.map((resource, index) => (
                  <ResourceCard
                    key={index}
                    title={resource.title}
                    description={resource.description}
                    icon={resource.icon}
                    link={resource.link}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {pageData.quickActions && (
            <QuickActions actions={pageData.quickActions} />
          )}

          {/* Contact Information */}
          {pageData.contactInfo && (
            <ContactInfo
              title={pageData.contactInfo.title}
              description={pageData.contactInfo.description}
              email={pageData.contactInfo.email}
              phone={pageData.contactInfo.phone}
              address={pageData.contactInfo.address}
            />
          )}

          {/* Footer Note */}
          {pageData.footerNote && <FooterNote content={pageData.footerNote} />}
        </div>
      </Container>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Title2 } from "@/components/helper/Titles";
import { AppIcon } from "@/components/ui/Icon";
import { faqData } from "@/constant/pageData";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AppIcon name={faqData.icon} className="w-8 h-8 text-blue-600" />
              <Title2>{faqData.title}</Title2>
            </div>
            <p className="text-gray-600 text-lg">
              {faqData.description}
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="relative">
              <AppIcon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search FAQs..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqData.categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Category Header */}
                <div className={`${category.bgColor} p-6`}>
                  <div className="flex items-center gap-3">
                    <AppIcon name={category.icon} className={`w-6 h-6 ${category.color}`} />
                    <h3 className="text-xl font-semibold text-gray-800">{category.title}</h3>
                  </div>
                </div>

                {/* Questions */}
                <div className="divide-y divide-gray-200">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 3 + faqIndex;
                    const isOpen = openIndex === globalIndex;
                    
                    return (
                      <div key={faqIndex} className="p-6">
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full text-left flex items-center justify-between gap-4 hover:text-blue-600 transition-colors"
                        >
                          <h4 className="font-semibold text-gray-800 pr-4">{faq.question}</h4>
                          <AppIcon 
                            name={isOpen ? "chevron-up" : "chevron-down"} 
                            className="w-5 h-5 text-gray-500 flex-shrink-0" 
                          />
                        </button>
                        
                        {isOpen && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mt-12">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Still Have Questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Cant find the answer you&apos;re looking for? Our support team is here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <AppIcon name="mail" className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-800">Email Support</p>
                    <p className="text-sm text-gray-600">support@ramkinfotech.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <AppIcon name="phone" className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-800">Phone Support</p>
                    <p className="text-sm text-gray-600">+91 83760 48808</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <AppIcon name="message-circle" className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-800">Live Chat</p>
                    <p className="text-sm text-gray-600">Available 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Resources</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {faqData.additionalResources.map((resource, index) => (
                <React.Fragment key={index}>
                  <a href={resource.link} className="text-blue-600 hover:text-blue-700 transition-colors">
                    {resource.name}
                  </a>
                  {index < faqData.additionalResources.length - 1 && (
                    <span className="text-gray-300">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

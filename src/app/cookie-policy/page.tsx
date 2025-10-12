"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Title2 } from "@/components/helper/Titles";
import { AppIcon } from "@/components/ui/Icon";

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      name: "Essential Cookies",
      description: "These cookies are necessary for the website to function properly and cannot be disabled.",
      examples: ["Authentication", "Security", "Session management"],
      purpose: "Required for basic website functionality"
    },
    {
      name: "Analytics Cookies",
      description: "These cookies help us understand how visitors interact with our website.",
      examples: ["Google Analytics", "Page views", "User behavior"],
      purpose: "To improve website performance and user experience"
    },
    {
      name: "Functional Cookies",
      description: "These cookies enable enhanced functionality and personalization.",
      examples: ["Language preferences", "Theme settings", "Course progress"],
      purpose: "To provide personalized features and remember your preferences"
    },
    {
      name: "Marketing Cookies",
      description: "These cookies are used to deliver relevant advertisements and track campaign effectiveness.",
      examples: ["Ad targeting", "Campaign tracking", "Social media integration"],
      purpose: "To show relevant ads and measure marketing effectiveness"
    }
  ];

  const cookieDetails = [
    {
      title: "What Are Cookies?",
      content: [
        "Cookies are small text files that are stored on your device when you visit our website.",
        "They help us provide you with a better experience by remembering your preferences and settings.",
        "Cookies can be 'session cookies' (temporary) or 'persistent cookies' (stored longer).",
        "Most web browsers accept cookies automatically, but you can modify your browser settings to decline cookies."
      ]
    },
    {
      title: "How We Use Cookies",
      content: [
        "To remember your login status and keep you signed in.",
        "To track your progress through our courses and learning materials.",
        "To personalize your experience based on your preferences and interests.",
        "To analyze website traffic and usage patterns to improve our services.",
        "To provide relevant content and recommendations based on your learning history."
      ]
    },
    {
      title: "Managing Your Cookie Preferences",
      content: [
        "You can control cookies through your browser settings.",
        "Most browsers allow you to refuse cookies or delete them.",
        "Disabling certain cookies may affect the functionality of our website.",
        "You can update your cookie preferences at any time through our cookie settings panel.",
        "We respect your privacy choices and will honor your preferences."
      ]
    },
    {
      title: "Third-Party Cookies",
      content: [
        "We may use third-party services that set their own cookies.",
        "These include analytics providers, social media platforms, and advertising networks.",
        "We do not control these third-party cookies and recommend reviewing their privacy policies.",
        "You can opt-out of third-party cookies through their respective opt-out mechanisms.",
        "We are committed to transparency about all cookies used on our platform."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AppIcon name="cookie" className="w-8 h-8 text-blue-600" />
              <Title2>Cookie Policy</Title2>
            </div>
            <p className="text-gray-600 text-lg">
              Last updated: January 2025
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Our Cookie Policy
            </h3>
            <p className="text-gray-600 leading-relaxed">
              This Cookie Policy explains how RamK Infotech uses cookies and similar technologies 
              when you visit our website. It explains what these technologies are and why we use them, 
              as well as your rights to control our use of them.
            </p>
          </div>

          {/* Cookie Types */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Types of Cookies We Use</h3>
            <div className="grid gap-6">
              {cookieTypes.map((cookie, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{cookie.name}</h4>
                      <p className="text-gray-600 mb-3">{cookie.description}</p>
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Examples:</p>
                        <div className="flex flex-wrap gap-2">
                          {cookie.examples.map((example, exIndex) => (
                            <span key={exIndex} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-blue-600 font-medium">{cookie.purpose}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Information */}
          <div className="space-y-8">
            {cookieDetails.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                  <AppIcon name="info" className="w-6 h-6 text-blue-600" />
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <AppIcon name="check-circle" className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Browser Settings */}
          <div className="bg-blue-50 rounded-lg p-8 mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Browser Cookie Settings
            </h3>
            <p className="text-gray-600 mb-4">
              You can control cookies through your browser settings. Here are links to help you manage cookies in popular browsers:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <AppIcon name="chrome" className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700">Google Chrome</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <AppIcon name="firefox" className="w-6 h-6 text-orange-600" />
                <span className="text-gray-700">Mozilla Firefox</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <AppIcon name="safari" className="w-6 h-6 text-blue-500" />
                <span className="text-gray-700">Safari</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <AppIcon name="edge" className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700">Microsoft Edge</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-100 rounded-lg p-8 mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Questions About Cookies?
            </h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <AppIcon name="mail" className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">privacy@ramkinfotech.com</span>
              </div>
              <div className="flex items-center gap-3">
                <AppIcon name="phone" className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">+91 83760 48808</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

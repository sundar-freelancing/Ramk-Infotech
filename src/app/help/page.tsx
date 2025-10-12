"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Title2 } from "@/components/helper/Titles";
import { AppIcon } from "@/components/ui/Icon";
import { PrimaryButton } from "@/components/ui/button";

export default function HelpCenterPage() {
  const helpCategories = [
    {
      title: "Getting Started",
      icon: "play-circle",
      color: "text-green-600",
      bgColor: "bg-green-50",
      items: [
        "How to create an account",
        "How to enroll in a course",
        "Understanding the platform",
        "Setting up your profile"
      ]
    },
    {
      title: "Course Management",
      icon: "book-open",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      items: [
        "Accessing course materials",
        "Tracking your progress",
        "Submitting assignments",
        "Taking quizzes and exams"
      ]
    },
    {
      title: "Technical Support",
      icon: "settings",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      items: [
        "Video playback issues",
        "Login problems",
        "Mobile app support",
        "Browser compatibility"
      ]
    },
    {
      title: "Payment & Billing",
      icon: "credit-card",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      items: [
        "Payment methods",
        "Refund requests",
        "Invoice generation",
        "Subscription management"
      ]
    }
  ];

  const faqItems = [
    {
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email."
    },
    {
      question: "Can I access courses on mobile devices?",
      answer: "Yes! Our platform is fully responsive and works on all mobile devices. We also have dedicated mobile apps for iOS and Android."
    },
    {
      question: "How long do I have access to my courses?",
      answer: "You have lifetime access to all courses you purchase. You can revisit the materials anytime, even after completing the course."
    },
    {
      question: "What if I'm not satisfied with a course?",
      answer: "We offer a 7-day money-back guarantee. If you're not satisfied, contact our support team within 7 days of enrollment for a full refund."
    },
    {
      question: "How do I get my completion certificate?",
      answer: "Certificates are automatically generated when you complete a course with a passing grade. You can download them from your dashboard."
    }
  ];

  const contactMethods = [
    {
      title: "Email Support",
      icon: "mail",
      description: "Get detailed help via email",
      contact: "support@ramkinfotech.com",
      responseTime: "Within 24 hours"
    },
    {
      title: "Phone Support",
      icon: "phone",
      description: "Speak directly with our team",
      contact: "+91 83760 48808",
      responseTime: "Mon-Fri, 9 AM - 6 PM"
    },
    {
      title: "Live Chat",
      icon: "message-circle",
      description: "Instant help when you need it",
      contact: "Available on website",
      responseTime: "Real-time"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AppIcon name="help-circle" className="w-8 h-8 text-blue-600" />
              <Title2>Help Center</Title2>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find answers to common questions, get technical support, and learn how to make the most of your learning experience.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <AppIcon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help articles, FAQs, or topics..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Help Categories */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Browse Help Topics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {helpCategories.map((category, index) => (
                <div key={index} className={`${category.bgColor} rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer`}>
                  <div className="flex items-center gap-3 mb-4">
                    <AppIcon name={category.icon} className={`w-6 h-6 ${category.color}`} />
                    <h4 className="font-semibold text-gray-800">{category.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Frequently Asked Questions</h3>
            <div className="bg-white rounded-lg shadow-sm">
              {faqItems.map((faq, index) => (
                <div key={index} className={`p-6 ${index !== faqItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      Q
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Methods */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Get in Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AppIcon name={method.icon} className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">{method.title}</h4>
                  <p className="text-gray-600 mb-3">{method.description}</p>
                  <p className="text-blue-600 font-medium mb-2">{method.contact}</p>
                  <p className="text-sm text-gray-500">{method.responseTime}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Quick Actions</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <PrimaryButton className="flex items-center gap-2">
                <AppIcon name="mail" className="w-4 h-4" />
                Contact Support
              </PrimaryButton>
              <PrimaryButton variant="outline" className="flex items-center gap-2">
                <AppIcon name="book" className="w-4 h-4" />
                View Documentation
              </PrimaryButton>
              <PrimaryButton variant="outline" className="flex items-center gap-2">
                <AppIcon name="video" className="w-4 h-4" />
                Watch Tutorials
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

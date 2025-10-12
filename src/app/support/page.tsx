"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Title2 } from "@/components/helper/Titles";
import { AppIcon } from "@/components/ui/Icon";
import { PrimaryButton } from "@/components/ui/button";

export default function StudentSupportPage() {
  const supportServices = [
    {
      title: "Academic Support",
      icon: "graduation-cap",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Get help with course content, assignments, and learning materials",
      services: [
        "Course content clarification",
        "Assignment assistance",
        "Study group coordination",
        "Learning resource recommendations"
      ]
    },
    {
      title: "Technical Support",
      icon: "settings",
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Resolve technical issues and platform-related problems",
      services: [
        "Login and access issues",
        "Video playback problems",
        "Mobile app support",
        "Browser compatibility"
      ]
    },
    {
      title: "Career Guidance",
      icon: "briefcase",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Professional development and career advancement support",
      services: [
        "Resume building",
        "Interview preparation",
        "Job search strategies",
        "Industry insights"
      ]
    },
    {
      title: "Mental Health Support",
      icon: "heart",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      description: "Wellness and mental health resources for students",
      services: [
        "Stress management",
        "Study-life balance",
        "Motivation and encouragement",
        "Peer support groups"
      ]
    }
  ];

  const resources = [
    {
      title: "Study Guides",
      description: "Comprehensive study materials and guides for all courses",
      icon: "book",
      link: "/study-guides"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video tutorials for complex topics",
      icon: "video",
      link: "/tutorials"
    },
    {
      title: "Practice Tests",
      description: "Mock exams and practice questions to test your knowledge",
      icon: "clipboard-check",
      link: "/practice-tests"
    },
    {
      title: "Community Forum",
      description: "Connect with fellow students and share experiences",
      icon: "users",
      link: "/community"
    }
  ];

  const contactOptions = [
    {
      title: "Emergency Support",
      icon: "phone-call",
      description: "For urgent technical issues",
      contact: "+91 83760 48808",
      availability: "24/7",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Academic Advisor",
      icon: "user-check",
      description: "For course-related questions",
      contact: "advisor@ramkinfotech.com",
      availability: "Mon-Fri, 9 AM - 6 PM",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Technical Support",
      icon: "tool",
      description: "For platform and technical issues",
      contact: "tech@ramkinfotech.com",
      availability: "Mon-Sun, 8 AM - 10 PM",
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  const tips = [
    {
      title: "Set Realistic Goals",
      description: "Break down your learning into manageable chunks and set achievable milestones.",
      icon: "target"
    },
    {
      title: "Create a Study Schedule",
      description: "Establish a consistent study routine that fits your lifestyle and commitments.",
      icon: "calendar"
    },
    {
      title: "Take Regular Breaks",
      description: "Avoid burnout by taking short breaks every 45-60 minutes of study time.",
      icon: "clock"
    },
    {
      title: "Join Study Groups",
      description: "Connect with other students to share knowledge and stay motivated.",
      icon: "users"
    },
    {
      title: "Ask Questions",
      description: "Don't hesitate to ask for help when you need it. Our support team is here for you.",
      icon: "help-circle"
    },
    {
      title: "Practice Regularly",
      description: "Consistent practice is key to mastering new skills and retaining knowledge.",
      icon: "repeat"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AppIcon name="users" className="w-8 h-8 text-blue-600" />
              <Title2>Student Support Center</Title2>
            </div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We're committed to your success! Find all the support you need to excel in your learning journey.
            </p>
          </div>

          {/* Support Services */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Our Support Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportServices.map((service, index) => (
                <div key={index} className={`${service.bgColor} rounded-lg p-6 hover:shadow-md transition-shadow`}>
                  <div className="flex items-start gap-4">
                    <div className={`bg-white rounded-full p-3 ${service.color}`}>
                      <AppIcon name={service.icon} className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h4>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <ul className="space-y-1">
                        {service.services.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm text-gray-600 flex items-center gap-2">
                            <AppIcon name="check" className="w-4 h-4 text-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Resources */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Learning Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AppIcon name={resource.icon} className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">{resource.title}</h4>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Options */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Get Help Now</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactOptions.map((option, index) => (
                <div key={index} className={`${option.bgColor} rounded-lg p-6 text-center`}>
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AppIcon name={option.icon} className={`w-8 h-8 ${option.color}`} />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">{option.title}</h4>
                  <p className="text-gray-600 mb-3">{option.description}</p>
                  <p className="font-medium text-gray-800 mb-1">{option.contact}</p>
                  <p className="text-sm text-gray-500">{option.availability}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Study Tips */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Study Tips for Success</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                      <AppIcon name={tip.icon} className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">{tip.title}</h4>
                      <p className="text-gray-600 text-sm">{tip.description}</p>
                    </div>
                  </div>
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
                <AppIcon name="calendar" className="w-4 h-4" />
                Schedule Consultation
              </PrimaryButton>
              <PrimaryButton variant="outline" className="flex items-center gap-2">
                <AppIcon name="users" className="w-4 h-4" />
                Join Study Group
              </PrimaryButton>
              <PrimaryButton variant="outline" className="flex items-center gap-2">
                <AppIcon name="book" className="w-4 h-4" />
                Access Resources
              </PrimaryButton>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <AppIcon name="alert-triangle" className="w-6 h-6 text-red-600" />
              <h4 className="font-semibold text-red-800">Emergency Support</h4>
            </div>
            <p className="text-red-700 mb-3">
              For urgent technical issues that prevent you from accessing your courses, contact our emergency support line.
            </p>
            <div className="flex items-center gap-3">
              <AppIcon name="phone" className="w-5 h-5 text-red-600" />
              <span className="font-medium text-red-800">+91 83760 48808 (24/7)</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

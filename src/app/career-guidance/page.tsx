"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Title2 } from "@/components/helper/Titles";
import { AppIcon } from "@/components/ui/Icon";
import { PrimaryButton } from "@/components/ui/button";

export default function CareerGuidancePage() {
  const careerPaths = [
    {
      title: "Web Development",
      icon: "code",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Build modern web applications and websites",
      skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "Database"],
      salary: "₹3-8 LPA",
      duration: "6-12 months"
    },
    {
      title: "Data Science",
      icon: "bar-chart-3",
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Analyze data to drive business decisions",
      skills: ["Python", "R", "SQL", "Machine Learning", "Statistics"],
      salary: "₹4-10 LPA",
      duration: "8-15 months"
    },
    {
      title: "Cloud Computing",
      icon: "cloud",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Manage cloud infrastructure and services",
      skills: ["AWS", "Azure", "Docker", "Kubernetes", "DevOps"],
      salary: "₹5-12 LPA",
      duration: "6-10 months"
    },
    {
      title: "Mobile Development",
      icon: "smartphone",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Create mobile applications for iOS and Android",
      skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      salary: "₹4-9 LPA",
      duration: "8-12 months"
    }
  ];

  const careerSteps = [
    {
      step: "1",
      title: "Self Assessment",
      description: "Identify your interests, strengths, and career goals",
      icon: "user-check",
      details: [
        "Take career assessment tests",
        "Identify your skills and interests",
        "Set realistic career goals",
        "Research different career paths"
      ]
    },
    {
      step: "2",
      title: "Skill Development",
      description: "Learn the technical and soft skills required for your chosen field",
      icon: "book-open",
      details: [
        "Enroll in relevant courses",
        "Practice with real projects",
        "Build a portfolio",
        "Develop soft skills"
      ]
    },
    {
      step: "3",
      title: "Portfolio Building",
      description: "Create a strong portfolio showcasing your skills and projects",
      icon: "briefcase",
      details: [
        "Complete personal projects",
        "Contribute to open source",
        "Create a professional portfolio",
        "Document your achievements"
      ]
    },
    {
      step: "4",
      title: "Job Search",
      description: "Apply for positions and prepare for interviews",
      icon: "search",
      details: [
        "Update your resume and LinkedIn",
        "Apply for relevant positions",
        "Prepare for technical interviews",
        "Network with professionals"
      ]
    }
  ];

  const resources = [
    {
      title: "Resume Builder",
      description: "Create professional resumes tailored to your field",
      icon: "file-text",
      link: "/resume-builder"
    },
    {
      title: "Interview Prep",
      description: "Practice common interview questions and scenarios",
      icon: "message-circle",
      link: "/interview-prep"
    },
    {
      title: "Job Board",
      description: "Find relevant job opportunities in your field",
      icon: "briefcase",
      link: "/jobs"
    },
    {
      title: "Networking Events",
      description: "Connect with industry professionals and peers",
      icon: "users",
      link: "/networking"
    }
  ];

  const successStories = [
    {
      name: "Priya Sharma",
      role: "Frontend Developer",
      company: "TechCorp",
      image: "/images/avatar1.jpg",
      story: "After completing the Web Development course, I landed my dream job at TechCorp. The hands-on projects and mentorship were invaluable."
    },
    {
      name: "Rajesh Kumar",
      role: "Data Scientist",
      company: "DataFlow Inc",
      image: "/images/avatar2.jpg",
      story: "The Data Science program helped me transition from finance to tech. The practical approach and industry insights made all the difference."
    },
    {
      name: "Anita Patel",
      role: "Cloud Engineer",
      company: "CloudTech Solutions",
      image: "/images/avatar3.jpg",
      story: "Starting with zero tech background, I'm now a Cloud Engineer. The structured learning path and continuous support were key to my success."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AppIcon name="trending-up" className="w-8 h-8 text-blue-600" />
              <Title2>Career Guidance Center</Title2>
            </div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Discover your career path, develop essential skills, and land your dream job with our comprehensive career guidance program.
            </p>
          </div>

          {/* Career Paths */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Popular Career Paths</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {careerPaths.map((path, index) => (
                <div key={index} className={`${path.bgColor} rounded-lg p-6 hover:shadow-md transition-shadow`}>
                  <div className="flex items-start gap-4">
                    <div className={`bg-white rounded-full p-3 ${path.color}`}>
                      <AppIcon name={path.icon} className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{path.title}</h4>
                      <p className="text-gray-600 mb-4">{path.description}</p>
                      
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-700 mb-2">Key Skills:</h5>
                        <div className="flex flex-wrap gap-2">
                          {path.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="bg-white text-gray-600 px-2 py-1 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Salary:</span>
                          <span className="text-green-600 ml-1">{path.salary}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Duration:</span>
                          <span className="text-blue-600 ml-1">{path.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Journey Steps */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Your Career Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {careerSteps.map((step, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">{step.step}</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                  <ul className="text-left space-y-1">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-xs text-gray-600 flex items-center gap-2">
                        <AppIcon name="check" className="w-3 h-3 text-green-500" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Success Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {successStories.map((story, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="text-center mb-4">
                    <div className="bg-gray-200 w-16 h-16 rounded-full mx-auto mb-3"></div>
                    <h4 className="font-semibold text-gray-800">{story.name}</h4>
                    <p className="text-blue-600 font-medium">{story.role}</p>
                    <p className="text-gray-600 text-sm">{story.company}</p>
                  </div>
                  <p className="text-gray-600 text-sm italic">"{story.story}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Career Resources */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Career Resources</h3>
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

          {/* Career Consultation */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Need Personalized Career Guidance?
              </h3>
              <p className="text-gray-600 mb-6">
                Book a one-on-one session with our career counselors to get personalized advice and create a roadmap for your success.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <PrimaryButton className="flex items-center gap-2">
                  <AppIcon name="calendar" className="w-4 h-4" />
                  Book Consultation
                </PrimaryButton>
                <PrimaryButton variant="outline" className="flex items-center gap-2">
                  <AppIcon name="download" className="w-4 h-4" />
                  Download Career Guide
                </PrimaryButton>
                <PrimaryButton variant="outline" className="flex items-center gap-2">
                  <AppIcon name="users" className="w-4 h-4" />
                  Join Career Community
                </PrimaryButton>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Career Support Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AppIcon name="user-check" className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Career Counselor</h4>
                <p className="text-gray-600 text-sm mb-2">career@ramkinfotech.com</p>
                <p className="text-gray-500 text-xs">Mon-Fri, 9 AM - 6 PM</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AppIcon name="briefcase" className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Job Placement</h4>
                <p className="text-gray-600 text-sm mb-2">placement@ramkinfotech.com</p>
                <p className="text-gray-500 text-xs">Mon-Fri, 10 AM - 5 PM</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AppIcon name="phone" className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">General Support</h4>
                <p className="text-gray-600 text-sm mb-2">+91 83760 48808</p>
                <p className="text-gray-500 text-xs">Mon-Sun, 8 AM - 10 PM</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

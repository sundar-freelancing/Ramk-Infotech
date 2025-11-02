"use client";

import React, { useState } from "react";
import { Button, PrimaryButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, CheckCircle2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import Link from "next/link";
import { pageLink } from "@/constant/pageURL";
import { AppIcon } from "../ui/Icon";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400"],
});

// Utility functions
const generateUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const getCurrentTimestamp = (): string => {
  return new Date().toISOString();
};

// Cookie management functions
const setCookie = (name: string, value: string, days: number = 365) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Utility function to get all student form cookies for debugging
const getStudentFormCookies = () => {
  return {
    uuid: getCookie("studentFormUUID"),
    lastUpdate: getCookie("studentFormLastUpdate"),
    createdAt: getCookie("studentFormCreatedAt"),
  };
};

interface FormData {
  purpose: string;
  source: string;
  interest: string;
  timeline: string;
  name: string;
  email: string;
  mobile: string;
  status: string;
  uuid: string;
  createdAt: string;
  updatedAt: string;
}

const selectOptions = {
  purpose: [
    { value: "learn-skills", label: "I want to learn new tech skills" },
    { value: "job-courses", label: "I'm looking for job-oriented courses" },
    { value: "career-growth", label: "I want to improve my career growth" },
    { value: "exploring", label: "Just exploring" },
  ],
  source: [
    { value: "social-media", label: "Instagram / Facebook" },
    { value: "friends-college", label: "Friends / College" },
    { value: "google-search", label: "Google Search" },
    { value: "posters-events", label: "Posters / Events" },
  ],
  interest: [
    { value: "web-development", label: "Web Development" },
    { value: "data-science", label: "Data Science" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "graphic-design", label: "Graphic Design" },
    { value: "software-testing", label: "Software Testing" },
  ],
  timeline: [
    { value: "immediately", label: "Immediately" },
    { value: "within-month", label: "Within 1 month" },
    { value: "next-semester", label: "Next semester" },
    { value: "checking-options", label: "Just checking options" },
  ],
};

const QuizFormLogic = ({
  onClose,
  setIsSubmitted,
  isSubmitted,
}: {
  onClose: (open: boolean) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
  isSubmitted: boolean;
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Initialize form data with proper localStorage handling
  const initializeFormData = (): FormData => {
    try {
      const storedData = localStorage.getItem("studentsFormData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        return {
          purpose: parsedData.purpose || "",
          source: parsedData.source || "",
          interest: parsedData.interest || "",
          timeline: parsedData.timeline || "",
          name: parsedData.name || "",
          email: parsedData.email || "",
          mobile: parsedData.mobile || "",
          status: parsedData.status || "pending",
          uuid: parsedData.uuid || generateUUID(),
          createdAt: parsedData.createdAt || getCurrentTimestamp(),
          updatedAt: parsedData.updatedAt || getCurrentTimestamp(),
        };
      }
    } catch (error) {
      console.error("Error parsing stored form data:", error);
    }

    // Return default form data with new UUID and timestamps
    return {
      purpose: "",
      source: "",
      interest: "",
      timeline: "",
      name: "",
      email: "",
      mobile: "",
      status: "pending",
      uuid: generateUUID(),
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
    };
  };

  const [formData, setFormData] = useState<FormData>(initializeFormData());
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      updatedAt: getCurrentTimestamp(), // Update timestamp on any field change
    }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const setDataToLocalStorage = () => {
    const dataToStore = {
      ...formData,
      updatedAt: getCurrentTimestamp(),
    };
    localStorage.setItem("studentsFormData", JSON.stringify(dataToStore));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};
    setDataToLocalStorage();
    if (step === 1) {
      if (!formData.purpose) newErrors.purpose = "Please select your purpose";
      if (!formData.source)
        newErrors.source = "Please select how you heard about us";
    } else if (step === 2) {
      if (!formData.interest)
        newErrors.interest = "Please select your area of interest";
      if (!formData.timeline)
        newErrors.timeline = "Please select your timeline";
    } else if (step === 3) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Enter a valid email";
      }
      if (!formData.mobile.trim()) {
        newErrors.mobile = "Mobile number is required";
      } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
        newErrors.mobile = "Enter a valid 10-digit mobile number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = () => {
    console.log(validateStep(3));
    if (validateStep(3)) {
      // Update form data with final timestamps
      const finalFormData = {
        ...formData,
        status: "submitted",
        updatedAt: getCurrentTimestamp(),
      };

      // Store in localStorage
      localStorage.setItem("studentsFormData", JSON.stringify(finalFormData));

      // Store UUID and timestamp in cookies
      setCookie("studentFormUUID", finalFormData.uuid);
      setCookie("studentFormLastUpdate", finalFormData.updatedAt);
      setCookie("studentFormCreatedAt", finalFormData.createdAt);

      console.log("✅ Form submitted:", finalFormData);
      console.log("🍪 Cookies set:", {
        uuid: finalFormData.uuid,
        lastUpdate: finalFormData.updatedAt,
        createdAt: finalFormData.createdAt,
      });
      console.log("🍪 Cookies retrieved:", getStudentFormCookies());

      setIsSubmitted(true);
    }
  };

  const handleEdit = () => {
    // Reset form with new timestamps for editing
    const resetFormData = {
      ...formData,
      status: "editing",
      updatedAt: getCurrentTimestamp(),
    };

    setFormData(resetFormData);
    localStorage.setItem("studentsFormData", JSON.stringify(resetFormData));

    setIsSubmitted(false);
    setCurrentStep(1);
  };

  const renderSelectField = (
    field: keyof FormData,
    label: string,
    placeholder: string
  ) => (
    <div className="space-y-3">
      <label className="block text-[16px] text-gray-200 text-center">
        {label}
      </label>
      <Select
        value={formData[field]}
        onValueChange={(value) => updateFormData(field, value)}
      >
        <SelectTrigger
          className={`bg-white rounded-md p-3 py-6 font-normal text-md w-full ${
            formData[field] ? "!text-gray-800" : "!text-gray-400"
          }`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {selectOptions[field as keyof typeof selectOptions]?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors[field] && (
        <p className="text-red-400 text-sm mt-1">{errors[field]}</p>
      )}
    </div>
  );

  const renderInputField = (
    field: keyof FormData,
    label: string,
    placeholder: string
  ) => (
    <div className="space-y-3">
      <label htmlFor={field} className="block text-[16px] text-gray-200">
        {label}
      </label>
      <Input
        id={field}
        value={formData[field]}
        onChange={(e) => updateFormData(field, e.target.value)}
        placeholder={placeholder}
        className="bg-white rounded-md p-3 py-6 font-normal text-md w-full"
      />
      {errors[field] && (
        <p className="text-red-400 text-sm mt-1">{errors[field]}</p>
      )}
    </div>
  );

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center relative">
      <div className="absolute top-0 left-0 font-cursive -rotate-20">
        <p className={`text-white ${dancingScript.className}`}>
          3 simple steps
        </p>
        <AppIcon
          name="undo"
          className="w-10 h-10 text-yellow-500 absolute right-0 -rotate-150"
        />
      </div>
      <div className="flex items-center space-x-2">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <div
              onClick={() => step < currentStep && setCurrentStep(step)}
              className={`w-11 h-11 text-lg duration-500 rounded-full flex items-center justify-center font-bold bg-gray-100 text-gray-500 cursor-pointer ${
                step === currentStep
                  ? "bg-yellow-500 text-white"
                  : step < currentStep
                  ? "bg-green-500 text-white"
                  : ""
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <div
                className={`w-8 h-0.5 border-b-2 border-dashed border-gray-300 duration-500 ${
                  step < currentStep ? "border-green-500" : ""
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          {renderSelectField(
            "purpose",
            "What brings you to Ramk Infotech?",
            "Select your purpose"
          )}
          {renderSelectField(
            "source",
            "How did you hear about us?",
            "Select an option"
          )}
        </div>
      );
    }
    if (currentStep === 2) {
      return (
        <div className="space-y-6">
          {renderSelectField(
            "interest",
            "Which area interests you?",
            "Select your interest"
          )}
          {renderSelectField(
            "timeline",
            "When do you plan to start learning?",
            "Select a time"
          )}
        </div>
      );
    }
    if (currentStep === 3) {
      return (
        <div className="space-y-6">
          {renderInputField("name", "Name *", "Enter your name")}
          {renderInputField("email", "Email *", "Enter your email")}
          {renderInputField("mobile", "Mobile *", "Enter your mobile")}
        </div>
      );
    }
  };

  if (isSubmitted) {
    return (
      <AlertDialogContent className="w-full max-w-2xl bg-[#73358C] bg-[radial-gradient(circle,rgba(115,53,140,1)_0%,rgba(55,52,142,1)_100%)] border-none flex flex-col items-center justify-center py-20 text-center space-y-4">
        <AlertDialogDescription className="sr-only">
          Your form has been submitted successfully. You can edit your details
          if needed.
        </AlertDialogDescription>
        <CheckCircle2 className="w-16 h-16 text-green-400" />
        <AlertDialogTitle className="text-2xl text-white font-semibold">
          Thank You!
        </AlertDialogTitle>
        <p className="text-gray-200">
          Your details have been submitted successfully.
        </p>
        <PrimaryButton onClick={handleEdit}>Edit Form</PrimaryButton>
      </AlertDialogContent>
    );
  }

  return (
    <AlertDialogContent className="w-full max-w-2xl bg-[#73358C] bg-[radial-gradient(circle,rgba(115,53,140,1)_0%,rgba(55,52,142,1)_100%)] border-none gap-6">
      <span
        className="absolute cursor-pointer top-4 right-4 text-yellow-400 hover:text-yellow-300"
        onClick={() => onClose(false)}
      >
        <X className="h-4 w-4" />
      </span>

      <AlertDialogTitle className="text-2xl font-normal text-white text-center mb-0">
        {currentStep === 1 && "Get to Know You"}
        {currentStep === 2 && "Your Interests"}
        {currentStep === 3 && "Stay Connected"}
      </AlertDialogTitle>

      <AlertDialogDescription className="sr-only">
        {currentStep === 1 &&
          "Tell us about your purpose and how you heard about us"}
        {currentStep === 2 &&
          "Select your area of interest and preferred timeline"}
        {currentStep === 3 &&
          "Provide your contact information to stay connected"}
      </AlertDialogDescription>

      {renderStepIndicator()}

      <div className="w-5/6 mx-auto">{renderCurrentStep()}</div>

      <div className="flex justify-center">
        <PrimaryButton onClick={currentStep < 3 ? handleNext : handleSubmit}>
          {currentStep < 3 ? "Next" : "Submit"}
        </PrimaryButton>
      </div>

      <div className="space-y-4">
        <p className="text-white text-center">What We Do :</p>
        <div className="flex items-center space-x-4 justify-center">
          <Link
            href={pageLink.courses}
            className="text-white flex items-center gap-2"
          >
            <AppIcon name="chevron-right" className="w-4 h-4 text-yellow-500" />
            Courses
          </Link>
          <Link
            href={pageLink.internship}
            className="text-white flex items-center gap-2"
          >
            <AppIcon name="chevron-right" className="w-4 h-4 text-yellow-500" />
            Internship
          </Link>
          <Link
            href={pageLink.courses}
            className="text-white flex items-center gap-2"
          >
            <AppIcon name="chevron-right" className="w-4 h-4 text-yellow-500" />
            College Students
          </Link>
        </div>
      </div>
      <p className={`text-white text-center ${dancingScript.className}`}>
        ...and so much more
      </p>
    </AlertDialogContent>
  );
};

export const StudentsForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogTrigger asChild>
        <Button className="fixed bottom-4 left-4 z-[100]">Open</Button>
      </AlertDialogTrigger>
      <QuizFormLogic
        onClose={handleClose}
        setIsSubmitted={setIsSubmitted}
        isSubmitted={isSubmitted}
      />
    </AlertDialog>
  );
};


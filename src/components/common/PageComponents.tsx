"use client";

import React from "react";
import { Title2 } from "@/components/helper/Titles";
import { AppIcon } from "@/components/ui/Icon";

interface PageHeaderProps {
  title: string;
  icon: string;
  description?: string;
  lastUpdated?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  icon,
  description,
  lastUpdated,
}) => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <AppIcon name={icon} className="w-8 h-8 text-blue-600" />
        <Title2>{title}</Title2>
      </div>
      {lastUpdated && (
        <p className="text-gray-600 text-lg mb-4">
          Last updated: {lastUpdated}
        </p>
      )}
      {description && (
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">{description}</p>
      )}
    </div>
  );
};

interface SearchBarProps {
  placeholder: string;
  onSearch?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onSearch,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <AppIcon
            name="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          />
          <input
            type="text"
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

interface PageSectionProps {
  title: string;
  content: string[];
  index: number;
}

export const PageSection: React.FC<PageSectionProps> = ({
  title,
  content,
  index,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
        <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
          {index + 1}
        </span>
        {title}
      </h3>
      <ul className="space-y-3">
        {content.map((item, itemIndex) => (
          <li key={itemIndex} className="flex items-start gap-3">
            <AppIcon
              name="check-circle"
              className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
            />
            <span className="text-gray-600">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface ContactInfoProps {
  title: string;
  description: string;
  email: string;
  phone: string;
  address?: string;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  title,
  description,
  email,
  phone,
  address,
}) => {
  return (
    <div className="bg-blue-50 rounded-lg p-8 mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <AppIcon name="mail" className="w-5 h-5 text-blue-600" />
          <span className="text-gray-700">{email}</span>
        </div>
        <div className="flex items-center gap-3">
          <AppIcon name="phone" className="w-5 h-5 text-blue-600" />
          <span className="text-gray-700">{phone}</span>
        </div>
        {address && (
          <div className="flex items-center gap-3">
            <AppIcon name="map-pin" className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">{address}</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface FooterNoteProps {
  content: string;
}

export const FooterNote: React.FC<FooterNoteProps> = ({ content }) => {
  return (
    <div className="text-center mt-8 p-6 bg-gray-100 rounded-lg">
      <p className="text-gray-600 text-sm">{content}</p>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="p-6 border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full text-left flex items-center justify-between gap-4 hover:text-blue-600 transition-colors"
      >
        <h4 className="font-semibold text-gray-800 pr-4">{question}</h4>
        <AppIcon
          name={isOpen ? "chevron-up" : "chevron-down"}
          className="w-5 h-5 text-gray-500 flex-shrink-0"
        />
      </button>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

interface ContactMethodProps {
  title: string;
  icon: string;
  description: string;
  contact: string;
  responseTime: string;
  color?: string;
  bgColor?: string;
}

export const ContactMethod: React.FC<ContactMethodProps> = ({
  title,
  icon,
  description,
  contact,
  responseTime,
  color = "text-blue-600",
  bgColor = "bg-blue-50",
}) => {
  return (
    <div className={`${bgColor} rounded-lg p-6 text-center`}>
      <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <AppIcon name={icon} className={`w-8 h-8 ${color}`} />
      </div>
      <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600 mb-3">{description}</p>
      <p className="font-medium text-gray-800 mb-1">{contact}</p>
      <p className="text-sm text-gray-500">{responseTime}</p>
    </div>
  );
};

interface ResourceCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
      <div className="text-center">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <AppIcon name={icon} className="w-8 h-8 text-blue-600" />
        </div>
        <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

interface QuickActionsProps {
  actions: Array<{
    title: string;
    icon: string;
    action: string;
  }>;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Quick Actions
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <AppIcon name={action.icon} className="w-4 h-4" />
            {action.title}
          </button>
        ))}
      </div>
    </div>
  );
};

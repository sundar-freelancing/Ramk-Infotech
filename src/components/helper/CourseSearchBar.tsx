"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { AppIcon } from "../ui/Icon";
import { courses as staticCourses } from "@/constant/staticCourse";
import { pageURL } from "@/constant/pageURL";
import { createCourseSlug } from "@/lib/courseUtils";
import { CourseInterface } from "@/store/interfaces";
import { cn } from "@/lib/utils";

interface CourseSearchBarProps {
  className?: string;
}

const CategorySelect = ({
  category,
  categories,
  onCategoryChange,
}: {
  category: string;
  categories: string[];
  onCategoryChange: (value: string) => void;
}) => {
  return (
    <Select value={category} onValueChange={onCategoryChange}>
      <SelectTrigger
        className="max-w-[300px] border-none shadow-none pl-6 hidden lg:flex dark:bg-transparent"
        isFocusLess
        aria-label="Select course category"
      >
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const CourseSearchBar: React.FC<CourseSearchBarProps> = ({
  className,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Extract unique categories from enabled courses
  const courseCategories = useMemo(() => {
    const enabledCourses = staticCourses.filter((course) => course.isEnabled);
    const uniqueCategories = Array.from(
      new Set(enabledCourses.map((course) => course.category))
    ).sort();
    return ["All Categories", ...uniqueCategories];
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Filter courses based on category and search query
  const filteredCourses = useMemo(() => {
    let filtered = staticCourses.filter((course) => course.isEnabled);

    // Filter by category if not "All Categories"
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((course) => course.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((course) => {
        const nameMatch = course.name.toLowerCase().includes(query);
        const searchKeysMatch = course.searchKeys.some((key) =>
          key.toLowerCase().includes(query)
        );
        return nameMatch || searchKeysMatch;
      });
    }

    return filtered.slice(0, 8); // Limit to 8 suggestions
  }, [selectedCategory, searchQuery]);

  // Handle search input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsOpen(value.trim().length > 0 && filteredCourses.length > 0);
    setFocusedIndex(-1);
  };

  // Handle course selection
  const handleCourseSelect = (course: CourseInterface) => {
    setSearchQuery("");
    setIsOpen(false);
    router.push(`${pageURL.courses.href}/${createCourseSlug(course.name)}`);
  };

  // Handle search button click
  const handleSearch = () => {
    if (searchQuery.trim()) {
      const query = searchQuery.trim();
      router.push(`${pageURL.courses.href}?search=${encodeURIComponent(query)}`);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredCourses.length === 0) {
      if (e.key === "Enter") {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev < filteredCourses.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredCourses.length) {
          handleCourseSelect(filteredCourses[focusedIndex]);
        } else {
          handleSearch();
        }
        break;
      case "Escape":
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex >= 0 && suggestionsRef.current) {
      const focusedElement = suggestionsRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [focusedIndex]);

  return (
    <div className={cn("bg-white dark:bg-gray-800 flex items-center flex-1 gap-2 shadow border border-gray-400 rounded-full p-1 h-full relative", className)}>
      <CategorySelect
        category={selectedCategory}
        categories={courseCategories}
        onCategoryChange={setSelectedCategory}
      />
      <Separator
        orientation="vertical"
        className="!h-4 bg-gray-500 hidden lg:block"
      />
      <div className="flex-1 relative">
        <Input
          ref={inputRef}
          placeholder="Search Your Course..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (searchQuery.trim() && filteredCourses.length > 0) {
              setIsOpen(true);
            }
          }}
          isFocusLess
          aria-label="Search courses"
          className="dark:bg-transparent"
        />
        {isOpen && filteredCourses.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto"
          >
            {filteredCourses.map((course, index) => (
              <button
                key={course.id}
                type="button"
                onClick={() => handleCourseSelect(course)}
                className={cn(
                  "w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                  focusedIndex === index && "bg-gray-100 dark:bg-gray-700"
                )}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                <div className="font-medium text-sm text-gray-900 dark:text-gray-100">
                  {course.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {course.category} • {course.duration} • {course.level}
                </div>
              </button>
            ))}
            {filteredCourses.length >= 8 && (
              <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                Showing top results. Click search for more.
              </div>
            )}
          </div>
        )}
      </div>
      <Button
        variant="default"
        className="rounded-full"
        aria-label="Search"
        onClick={handleSearch}
      >
        <AppIcon name="search" className="size-4" />
        Search
      </Button>
    </div>
  );
};

CourseSearchBar.displayName = "CourseSearchBar";


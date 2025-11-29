"use client";

import { useState, useMemo, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Plus,
  ChevronDown,
  X,
  BookOpen,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import useAppConfigStore from "@/store/appConfigStore";
import { Separator } from "@/components/ui/separator";
import { CourseCards } from "@/components/helper/CourseCards";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { DashboardHeaders } from "../dashboardHelpers/DashboardHeaders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Memoized category item component to prevent unnecessary re-renders
interface CategoryItemProps {
  category: string;
  isChecked: boolean;
  onToggle: (category: string) => void;
}

const CategoryItem = memo(
  ({ category, isChecked, onToggle }: CategoryItemProps) => {
    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        onToggle(category);
      },
      [category, onToggle]
    );

    return (
      <div
        className="flex items-center gap-2 px-2 py-2 rounded-sm hover:bg-accent cursor-pointer"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle(category);
          }
        }}
        role="checkbox"
        tabIndex={0}
        aria-checked={isChecked}
      >
        <Checkbox
          checked={isChecked}
          readOnly
          className="w-4 h-4 pointer-events-none"
        />
        <span className="text-sm">{category}</span>
      </div>
    );
  }
);

CategoryItem.displayName = "CategoryItem";

// Memoized "All" option component
interface AllOptionProps {
  isChecked: boolean;
  onSelect: () => void;
}

const AllOption = memo(({ isChecked, onSelect }: AllOptionProps) => {
  return (
    <div
      className="flex items-center gap-2 px-2 py-2 rounded-sm hover:bg-accent cursor-pointer font-medium"
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      role="checkbox"
      tabIndex={0}
      aria-checked={isChecked}
    >
      <Checkbox
        checked={isChecked}
        readOnly
        className="w-4 h-4 pointer-events-none"
      />
      <span className="text-sm">All</span>
    </div>
  );
});

AllOption.displayName = "AllOption";

export default function CoursesPage() {
  const router = useRouter();
  const { courses: coursesData } = useAppConfigStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const courses = Object.values(coursesData || {});

  // Extract unique categories from courses - memoized
  const categories = useMemo(() => {
    if (!courses || !Array.isArray(courses) || courses.length === 0) return [];
    return Array.from(
      new Set(courses.map((course) => course.category))
    ).sort() as string[];
  }, [courses]);

  // Filter selectedCategories to only include valid categories
  const validSelectedCategories = useMemo(() => {
    return selectedCategories.filter((cat) => categories.includes(cat));
  }, [selectedCategories, categories]);

  // Memoized handlers to prevent unnecessary re-renders
  const handleCategoryToggle = useCallback((category: string) => {
    setSelectedCategories((prev) => {
      return prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category];
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  const filteredCourses = useMemo(() => {
    if (!courses || !Array.isArray(courses)) return [];

    return courses.filter((course) => {
      // Category filter
      const categoryMatch =
        validSelectedCategories.length === 0 ||
        validSelectedCategories.includes(course.category);

      if (!categoryMatch) return false;

      // Search filter
      if (!searchQuery) return true;

      const query = searchQuery.toLowerCase();
      return (
        course.name.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.searchKeys.some((key) => key.toLowerCase().includes(query))
      );
    });
  }, [courses, searchQuery, validSelectedCategories]);

  // Memoized display text for dropdown button
  const dropdownButtonText = useMemo(() => {
    if (validSelectedCategories.length === 0) return "All";
    if (validSelectedCategories.length === 1) return validSelectedCategories[0];
    return `${validSelectedCategories.length} selected`;
  }, [validSelectedCategories]);

  const isAllSelected = validSelectedCategories.length === 0;

  // Calculate dynamic statistics
  const stats = useMemo(() => {
    if (!courses || !Array.isArray(courses)) {
      return {
        totalCourses: 0,
        activeCourses: 0,
        inactiveCourses: 0,
        newCoursesThisMonth: 0,
      };
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const totalCourses = courses.length;
    const activeCourses = courses.filter((course) => course.isEnabled).length;
    const inactiveCourses = courses.filter(
      (course) => !course.isEnabled
    ).length;

    const newCoursesThisMonth = courses.filter((course) => {
      if (!course.createdTimeStamp) return false;
      const createdDate = new Date(course.createdTimeStamp);
      return createdDate >= startOfMonth;
    }).length;

    return {
      totalCourses,
      activeCourses,
      inactiveCourses,
      newCoursesThisMonth,
    };
  }, [courses]);

  const handleAddCourse = () => {
    router.push("/dashboard/courses/create");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <DashboardHeaders
          title="Course Management"
          description="Manage and organize your course catalog"
        />
        <Button onClick={handleAddCourse} variant="outline">
          <Plus className="mr-2 h-5 w-5" />
          Add New Course
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              {stats.newCoursesThisMonth > 0
                ? `+${stats.newCoursesThisMonth} new course${
                    stats.newCoursesThisMonth > 1 ? "s" : ""
                  } this month`
                : "No new courses this month"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Courses
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCourses}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalCourses > 0
                ? `${Math.round(
                    (stats.activeCourses / stats.totalCourses) * 100
                  )}% of total courses`
                : "No courses available"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Inactive Courses
            </CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inactiveCourses}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalCourses > 0
                ? `${Math.round(
                    (stats.inactiveCourses / stats.totalCourses) * 100
                  )}% of total courses`
                : "No courses available"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 px-7">
        {/* Results Count - Left */}
        <div className="text-gray-700 dark:text-gray-300 font-medium">
          Showing 1-{filteredCourses?.length || 0} of{" "}
          {Array.isArray(courses) ? courses.length : 0} results
        </div>

        {/* Filters - Right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          {/* Category Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "flex items-center justify-between gap-2 w-full sm:w-[200px] rounded-full h-auto p-3",
                  "border border-input !bg-background text-sm",
                  "hover:bg-accent hover:text-accent-foreground",
                  "dark:bg-input/30 dark:hover:bg-input/50",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "transition-colors"
                )}
              >
                <span className={cn(isAllSelected && "text-muted-foreground")}>
                  {dropdownButtonText}
                </span>
                <ChevronDown className="w-4 h-4 opacity-50" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-2" align="start">
              <div className="max-h-[300px] overflow-y-auto">
                <AllOption
                  isChecked={isAllSelected}
                  onSelect={handleSelectAll}
                />
                <Separator className="my-1" />
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <CategoryItem
                      key={category}
                      category={category}
                      isChecked={validSelectedCategories.includes(category)}
                      onToggle={handleCategoryToggle}
                    />
                  ))
                ) : (
                  <div className="p-2">
                    <p className="text-sm text-muted-foreground">
                      No categories available
                    </p>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* Search Bar */}
          <Input
            type="text"
            placeholder="Search your courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-full p-3! h-auto w-full sm:w-auto sm:min-w-[250px] !bg-background"
          />
        </div>
      </Card>
      {/* Selected Categories Chips - Only show valid categories */}
      {validSelectedCategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {validSelectedCategories.map((category) => (
            <div
              key={category}
              className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-1.5 rounded-full text-sm font-medium"
            >
              <span>{category}</span>
              <button
                type="button"
                onClick={() =>
                  setSelectedCategories(
                    selectedCategories.filter((cat) => cat !== category)
                  )
                }
                className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${category}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      <CourseCards courses={filteredCourses} isFromDashboard={true} />
    </div>
  );
}

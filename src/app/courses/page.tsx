"use client";

import { CourseCards } from "@/components/helper/CourseCards";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { courses } from "@/constant/staticCourse";
import { useEffect, useState, useMemo, useRef, useCallback, memo } from "react";
import { cn } from "@/lib/utils";
import { AppIcon } from "@/components/ui/Icon";
import { useSearchParams, useRouter } from "next/navigation";

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

export default function Courses() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Filter only enabled courses
  const enabledCourses = useMemo(() => courses.filter(course => course.isEnabled), []);
  
  const [courseData, setCourseData] = useState(enabledCourses);
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize selectedCategories from URL params or default to empty (show all)
  // Filter out invalid categories that don't exist in the available categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const categoriesParam = searchParams.get("categories");
    if (categoriesParam) {
      const allCategories = Array.from(
        new Set(enabledCourses.map((course) => course.category))
      );
      const categoriesFromURL = categoriesParam.split(",").filter(Boolean);
      // Filter to only include valid categories
      return categoriesFromURL.filter((cat) => allCategories.includes(cat));
    }
    return [];
  });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const isUpdatingFromUserActionRef = useRef(false);
  const isInitialMountRef = useRef(true);
  const lastSyncedCategoriesRef = useRef<string[]>([]);

  // Extract unique categories from enabled courses - memoized
  const categories = useMemo(() => {
    return Array.from(new Set(enabledCourses.map((course) => course.category))).sort();
  }, [enabledCourses]);

  // Filter selectedCategories to only include valid categories
  const validSelectedCategories = useMemo(() => {
    return selectedCategories.filter((cat) => categories.includes(cat));
  }, [selectedCategories, categories]);

  // Memoized handlers to prevent unnecessary re-renders
  const handleCategoryToggle = useCallback((category: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category];
      isUpdatingFromUserActionRef.current = true;
      return newCategories;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    isUpdatingFromUserActionRef.current = true;
    setSelectedCategories([]);
  }, []);

  const handleRemoveCategory = useCallback((category: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.filter((cat) => cat !== category);
      isUpdatingFromUserActionRef.current = true;
      return newCategories;
    });
  }, []);

  // Update URL params when selectedCategories changes from user action
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      lastSyncedCategoriesRef.current = validSelectedCategories;
      return;
    }

    // Only update URL if change came from user action
    if (!isUpdatingFromUserActionRef.current) {
      return;
    }

    isUpdatingFromUserActionRef.current = false;

    // Only set categories param, don't preserve other params
    const params = new URLSearchParams();
    if (validSelectedCategories.length > 0) {
      params.set("categories", validSelectedCategories.join(","));
    }

    lastSyncedCategoriesRef.current = validSelectedCategories;
    router.push(`?${params.toString()}`, { scroll: false });
  }, [validSelectedCategories, router]);

  // Sync selectedCategories with URL params when they change externally
  useEffect(() => {
    const categoriesParam = searchParams.get("categories");
    const categoriesFromURL = categoriesParam
      ? categoriesParam.split(",").filter(Boolean)
      : [];

    // Filter to only include valid categories (skip invalid ones)
    const validCategoriesFromURL = categoriesFromURL.filter((cat) =>
      categories.includes(cat)
    );

    const lastSyncedString = [...lastSyncedCategoriesRef.current]
      .sort()
      .join(",");
    const urlCategoriesString = [...validCategoriesFromURL].sort().join(",");

    if (
      lastSyncedString !== urlCategoriesString &&
      !isUpdatingFromUserActionRef.current
    ) {
      lastSyncedCategoriesRef.current = validCategoriesFromURL;
      setSelectedCategories(validCategoriesFromURL);
    }
  }, [searchParams, categories]);

  // Memoized filtered courses to prevent unnecessary recalculations
  const filteredCourses = useMemo(() => {
    return enabledCourses.filter((course) => {
      const categoryMatch =
        validSelectedCategories.length === 0 ||
        validSelectedCategories.includes(course.category);

      if (!categoryMatch) return false;

      if (!searchQuery) return true;

      const query = searchQuery.toLowerCase();
      const nameMatch = course.name.toLowerCase().includes(query);
      const searchKeysMatch = course.searchKeys.some((key) =>
        key.toLowerCase().includes(query)
      );

      return nameMatch || searchKeysMatch;
    });
  }, [validSelectedCategories, searchQuery, enabledCourses]);

  // Update courseData only when filteredCourses changes
  useEffect(() => {
    setCourseData(filteredCourses);
  }, [filteredCourses]);

  // Memoized display text for dropdown button
  const dropdownButtonText = useMemo(() => {
    if (validSelectedCategories.length === 0) return "All";
    if (validSelectedCategories.length === 1) return validSelectedCategories[0];
    return `${validSelectedCategories.length} selected`;
  }, [validSelectedCategories]);

  const isAllSelected = validSelectedCategories.length === 0;

  return (
    <>
      <Container>
        <div className="flex flex-col gap-4 mb-6">
          {/* Top Bar: Results Count on Left, Filters on Right */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            data-aos="fade"
          >
            {/* Results Count - Left */}
            <div className="text-gray-700 dark:text-gray-300 font-medium">
              Showing 1-{courseData.length} of {courses.length} results
            </div>

            {/* Filters - Right */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              {/* Category Filter */}
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "flex items-center justify-between gap-2 w-full sm:w-[200px] rounded-full h-auto p-3",
                      "border border-input bg-transparent text-sm",
                      "hover:bg-accent hover:text-accent-foreground",
                      "dark:bg-input/30 dark:hover:bg-input/50",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      "transition-colors"
                    )}
                  >
                    <span
                      className={cn(isAllSelected && "text-muted-foreground")}
                    >
                      {dropdownButtonText}
                    </span>
                    <AppIcon
                      name="chevron-down"
                      className="w-4 h-4 opacity-50"
                    />
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
                className="rounded-full p-3! h-auto w-full sm:w-auto sm:min-w-[250px]"
              />
            </div>
          </div>

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
                    onClick={() => handleRemoveCategory(category)}
                    className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
                    aria-label={`Remove ${category}`}
                  >
                    <AppIcon name="x" className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <CourseCards courses={courseData} />
      </Container>
    </>
  );
}

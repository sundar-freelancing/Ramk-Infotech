"use client";

import { Title4 } from "@/components/helper/Titles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { AlertCircle, X, Plus, ChevronDown } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useForm, Controller, Path } from "react-hook-form";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { DashboardHeaders } from "./DashboardHeaders";
import { CourseInterface, InstructorInterface } from "@/store/interfaces";
import useAppConfigStore from "@/store/appConfigStore";
import { useRouter } from "next/navigation";

// Allowed image domains from next.config.ts
const ALLOWED_IMAGE_DOMAIN = "images.unsplash.com";

interface FormData extends CourseInterface {
  instructor: InstructorInterface;
}

// Validation function to check if image URL matches allowed domains
const validateImageUrl = (url: string): boolean | string => {
  if (!url.trim()) {
    return "Image URL is required";
  }

  try {
    const urlObj = new URL(url);

    // Check protocol
    if (urlObj.protocol !== "https:") {
      return "Image URL must use HTTPS protocol";
    }

    // Check if hostname matches allowed domains
    const isAllowed = ALLOWED_IMAGE_DOMAIN === urlObj.hostname;

    if (!isAllowed) {
      return `Image URL must be from the domain: ${ALLOWED_IMAGE_DOMAIN}`;
    }

    return true;
  } catch {
    return "Please enter a valid URL";
  }
};

// Field configuration type
type FieldConfig = {
  name: Path<FormData>;
  label: string;
  type?: "text" | "number" | "url" | "select";
  placeholder?: string;
  required?: boolean;
  span?: "full" | "half";
  validation?: Record<string, unknown>;
  customError?: string | null;
  step?: string;
  selectOptions?: { value: string; label: string }[];
  disabled?: boolean;
  readOnly?: boolean;
};

// Reusable Form Field Component
interface FormFieldProps extends FieldConfig {
  register: ReturnType<typeof useForm<FormData>>["register"];
  errors: ReturnType<typeof useForm<FormData>>["formState"]["errors"];
  control?: ReturnType<typeof useForm<FormData>>["control"];
  setValue?: ReturnType<typeof useForm<FormData>>["setValue"];
}

const FormField = ({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  span = "half",
  register,
  errors,
  validation,
  customError,
  step,
  control,
  selectOptions,
  setValue,
  disabled = false,
  readOnly = false,
}: FormFieldProps) => {
  // Helper to safely access nested errors
  const getNestedError = (errors: Record<string, unknown>, path: string) => {
    return path.split(".").reduce((obj: unknown, key: string) => {
      return obj && typeof obj === "object" && key in obj
        ? (obj as Record<string, unknown>)[key]
        : undefined;
    }, errors);
  };
  const error =
    typeof name === "string" && name.includes(".")
      ? getNestedError(errors, name)
      : errors[name as keyof typeof errors];
  const errorMessage =
    (error && typeof error === "object" && "message" in error
      ? (error as { message?: string }).message
      : undefined) || customError;

  if (type === "select" && selectOptions && control) {
    return (
      <div
        className={cn(
          "gap-2 flex flex-col",
          span === "full" && "md:col-span-2 lg:col-span-3"
        )}
      >
        <Label htmlFor={name} className="text-sm font-medium">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        <Controller
          name={name}
          control={control}
          rules={validation}
          render={({ field }) => {
            const selectedOption = selectOptions.find(
              (opt) => opt.value === String(field.value || "")
            );
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-10 w-full justify-between font-normal",
                      !field.value && "text-muted-foreground",
                      error ? "border-destructive" : ""
                    )}
                  >
                    {selectedOption
                      ? selectedOption.label
                      : placeholder || `Select ${label}`}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full" align="start">
                  {selectOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => field.onChange(option.value)}
                      className={cn(
                        field.value === option.value && "bg-accent"
                      )}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }}
        />
        {errorMessage && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errorMessage}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "gap-2 flex flex-col",
        span === "full" && "md:col-span-2 lg:col-span-3"
      )}
    >
      <Label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        id={name}
        type={type}
        step={step}
        max={name === "rating" ? 5 : undefined}
        disabled={disabled}
        readOnly={readOnly}
        {...register(name, {
          ...validation,
          onChange: (e) => {
            if (name === "rating" && setValue) {
              const value = parseFloat(e.target.value);
              if (!isNaN(value)) {
                if (value > 5) {
                  e.target.value = "5";
                  setValue(name as keyof FormData, 5);
                } else if (value < 0) {
                  e.target.value = "0";
                  setValue(name as keyof FormData, 0);
                }
              }
            }
          },
        })}
        className={cn("h-11", error || customError ? "border-destructive" : "")}
        placeholder={placeholder}
      />
      {errorMessage && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {errorMessage}
        </p>
      )}
    </div>
  );
};

interface DashboardViewProps {
  course?: CourseInterface;
}

const DashboardView = ({ course }: DashboardViewProps = {}) => {
  const [searchKeyInput, setSearchKeyInput] = useState("");
  const router = useRouter();
  const isEditMode = !!course;
  const {
    register,
    watch,
    control,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: course?.name || "",
      category: course?.category || "",
      image: course?.image || "",
      lessons: course?.lessons,
      rating: course?.rating,
      reviews: course?.reviews,
      price: course?.price,
      students: course?.students,
      duration: course?.duration || "",
      level: course?.level || "Beginner",
      trainerKey: course?.trainerKey || "",
      instructor: {
        name: course?.instructor?.name || "",
        avatar: course?.instructor?.avatar || "",
        fullImage: course?.instructor?.fullImage || "",
      },
      searchKeys: course?.searchKeys || [],
      isEnabled: course?.isEnabled ?? true,
    },
  });

  // Reset form when course changes (for edit mode)
  useEffect(() => {
    if (course) {
      reset({
        name: course.name || "",
        category: course.category || "",
        image: course.image || "",
        lessons: course.lessons,
        rating: course.rating,
        reviews: course.reviews,
        price: course.price,
        students: course.students,
        duration: course.duration || "",
        level: course.level || "Beginner",
        trainerKey: course.trainerKey || "",
        instructor: {
          name: course.instructor?.name || "",
          avatar: course.instructor?.avatar || "",
          fullImage: course.instructor?.fullImage || "",
        },
        searchKeys: course.searchKeys || [],
        isEnabled: course.isEnabled ?? true,
      });
    }
  }, [course, reset]);

  const imageUrl = watch("image");
  const name = watch("name");
  const category = watch("category");
  const students = watch("students") ?? 0;
  const reviews = watch("reviews") ?? 0;
  const price = watch("price") ?? 0;
  const lessons = watch("lessons") ?? 0;
  const rating = watch("rating") ?? 0;

  // Ensure all values are valid numbers for display
  const displayStudents = Number.isNaN(students) ? 0 : students;
  const displayReviews = Number.isNaN(reviews) ? 0 : reviews;
  const displayPrice = Number.isNaN(price) ? 0 : price;
  const displayLessons = Number.isNaN(lessons) ? 0 : lessons;
  const displayRating = Number.isNaN(rating) ? 0 : rating;
  const instructorAvatar = watch("instructor")?.avatar || "";
  const searchKeys = watch("searchKeys") || [];
  const isEnabled = watch("isEnabled");
  
  // Watch all form fields to make isUpdated reactive
  const watchedFormValues = watch();

  // Validate instructor avatar URL
  const instructorAvatarValidation = validateImageUrl(instructorAvatar || "");
  const isInstructorAvatarValid = instructorAvatarValidation === true;

  // Validate image URL using React Hook Form validation
  const imageValidation = imageUrl ? validateImageUrl(imageUrl) : null;
  const imageError =
    typeof imageValidation === "string" ? imageValidation : null;
  const isImageValid = imageValidation === true;

  const addSearchKey = () => {
    if (searchKeyInput.trim() && !searchKeys.includes(searchKeyInput.trim())) {
      const newSearchKeys = [...searchKeys, searchKeyInput.trim()];
      setValue("searchKeys", newSearchKeys);
      setSearchKeyInput("");
      // Clear error if we now have at least one key
      if (newSearchKeys.length > 0) {
        clearErrors("searchKeys");
      }
    }
  };

  const removeSearchKey = (key: string) => {
    const newSearchKeys = searchKeys.filter((k) => k !== key);
    setValue("searchKeys", newSearchKeys);
    // Set error if no keys remain
    if (newSearchKeys.length === 0) {
      setError("searchKeys", {
        type: "manual",
        message: "At least one search key is required",
      });
    } else {
      clearErrors("searchKeys");
    }
  };

  // Field configurations for Course Details
  const courseDetailsFields = [
    {
      name: "name" as Path<FormData>,
      label: "Course Name",
      type: "text" as const,
      placeholder: "Enter course name",
      required: true,
      span: "full" as const,
    },
    {
      name: "category" as Path<FormData>,
      label: "Category",
      type: "text" as const,
      placeholder: "e.g., Web Development",
      required: true,
      validation: { required: "Category is required" },
    },
    {
      name: "image" as Path<FormData>,
      label: "Image URL",
      type: "url" as const,
      placeholder: "https://images.unsplash.com/...",
      required: true,
      validation: {
        validate: (value: string) => {
          const validation = validateImageUrl(value);
          if (validation === true) return true;
          return validation;
        },
      },
      customError: imageError,
    },
    {
      name: "lessons" as Path<FormData>,
      label: "Lessons",
      type: "number" as const,
      placeholder: "0",
      required: true,
      validation: {
        required: "Lessons is required",
        min: { value: 0, message: "Lessons must be 0 or greater" },
        valueAsNumber: true,
      },
    },
    {
      name: "rating" as Path<FormData>,
      label: "Rating",
      type: "number" as const,
      placeholder: "0.0",
      required: true,
      step: "0.1",
      validation: {
        required: "Rating is required",
        min: { value: 0, message: "Rating must be 0 or greater" },
        max: { value: 5, message: "Rating must be 5 or less" },
        valueAsNumber: true,
      },
    },
    {
      name: "reviews" as Path<FormData>,
      label: "Reviews",
      type: "number" as const,
      placeholder: "0",
      required: true,
      validation: {
        required: "Reviews is required",
        min: { value: 0, message: "Reviews must be 0 or greater" },
        valueAsNumber: true,
      },
    },
    {
      name: "price" as Path<FormData>,
      label: "Price",
      type: "number" as const,
      placeholder: "0",
      required: true,
      validation: {
        required: "Price is required",
        min: { value: 0, message: "Price must be 0 or greater" },
        valueAsNumber: true,
      },
    },
    {
      name: "students" as Path<FormData>,
      label: "Students",
      type: "number" as const,
      placeholder: "0",
      required: true,
      validation: {
        required: "Students is required",
        min: { value: 0, message: "Students must be 0 or greater" },
        valueAsNumber: true,
      },
    },
    {
      name: "duration" as Path<FormData>,
      label: "Duration",
      type: "text" as const,
      placeholder: "e.g., 6 months",
      required: true,
      validation: { required: "Duration is required" },
    },
    {
      name: "level" as Path<FormData>,
      label: "Level",
      type: "select" as const,
      placeholder: "Select level",
      required: true,
      validation: { required: "Level is required" },
      selectOptions: [
        { value: "Beginner", label: "Beginner" },
        { value: "Intermediate", label: "Intermediate" },
        { value: "Advanced", label: "Advanced" },
      ],
    },
    {
      name: "trainerKey" as Path<FormData>,
      label: "Trainer Key",
      type: "text" as const,
      placeholder: "Optional trainer key",
      required: false,
    },
  ];

  // Field configurations for Instructor Information
  const instructorFields: FieldConfig[] = [
    {
      name: "instructor.name" as Path<FormData>,
      label: "Instructor Name",
      type: "text" as const,
      placeholder: "Enter instructor name",
      required: true,
      //   span: "full" as const,
      validation: { required: "Instructor name is required" },
    },
    {
      name: "instructor.avatar" as Path<FormData>,
      label: "Instructor Avatar URL",
      type: "url" as const,
      placeholder: "https://images.unsplash.com/...",
      required: true,
      validation: {
        validate: (value: string) => {
          const validation = validateImageUrl(value);
          if (validation === true) return true;
          return validation;
        },
      },
      customError:
        typeof instructorAvatarValidation === "string"
          ? instructorAvatarValidation
          : null,
    },
    // {
    //   name: "instructorFullImage" as keyof FormData,
    //   label: "Instructor Full Image URL",
    //   type: "url" as const,
    //   placeholder: "https://images.unsplash.com/...",
    //   required: false,
    // },
  ];

  const { addCourse, updateCourse } = useAppConfigStore();
  const onSubmit = async (data: FormData) => {
    // Validate search keys
    if (!data.searchKeys || data.searchKeys.length === 0) {
      setError("searchKeys", {
        type: "manual",
        message: "At least one search key is required",
      });
      return;
    }

    // Build instructor object, only including fullImage if it has a value
    const instructor: InstructorInterface = {
      name: data.instructor?.name || "",
      avatar: data.instructor?.avatar || "",
    };
    if (data.instructor?.fullImage) {
      instructor.fullImage = data.instructor.fullImage;
    }

    const courseData = {
      ...data,
      id: course?.id || "", // Preserve ID in edit mode
      instructor: instructor,
      searchKeys: data.searchKeys || [],
      isEnabled: data.isEnabled ?? true,
    } as CourseInterface;

    if (isEditMode) {
      await updateCourse(courseData);
    } else {
      await addCourse(courseData);
    }
    router.push("/dashboard/courses");
  };

  const handleCreate = () => {
    handleSubmit(onSubmit)();
  };

  // Check if course has been updated by comparing original course with current form values
  const isUpdated = (() => {
    if (!course || !isEditMode) return false;
    
    // Use watched values to make it reactive to form changes
    const formValues = watchedFormValues;
    
    // Build instructor object from form values (matching onSubmit logic)
    const instructor: InstructorInterface = {
      name: formValues.instructor?.name || "",
      avatar: formValues.instructor?.avatar || "",
    };
    if (formValues.instructor?.fullImage) {
      instructor.fullImage = formValues.instructor.fullImage;
    }
    
    // Build current course data from form (excluding timestamps for comparison)
    const currentCourseData = {
      id: course.id,
      name: formValues.name || "",
      category: formValues.category || "",
      image: formValues.image || "",
      instructor: instructor,
      lessons: formValues.lessons ?? 0,
      rating: formValues.rating ?? 0,
      reviews: formValues.reviews ?? 0,
      price: formValues.price ?? 0,
      students: formValues.students ?? 0,
      duration: formValues.duration || "",
      level: formValues.level || "Beginner",
      searchKeys: formValues.searchKeys || [],
      isEnabled: formValues.isEnabled ?? true,
      trainerKey: formValues.trainerKey || "",
    };
    
    // Build original course data (excluding timestamps for comparison)
    const originalCourseData = {
      id: course.id,
      name: course.name || "",
      category: course.category || "",
      image: course.image || "",
      instructor: {
        name: course.instructor?.name || "",
        avatar: course.instructor?.avatar || "",
        ...(course.instructor?.fullImage && { fullImage: course.instructor.fullImage }),
      },
      lessons: course.lessons ?? 0,
      rating: course.rating ?? 0,
      reviews: course.reviews ?? 0,
      price: course.price ?? 0,
      students: course.students ?? 0,
      duration: course.duration || "",
      level: course.level || "Beginner",
      searchKeys: course.searchKeys || [],
      isEnabled: course.isEnabled ?? true,
      trainerKey: course.trainerKey || "",
    };
    
    return JSON.stringify(originalCourseData) !== JSON.stringify(currentCourseData);
  })();

  return (
    <div className="space-y-6">
      <div className="flex justify-between gap-10">
        <DashboardHeaders
          title={isEditMode ? "Edit Course" : "Create Course"}
          description={
            <>
              <div className="flex items-center gap-3">
                <Label htmlFor="course-status" className="text-sm font-medium">
                  Manage Course Status
                </Label>
                <Switch
                  variant={isEnabled ? "success" : undefined}
                  id="course-status"
                  checked={isEnabled}
                  onCheckedChange={(checked) => setValue("isEnabled", checked)}
                />
              </div>
            </>
          }
        />
        <div className="flex items-center gap-4">
          <Button
            variant={Object.keys(errors).length > 0 ? "destructive" : "default"}
            onClick={handleCreate}
            disabled={isEditMode && !isUpdated}
          >
            {isEditMode ? "Update Course" : "Create Course"}
          </Button>
        </div>
      </div>
      {/* Course Banner Preview */}
      <div className="w-full">
        <div className="relative w-full h-96 rounded-lg border-2 border-border overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
          <Badge
            variant={isEnabled ? "success" : "destructive"}
            className="absolute top-4 left-4 text-white"
          >
            {isEnabled ? "Active" : "Inactive"}
          </Badge>
          {imageUrl && isImageValid ? (
            <Image
              src={imageUrl}
              alt={name || "Course banner"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center p-6">
                <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-medium mb-1">
                  Course Banner Preview
                </p>
                <p className="text-sm text-muted-foreground">
                  {imageError || "Enter a valid image URL to see preview"}
                </p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Badge
                variant="secondary"
                className="bg-white/20 backdrop-blur-sm text-white border-white/30"
              >
                {category || "category"}
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
              {name || "Course Name"}
            </h2>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {displayStudents.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Students</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {displayReviews.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Reviews</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              ${displayPrice.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Price</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {displayLessons}
            </div>
            <div className="text-xs text-muted-foreground">Lessons</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {displayRating.toFixed(1)}
            </div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
        </div>
      </div>

      {/* Form Layout */}
      <div className="w-full">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Side - Course Details */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="space-y-4">
                <Title4 aos={false}>Course Details</Title4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseDetailsFields.map((field) => (
                    <FormField
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      register={register}
                      errors={errors}
                      validation={field.validation}
                      customError={field.name === "image" ? imageError : null}
                      step={field.step}
                      control={control}
                      selectOptions={field.selectOptions}
                      setValue={setValue}
                      disabled={(field as FieldConfig).disabled ?? false}
                      readOnly={(field as FieldConfig).readOnly ?? false}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Side - Two Cards */}
          <div className="space-y-6">
            {/* Instructor Information Card */}
            <Card className="p-6">
              <Title4 aos={false}>Instructor Information</Title4>
              {/* Instructor Avatar - Top Right Corner */}
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white/30 shadow-lg overflow-hidden bg-muted backdrop-blur-sm mx-auto my-4">
                {instructorAvatar && isInstructorAvatarValid ? (
                  <Image
                    src={instructorAvatar}
                    alt="Instructor avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/10">
                    <AlertCircle className="h-8 w-8 md:h-10 md:w-10" />
                  </div>
                )}
              </div>
              <div className="space-y-4">
                {/* Instructor Fields */}
                <div className="space-y-4">
                  {instructorFields.map((field) => (
                    <FormField
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      register={register}
                      errors={errors}
                      validation={field.validation}
                      control={control}
                      setValue={setValue}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Search Keywords Card */}
            <Card className="p-6">
              <Title4 aos={false}>Search Keywords</Title4>
              <div className="space-y-4">
                <div className="gap-2 flex flex-col">
                  <div className="flex gap-2 items-center">
                    <Input
                      value={searchKeyInput}
                      onChange={(e) => setSearchKeyInput(e.target.value)}
                      className="h-11"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSearchKey();
                        }
                      }}
                      placeholder="Enter search keyword"
                    />
                    <Button
                      type="button"
                      onClick={addSearchKey}
                      variant="outline"
                      size="icon"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {errors.searchKeys && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.searchKeys.message}
                    </p>
                  )}
                </div>

                {searchKeys.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {searchKeys.map((key, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 px-3 py-1 bg-secondary rounded-md text-sm"
                      >
                        <span>{key}</span>
                        <button
                          type="button"
                          onClick={() => removeSearchKey(key)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;

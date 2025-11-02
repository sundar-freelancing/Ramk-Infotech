import * as React from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.ComponentProps<"input"> {
  className?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          className={cn(
            "h-5 w-5 rounded-full border-2 border-gray-400 text-purple-600 focus:ring-purple-500 focus:ring-2 cursor-pointer appearance-none checked:bg-purple-600 checked:border-purple-600 transition-all relative peer",
            className
          )}
          {...props}
        />
        <svg
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
          fill="currentColor"
          viewBox="0 0 8 8"
        >
          <circle cx="4" cy="4" r="3" />
        </svg>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };


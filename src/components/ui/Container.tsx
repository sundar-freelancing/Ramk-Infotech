import { cn } from "@/lib/utils";

export const ContainerFluid = ({
  children,
  className,
  suppressHydrationWarning,
}: {
  children: React.ReactNode;
  className?: string;
  suppressHydrationWarning?: boolean;
}) => {
  return (
    <div
      className={cn(
        "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full",
        className
      )}
      suppressHydrationWarning={suppressHydrationWarning}
    >
      {children}
    </div>
  );
};

export const Container = ({
  children,
  className,
  suppressHydrationWarning,
}: {
  children: React.ReactNode;
  className?: string;
  suppressHydrationWarning?: boolean;
}) => {
  return (
    <div
      className={cn("xl:max-w-6xl mx-auto w-[85%]", className)}
      suppressHydrationWarning={suppressHydrationWarning}
    >
      {children}
    </div>
  );
};

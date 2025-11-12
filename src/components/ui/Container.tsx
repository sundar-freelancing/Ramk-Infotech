import { cn } from "@/lib/utils";

export const ContainerFluid = ({
  children,
  className,
  suppressHydrationWarning,
  wrapperClassName,
  id,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  suppressHydrationWarning?: boolean;
  wrapperClassName?: string;
  id?: string;
}) => {
  return (
    <Wrapper
      id={id}
      wrapperClassName={wrapperClassName}
      suppressHydrationWarning={suppressHydrationWarning}
    >
      <div
        className={cn(
          "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </Wrapper>
  );
};

export const Container = ({
  children,
  className,
  suppressHydrationWarning,
  wrapperClassName,
  id,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  suppressHydrationWarning?: boolean;
  wrapperClassName?: string;
  id?: string;
}) => {
  return (
    <Wrapper
      wrapperClassName={wrapperClassName}
      suppressHydrationWarning={suppressHydrationWarning}
      id={id}
    >
      <div className={cn("xl:max-w-6xl mx-auto w-[85%]", className)} {...props}>
        {children}
      </div>
    </Wrapper>
  );
};

export const Wrapper = ({
  children,
  wrapperClassName,
  suppressHydrationWarning,
  id,
  ...props
}: {
  children: React.ReactNode;
  wrapperClassName?: string;
  suppressHydrationWarning?: boolean;
  id?: string;
}) => {
  return (
    <div
      className={cn(
        "overflow-hidden lg:overflow-visible w-full",
        wrapperClassName
      )}
      suppressHydrationWarning={suppressHydrationWarning}
      id={id}
      {...props}
    >
      {children}
    </div>
  );
};

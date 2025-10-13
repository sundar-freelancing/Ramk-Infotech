import { cn } from "@/lib/utils";

export const ContainerFluid = ({
  children,
  className,
  suppressHydrationWarning,
  wrapperClassName,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  suppressHydrationWarning?: boolean;
  wrapperClassName?: string;
}) => {
  return (
    <Wrapper
      wrapperClassName={cn(
        "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full",
        className,
        wrapperClassName
      )}
      suppressHydrationWarning={suppressHydrationWarning}
      {...props}
    >
      {children}
    </Wrapper>
  );
};

export const Container = ({
  children,
  className,
  suppressHydrationWarning,
  wrapperClassName,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  suppressHydrationWarning?: boolean;
  wrapperClassName?: string;
}) => {
  return (
    <Wrapper
      wrapperClassName={cn(
        "xl:max-w-6xl mx-auto w-[85%]",
        className,
        wrapperClassName
      )}
      suppressHydrationWarning={suppressHydrationWarning}
      {...props}
    >
      {children}
    </Wrapper>
  );
};

export const Wrapper = ({
  children,
  wrapperClassName,
  suppressHydrationWarning,
  ...props
}: {
  children: React.ReactNode;
  wrapperClassName?: string;
  suppressHydrationWarning?: boolean;
}) => {
  return (
    <div
      className={cn(" overflow-hidden", wrapperClassName)}
      suppressHydrationWarning={suppressHydrationWarning}
      {...props}
    >
      {children}
    </div>
  );
};

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { AppIcon } from "./Icon";

const focusVisibleVariants =
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

const focusHighlightVariants = "focus-visible:text-blue-500 ";

const primaryBtn =
  "bg-[#543ee8] text-white hover:bg-primary inline-flex items-center space-x-5 px-8 py-1.5 rounded-full font-semibold transition-colors duration-200 group pe-1.5";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        primaryBtn,
        default: `${focusVisibleVariants} bg-primary text-primary-foreground hover:bg-primary/90`,
        yellow: `${focusVisibleVariants} bg-yellow-400 text-black font-semibold hover:text-white hover:bg-primary`,
        highlight: `${focusHighlightVariants} hover:text-blue-500`,
        highlightLink: `${focusHighlightVariants} text-blue-500 hover:text-blue-700`,
        destructive: `${focusVisibleVariants} bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60`,
        outline: `${focusVisibleVariants} border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50`,
        secondary: `${focusVisibleVariants} bg-secondary text-secondary-foreground hover:bg-secondary/80`,
        ghost: `${focusVisibleVariants} hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50`,
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

const BtnArrow = ({ srContent = "Go to next" }: { srContent?: string }) => {
  return (
    <div className="w-10.5 h-10.5 bg-white rounded-full flex items-center justify-center">
      <AppIcon name="arrow-right" size={16} className="w-4 h-4 text-blue-500" />
      <span className="sr-only">{srContent}</span>
    </div>
  );
};

function PrimaryButton({
  className,
  href = "",
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    isLink?: boolean;
    href?: string;
    srContent?: string;
    dataAos?: string;
    dataAosDelay?: string;
  }) {
  const { children, srContent, dataAos, dataAosDelay, ...rest } = props;
  const defaultClass = `cursor-pointer relative z-10 w-fit ${primaryBtn} ${cn(className)}`;
  return href ? (
    <Link
      href={href}
      data-slot="button"
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
      className={defaultClass}
    >
      <span>{children}</span>
      <BtnArrow srContent={srContent} />
    </Link>
  ) : (
    <button
      variant="primaryBtn"
      type="button"
      className={defaultClass}
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
      {...rest}
    >
      <span>{children}</span>
      <BtnArrow srContent={srContent} />
    </button>
  );
}

export { Button, buttonVariants, PrimaryButton };

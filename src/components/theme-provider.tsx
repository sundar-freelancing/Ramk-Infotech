"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SmoothScroll } from "./smooth-scroll";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <SmoothScroll>{children}</SmoothScroll>
    </NextThemesProvider>
  );
}

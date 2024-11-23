"use client";

import { Provider } from "jotai";
import { siteConfig } from "@/config/site.config";
import hideRechartsConsoleError from "@/utils/recharts-console-error";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import React from "react";

hideRechartsConsoleError();

export function ThemeProvider({ children }: React.PropsWithChildren) {
  return (
    <NextThemeProvider
      enableSystem={false}
      defaultTheme={String(siteConfig.mode)}
    >
      {children}
    </NextThemeProvider>
  );
}

export function JotaiProvider({ children }: React.PropsWithChildren) {
  return <Provider>{children}</Provider>;
}

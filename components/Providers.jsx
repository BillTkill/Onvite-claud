"use client";

import { SessionProvider } from "next-auth/react";
import { I18nProvider } from "./I18nProvider";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <I18nProvider>{children}</I18nProvider>
    </SessionProvider>
  );
}

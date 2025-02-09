import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { Root } from "@/components/Root/Root";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "normalize.css/normalize.css";
import "./_assets/globals.css";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "FllOWRIS",
};

export function generateViewport() {
  return "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
}

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ru">
      <body>
        <StoreProvider>
          <Root>{children}</Root>
        </StoreProvider>
      </body>
    </html>
  );
}

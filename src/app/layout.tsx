import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { ReactNode } from "react";
import cn from "classnames";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nebula Quiz",
  description: "Test task for quiz builder",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-primary-gradient",
          "min-h-screen",
          montserrat.variable,
        )}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}

import { type Metadata } from "next";
import { type JSX, type ReactNode } from "react";
import { NavigationProgressBar } from "~/components/navigation-progress-bar";
import { baseFont } from "~/helpers/fonts";
import "../variables.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

function Layout({ children }: { readonly children: ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body className={baseFont.className}>
        {children}

        <NavigationProgressBar />
      </body>
    </html>
  );
}

export default Layout;

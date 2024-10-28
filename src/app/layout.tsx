import type { Metadata } from "next";
import "./globals.css";
import BackToTopButton from "./components/BackToTopButton";


export const metadata: Metadata = {
  title: "Travel App",
  description: "Application assistant de voyage",
};
interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * The `RootLayout` function is a React component that serves as the layout for a
 * travel planner application in French.
 * @param {RootLayoutProps}  - The `RootLayout` function is a React component that
 * serves as the root layout for your application. It takes a prop object
 * `RootLayoutProps` as its parameter, which presumably includes a `children`
 * property representing the child components that will be rendered within this
 * layout.
 * @returns The `RootLayout` function is being returned. It is a React component
 * that represents the root layout of a web page. The layout includes an HTML
 * structure with a `<head>` section containing a title and a meta description, and
 * a `<body>` section where the `children` components are rendered.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <head>
        <title className="text-3xl font-bold text-blue-600 animate-pulse">
          Currency Assistant
        </title>
        <meta
          name="description"
          content="Application de planification de voyage"
        />
      </head>
      <body>
        {children}
        <BackToTopButton />
      </body>
    </html>
  );
}

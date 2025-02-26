import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from "../../components/BootstrapClient";
import HeadingBredcrum from "../../components/HeadingBredcrum";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}

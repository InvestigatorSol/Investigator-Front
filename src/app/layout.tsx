import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Investigator",
  description: "Your solana tokens investigation tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        {/* <SidebarProvider> 
        <AppSidebar />*/}
        <main className="w-full">
          {/*<SidebarTrigger />*/}
          {children}
        </main>
        <Toaster richColors={true} />
        {/* </SidebarProvider> */}
      </body>
    </html>


  );
}

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "Auth",
  description: "Next 14 Social Media App",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      <Toaster  richColors/>
        <body
          className={`${inter.className} bg-purple-2 flex justify-center items-center min-h-screen w-full
            `}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToasterContext from "@/components/ToasterContext/ToasterContext";
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth";
import { getCurrentUser } from "@/lib/actions/user.actions";
import UserSetter from "@/components/UserSetter";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Chat app",
  description: "Talk and talk with your friends",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session:any = await auth();
  const user = await getCurrentUser(session?.user.email);
  

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <SessionProvider session={session}>
        <ToasterContext />
          {/* {user && <UserSetter currUser={user.data}  />} */}
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}

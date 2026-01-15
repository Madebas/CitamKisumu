import type { Metadata } from "next";
import "./globals.css";
import {Poppins} from "next/font/google";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";

const font = Poppins({
  weight:["100","200","300","400","500","600","700","800","900"],
  subsets:["latin"],
})


export const metadata: Metadata = {
  title: "CITAM CHURCH KSM",
  description: "CITAM CHURCH KSM Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}>
          <ResponsiveNav/>
        {children}
      </body>
    </html>
  );
}

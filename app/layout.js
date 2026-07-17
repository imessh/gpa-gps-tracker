import { Lora, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const display = Lora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});


export const metadata = {
  title: "Transcript — GPA & Interest Ledger",
  description:
    "Log your modules, calculate your GPA, and record your GPS/IoT interests.",
};


export default function RootLayout({ children }) {

  const year = new Date().getFullYear();


  return (

    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >

      <body className="font-body min-h-screen flex flex-col">


        <Navbar />


        <main className="flex-1 relative z-10">

          {children}

        </main>



        <footer className="border-t mt-16">
          <div className="container py-6 flex items-center justify-between small">
            <span>Student Tracker — built with Next.js & Firebase</span>
            <span>Student project, {year}</span>
          </div>
        </footer>


      </body>


    </html>

  );

}
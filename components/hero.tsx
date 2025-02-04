'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

interface ScanPageProps {
  websiteId: string;
  userId: string;
}

const Hero: React.FC<ScanPageProps> = ({ websiteId, userId }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `http://localhost:3000/scan.js?websiteId=1&userId=cm6bcgch50000lvb0l84o4jyk`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [websiteId, userId]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-b from-blue-100 to-blue-50 antialiased relative overflow-y-auto">
      <section className="header">
      <header className="w-[85%] max-w-5xl mx-auto py-4 bg-[#2d2d2d] bg-opacity-50 rounded-xl shadow-lg absolute top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          Scrivo
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="#features" className="text-neutral-300 hover:text-white">
            Problem
          </Link>
          <Link href="#features" className="text-neutral-300 hover:text-white">
            Solution
          </Link>
          <Link href="#blog" className="text-neutral-300 hover:text-white">
            Use Cases
          </Link>
          <Link href="#pricing" className="text-neutral-300 hover:text-white">
            How it works
          </Link>
        </nav>

        {/* Boutons */}
        <div className="flex items-center space-x-4">
          <button className="text-neutral-300 hover:text-white">
            Login
          </button>
          <Link href="#signin">
            <Button variant="default" className="px-6 rounded-xl hover:text-neutral-300">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
      </section>
      <section className="hero">
      <div
        className="absolute pointer-events-none inset-0 flex items-center justify-center bg-dot-black/[0.2] dark:bg-dot-white/[0.2]"
        style={{
          WebkitMaskImage: `
            radial-gradient(ellipse at center, transparent 20%, white),
            linear-gradient(to bottom, white 80%, transparent 100%)
          `,
          maskImage: `
            radial-gradient(ellipse at center, transparent 20%, white),
            linear-gradient(to bottom, white 80%, transparent 100%)
          `,
          WebkitMaskComposite: "destination-in",
          maskComposite: "intersect",
        }}
      ></div>

      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-40">
        {/* Titre avec animation d'apparition */}
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 bg-opacity-50 text-fade-in">
          AI-powered <br /> data extraction
        </h1>

        {/* Description sous forme de paragraphe */}
        <p
          className="mt-4 font-normal text-base text-neutral-700 max-w-lg text-center mx-auto text-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          Spotlight effect is a great way to draw attention to a specific part
          of the page. Here, we are drawing the attention towards the text
          section of the page. I don&apos;t know why but I&apos;m running out of
          copy.
        </p>

        {/* Bouton Shadcn UI */}
        <div className="flex justify-center mt-6">
          
            <Button
              variant="outline"
              size="lg"
              className="p-4 text-gray-900 hover:bg-gray-200 transition rounded-xl border border-gray-300"
            >
              Get started for free
            </Button>
        
        </div>
      </div>
      </section>
      <section>
        
      </section>
    </div>
  );
};

export default Hero;

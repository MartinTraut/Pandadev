"use client";

import Image from "next/image";
import { Home, Layers, Zap, FolderOpen, Cpu, Phone } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

const navItems = [
  { name: "Home", url: "#", icon: Home },
  { name: "Services", url: "#services", icon: Layers },
  { name: "Automation", url: "#automation", icon: Zap },
  { name: "Projekte", url: "#projekte", icon: FolderOpen },
  { name: "Technologie", url: "#tech", icon: Cpu },
  { name: "Kontakt", url: "#kontakt", icon: Phone },
];

export default function Navigation() {
  return (
    <>
      {/* Logo - fixed top left */}
      <div className="fixed top-5 left-6 z-50">
        <a href="#" className="flex items-center">
          <Image
            src="/logo.png"
            alt="PANDADEV"
            width={140}
            height={32}
            className="h-7 w-auto"
            priority
          />
        </a>
      </div>

      {/* Tubelight NavBar */}
      <NavBar items={navItems} />
    </>
  );
}

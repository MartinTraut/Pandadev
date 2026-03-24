"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  FolderOpen,
  Users,
  Zap,
  Star,
  HelpCircle,
  BookOpen,
  Phone,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/*
  Nav items in EXACT page order.
  desktopPill = shown in the desktop glassmorphism bar
  mobileBar   = shown in the mobile bottom bar (max 5)
*/
const allItems = [
  { label: "Leistungen",  href: "#leistungen",  icon: Layers,     desktopPill: true,  mobileBar: true },
  { label: "Projekte",    href: "#projekte",     icon: FolderOpen, desktopPill: true,  mobileBar: true },
  { label: "Über uns",    href: "#ueber-uns",    icon: Users,      desktopPill: true,  mobileBar: false },
  { label: "Prozess",     href: "#prozess",      icon: Zap,        desktopPill: true,  mobileBar: false },
  { label: "Bewertungen", href: "#bewertungen",  icon: Star,       desktopPill: true,  mobileBar: true },
  { label: "FAQ",         href: "#faq",          icon: HelpCircle, desktopPill: true,  mobileBar: false },
  { label: "Blog",        href: "#blog",         icon: BookOpen,   desktopPill: true,  mobileBar: false },
  { label: "Kontakt",     href: "#kontakt",      icon: Phone,      desktopPill: false, mobileBar: true },
];

const desktopItems = allItems.filter((i) => i.desktopPill);
const mobileBarItems = allItems.filter((i) => i.mobileBar);
const sectionIds = allItems.map((i) => i.href.replace("#", ""));

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setScrolled(window.scrollY > 50);

      // Find the section whose top is closest to 40% of viewport height
      const trigger = window.innerHeight * 0.4;
      let closest: string | null = null;
      let closestDist = Infinity;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // Section is "active" if its top is above trigger and bottom is below it
        if (rect.top <= trigger && rect.bottom > trigger) {
          const dist = Math.abs(rect.top - trigger);
          if (dist < closestDist) {
            closestDist = dist;
            closest = id;
          }
        }
      }

      if (closest) {
        setActiveSection(`#${closest}`);
      } else if (window.scrollY < 200) {
        setActiveSection("");
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = useCallback(
    (href: string) => {
      setMobileOpen(false);

      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveSection("");
        return;
      }

      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        // Set active immediately for instant feedback
        setActiveSection(href);
      }
    },
    []
  );

  return (
    <>
      {/* ─── Desktop Navigation ─── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 hidden lg:block",
          scrolled
            ? "bg-[#050505]/80 backdrop-blur-2xl border-b border-white/[0.05]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={() => handleClick("#")} className="relative z-10 shrink-0">
            <Image
              src="/logo.png"
              alt="PANDADEV"
              width={140}
              height={32}
              className="h-7 w-auto"
              priority
            />
          </button>

          {/* Pill nav */}
          <nav className="glass-strong rounded-full px-1.5 py-1.5">
            <ul className="flex items-center gap-0.5">
              {desktopItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleClick(item.href)}
                    className={cn(
                      "relative px-3 xl:px-3.5 py-2 text-[13px] font-medium rounded-full transition-colors duration-200",
                      activeSection === item.href
                        ? "text-white"
                        : "text-white/50 hover:text-white/80"
                    )}
                  >
                    {activeSection === item.href && (
                      <motion.div
                        layoutId="nav-lamp"
                        className="absolute inset-0 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/20"
                        style={{
                          boxShadow:
                            "0 0 20px rgba(139,92,246,0.2), inset 0 1px 0 rgba(139,92,246,0.1)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <button
            onClick={() => handleClick("#kontakt")}
            className="shrink-0 px-6 py-2.5 text-sm font-semibold text-white bg-[#8b5cf6] rounded-full hover:bg-[#7c3aed] transition-colors shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
          >
            Projekt starten
          </button>
        </div>
      </header>

      {/* ─── Mobile Top Bar ─── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-300",
          scrolled
            ? "bg-[#050505]/80 backdrop-blur-2xl border-b border-white/[0.04]"
            : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between px-5 h-16">
          <button onClick={() => handleClick("#")}>
            <Image
              src="/logo.png"
              alt="PANDADEV"
              width={120}
              height={28}
              className="h-6 w-auto"
              priority
            />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Menü"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* ─── Mobile Fullscreen Menu ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-5 pb-20">
              {/* Home */}
              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                onClick={() => handleClick("#")}
                className="text-xl font-medium text-white/40 hover:text-white transition-colors"
              >
                Home
              </motion.button>

              {allItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + (i + 1) * 0.05 }}
                  onClick={() => handleClick(item.href)}
                  className={cn(
                    "text-xl font-medium transition-colors",
                    activeSection === item.href
                      ? "text-[#8b5cf6]"
                      : "text-white/60 hover:text-white"
                  )}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Mobile Bottom Navigation ─── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden px-4 pb-4"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <nav className="glass-strong rounded-2xl px-1 py-1.5 flex items-center justify-around">
          {mobileBarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href;
            return (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-300",
                  isActive
                    ? "text-[#8b5cf6]"
                    : "text-white/35 active:text-white/60"
                )}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="text-[10px] font-medium leading-none">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}

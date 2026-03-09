"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

interface CachedSection {
  name: string;
  offsetTop: number;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [, setIsMobile] = useState(false);

  const sectionCacheRef = useRef<CachedSection[]>([]);
  const rafIdRef = useRef<number | null>(null);

  const buildSectionCache = useCallback(() => {
    const sectionItems = items.filter(
      (item) => item.url.startsWith("#") && item.url.length > 1
    );
    sectionCacheRef.current = sectionItems
      .map((item) => {
        const el = document.getElementById(item.url.slice(1));
        if (!el) return null;
        return { name: item.name, offsetTop: el.offsetTop };
      })
      .filter(Boolean) as CachedSection[];
  }, [items]);

  const updateActiveFromScroll = useCallback(() => {
    const scrollY = window.scrollY;

    if (scrollY < 100) {
      setActiveTab(items[0].name);
      return;
    }

    const viewportThreshold = scrollY + window.innerHeight * 0.35;
    const sections = sectionCacheRef.current;

    if (window.innerHeight + scrollY >= document.body.offsetHeight - 100) {
      const lastSection = sections[sections.length - 1];
      if (lastSection) {
        setActiveTab(lastSection.name);
        return;
      }
    }

    let bestMatch: string | null = null;
    let bestDistance = Infinity;

    for (const section of sections) {
      const distanceFromTop = section.offsetTop - scrollY;
      const distance = Math.abs(section.offsetTop - viewportThreshold);

      if (distanceFromTop <= window.innerHeight * 0.5 && distance < bestDistance) {
        bestDistance = distance;
        bestMatch = section.name;
      }
    }

    if (bestMatch) {
      setActiveTab(bestMatch);
    }
  }, [items]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current !== null) return;
      rafIdRef.current = requestAnimationFrame(() => {
        updateActiveFromScroll();
        rafIdRef.current = null;
      });
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      buildSectionCache();
    };

    handleResize();
    buildSectionCache();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    updateActiveFromScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [updateActiveFromScroll, buildSectionCache]);

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className
      )}
    >
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors duration-300",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 35,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}

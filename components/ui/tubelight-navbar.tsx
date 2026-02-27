"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [, setIsMobile] = useState(false);

  // Scroll-spy: observe which section is currently in view
  const updateActiveFromScroll = useCallback(() => {
    // If at the very top, set Home
    if (window.scrollY < 100) {
      setActiveTab(items[0].name);
      return;
    }

    // Check each nav item that has a hash URL
    const sectionItems = items.filter((item) => item.url.startsWith("#") && item.url.length > 1);

    let bestMatch: string | null = null;
    let bestDistance = Infinity;

    for (const item of sectionItems) {
      const sectionId = item.url.slice(1);
      const el = document.getElementById(sectionId);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      // Section is "active" when its top is near or above viewport center
      const distance = Math.abs(rect.top - window.innerHeight * 0.35);

      if (rect.top <= window.innerHeight * 0.5 && distance < bestDistance) {
        bestDistance = distance;
        bestMatch = item.name;
      }
    }

    // If we're near the bottom of the page, activate the last item
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      const lastItem = sectionItems[sectionItems.length - 1];
      if (lastItem) {
        setActiveTab(lastItem.name);
        return;
      }
    }

    if (bestMatch) {
      setActiveTab(bestMatch);
    }
  }, [items]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Scroll spy listener
    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    // Run once on mount
    updateActiveFromScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateActiveFromScroll);
    };
  }, [updateActiveFromScroll]);

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
            <Link
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
            </Link>
          );
        })}
      </div>
    </div>
  );
}

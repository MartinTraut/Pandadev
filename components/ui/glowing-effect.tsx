"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { animate } from "motion/react";

// Shared global event bus – one scroll + one pointermove listener for ALL
// GlowingEffect instances instead of per-instance listeners.
type Subscriber = (e: { x: number; y: number } | null) => void;

const subscribers = new Set<Subscriber>();
let globalListenersAttached = false;
let lastPointer = { x: 0, y: 0 };
let pointerThrottleTimer: ReturnType<typeof setTimeout> | null = null;

const POINTER_THROTTLE_MS = 50;

function notifySubscribers(e: { x: number; y: number } | null) {
  subscribers.forEach((fn) => fn(e));
}

function attachGlobalListeners() {
  if (globalListenersAttached) return;
  globalListenersAttached = true;

  window.addEventListener(
    "scroll",
    () => notifySubscribers(null),
    { passive: true }
  );

  document.body.addEventListener(
    "pointermove",
    (e: PointerEvent) => {
      lastPointer = { x: e.x, y: e.y };

      if (pointerThrottleTimer) return;
      pointerThrottleTimer = setTimeout(() => {
        pointerThrottleTimer = null;
        notifySubscribers(lastPointer);
      }, POINTER_THROTTLE_MS);
    },
    { passive: true }
  );
}

function subscribe(fn: Subscriber) {
  subscribers.add(fn);
  attachGlobalListeners();
  return () => {
    subscribers.delete(fn);
  };
}

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 1.2,
    borderWidth = 1,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);
    const currentAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
    const isVisibleRef = useRef(false);

    const handleMove = useCallback(
      (e?: { x: number; y: number } | null) => {
        if (!isVisibleRef.current || !containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element || !isVisibleRef.current) return;

          const { left, top, width, height } =
            element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius =
            0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          const targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff =
            ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          if (currentAnimationRef.current) {
            currentAnimationRef.current.stop();
          }

          currentAnimationRef.current = animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    // IntersectionObserver – pause all work when element is off-screen
    useEffect(() => {
      if (disabled) return;
      const element = containerRef.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisibleRef.current = entry.isIntersecting;
          if (!entry.isIntersecting) {
            element.style.setProperty("--active", "0");
            if (currentAnimationRef.current) {
              currentAnimationRef.current.stop();
              currentAnimationRef.current = null;
            }
            if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current);
              animationFrameRef.current = 0;
            }
          }
        },
        { threshold: 0 }
      );

      observer.observe(element);
      return () => observer.disconnect();
    }, [disabled]);

    // Subscribe to the shared global event bus
    useEffect(() => {
      if (disabled) return;

      const unsubscribe = subscribe((e) => {
        handleMove(e);
      });

      return () => {
        unsubscribe();
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = 0;
        }
        if (currentAnimationRef.current) {
          currentAnimationRef.current.stop();
          currentAnimationRef.current = null;
        }
      };
    }, [handleMove, disabled]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity duration-500",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                variant === "white"
                  ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )`
                  : `radial-gradient(circle, #a78bfa 10%, #a78bfa00 20%),
                radial-gradient(circle at 40% 40%, #8b5cf6 5%, #8b5cf600 15%),
                radial-gradient(circle at 60% 60%, #6366f1 10%, #6366f100 20%),
                radial-gradient(circle at 40% 60%, #3b82f6 10%, #3b82f600 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #a78bfa 0%,
                  #8b5cf6 calc(25% / var(--repeating-conic-gradient-times)),
                  #6366f1 calc(50% / var(--repeating-conic-gradient-times)),
                  #3b82f6 calc(75% / var(--repeating-conic-gradient-times)),
                  #a78bfa calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity duration-500",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)]",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-500 after:ease-out",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };

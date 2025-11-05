"use client";

/**
 * Hamburger Menu Button with Animated Waves and Icons
 *
 * Currently not in Use
 */

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { ArrowDown, X } from "lucide-react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(useGSAP, MorphSVGPlugin);

// ============================================================================
// Component Props
// ============================================================================

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
  exit?: boolean;
  orbitSpeed?: number;
  useElasticEase?: boolean;
  cursorInfluence?: number;
}

// ============================================================================
// Wave SVG Path Component
// ============================================================================

interface WaveProps {
  id: string;
  style?: React.CSSProperties;
}

const Wave = forwardRef<SVGPathElement, WaveProps>(({ id, ...props }, ref) => (
  <path
    ref={ref}
    id={id}
    d="M 2 12 Q 8 12 11 12 T 20 12 T 29 12 T 38 12 T 42 12"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    fill="none"
    {...props}
  />
));

Wave.displayName = "Wave";

// ============================================================================
// Main Hamburger Menu Button Component
// ============================================================================

export default function HamburgerMenuButton({
  isOpen,
  onClick,
  exit = false,
  orbitSpeed = 4,
  useElasticEase = false,
  cursorInfluence = 0.3,
}: HamburgerMenuProps) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const { contextSafe } = useGSAP({ scope: containerRef });
  const ease = useElasticEase ? "elastic.out(1, 0.75)" : "power3.out";

  // ============================================================================
  // Refs for animated elements
  // ============================================================================
  const outlineRef = useRef<SVGPathElement>(null);
  const wavesRef = useRef<(SVGPathElement | null)[]>([]);
  const arrowRef = useRef<SVGSVGElement>(null);
  const xRef = useRef<SVGSVGElement>(null);
  const orbitTimeline = useRef<gsap.core.Timeline | null>(null);
  const idleTimeline = useRef<gsap.core.Timeline | null>(null);

  const getTargets = (refs: React.RefObject<(Element | null)[]>) =>
    refs.current?.filter((el): el is Element => el !== null) ?? [];

  // ============================================================================
  // Animation Logic
  // ============================================================================

  const enterAnimation = contextSafe(() => {
    if (!outlineRef.current) return;
    const outlineLength = outlineRef.current.getTotalLength();

    // Set initial strokeDasharray for draw animation
    gsap.set(outlineRef.current, {
      strokeDasharray: outlineLength,
      strokeDashoffset: outlineLength,
    });

    gsap.to(outlineRef.current, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => setHasEntered(true),
    });
  });

  const enterClosed = contextSafe(() => {
    const waves = getTargets(wavesRef);

    // Position waves evenly spaced vertically (top, middle, bottom)
    gsap.set(waves.slice(0, 3), {
      y: (i) => (i - 1) * 8, // -8, 0, 8 for even spacing
    });

    gsap.fromTo(
      waves,
      { yPercent: -150, opacity: 0 },
      {
        yPercent: 0,
        opacity: (i) => (i < 3 ? 1 : 0),
        duration: 0.8,
        stagger: 0.1,
        ease,
        onComplete: idleClosed,
      }
    );
  });

  const idleClosed = contextSafe(() => {
    if (idleTimeline.current) idleTimeline.current.kill();
    const waves = getTargets(wavesRef).slice(0, 3);
    // Wave paths with 2.5-3 peaks for AM/FM radio wave style
    const wavePaths = [
      "M 2 12 Q 8 16 11 12 T 20 12 T 29 12 T 38 8 T 42 12",
      "M 2 12 Q 8 8 11 12 T 20 12 T 29 12 T 38 16 T 42 12",
      "M 2 12 Q 8 15 11 12 T 20 10 T 29 14 T 38 10 T 42 12",
    ];
    idleTimeline.current = gsap.timeline({ repeat: -1, yoyo: true });
    waves.forEach((wave, i) => {
      idleTimeline.current?.to(
        wave,
        {
          morphSVG: wavePaths[i],
          duration: 1.5,
          ease: "sine.inOut",
        },
        0
      );
    });
  });

  const hoverOnClosed = contextSafe(() => {
    idleTimeline.current?.pause();
    const waves = getTargets(wavesRef);

    // Fade in 4th wave nonchalantly
    gsap.to(waves[3], { opacity: 1, duration: 0.3 });

    // Arrow flies in from above with pulse animation
    gsap.fromTo(
      arrowRef.current,
      { y: -24, scale: 0, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease,
      }
    );

    // Add breathing pulse animation to arrow (75% scale as per spec)
    gsap.to(arrowRef.current, {
      scale: 0.78,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Morph waves to straight lines
    gsap.to(waves, {
      morphSVG: "M 2 12 Q 8 12 11 12 T 20 12 T 29 12 T 38 12 T 42 12",
      duration: 0.3,
    });

    // Position waves in circular orbit (counter-clockwise)
    gsap.to(waves, {
      x: (i) => 16 * Math.cos((i * Math.PI) / 2),
      y: (i) => 16 * Math.sin((i * Math.PI) / 2),
      duration: 0.5,
      ease,
    });

    // Start orbital rotation (counter-clockwise = negative rotation)
    orbitTimeline.current = gsap.timeline({ repeat: -1 }).to(waves, {
      rotation: -360,
      transformOrigin: "center center",
      duration: orbitSpeed,
      ease: "none",
    });
  });

  const hoverOffClosed = contextSafe(() => {
    orbitTimeline.current?.kill();
    const waves = getTargets(wavesRef);
    gsap.to(arrowRef.current, {
      y: -24,
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(waves, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.4,
      ease,
      onComplete: idleClosed,
    });
    gsap.to(waves[3], { opacity: 0, duration: 0.2, delay: 0.2 });
  });

  const clickToOpen = contextSafe(() => {
    idleTimeline.current?.kill();
    orbitTimeline.current?.kill();
    const elements = isHovered
      ? [...getTargets(wavesRef), arrowRef.current]
      : getTargets(wavesRef).slice(0, 3);
    gsap.to(elements, {
      scale: 0,
      opacity: 0,
      transformOrigin: "center center",
      duration: 0.4,
      ease: "power2.in",
      onComplete: onClick,
    });
  });

  const enterOpen = contextSafe(() => {
    const waves = getTargets(wavesRef);

    gsap.set(waves, {
      scale: 1,
      x: 0,
      rotation: 0,
      opacity: 0,
    });

    // Position waves evenly spaced vertically
    gsap.set(waves.slice(0, 3), {
      y: (i) => (i - 1) * 8,
    });

    gsap.fromTo(
      waves.slice(0, 3),
      { yPercent: -150, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease,
        onComplete: idleClosed,
      }
    );
  });
  gsap.fromTo(
    getTargets(wavesRef).slice(0, 3),
    { yPercent: -150, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease,
      onComplete: idleClosed,
    }
  );
  const hoverOnOpen = contextSafe(() => {
    idleTimeline.current?.pause();

    // X icon scales in at center (no fly-in animation)
    gsap.fromTo(
      xRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease }
    );

    // Add breathing pulse animation to X (75% scale as per spec)
    gsap.to(xRef.current, {
      scale: 0.78,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Fade out waves
    gsap.to(getTargets(wavesRef).slice(0, 3), {
      opacity: 0,
      scale: 0.5,
      duration: 0.3,
    });
  });

  const hoverOffOpen = contextSafe(() => {
    gsap.to(xRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(getTargets(wavesRef).slice(0, 3), {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      onComplete: idleClosed,
    });
  });

  const clickToClose = contextSafe(() => {
    idleTimeline.current?.kill();
    const elements = isHovered
      ? [xRef.current, ...getTargets(wavesRef).slice(0, 3)]
      : getTargets(wavesRef).slice(0, 3);
    gsap.to(elements, {
      yPercent: 100,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: onClick,
    });
  });

  const exitAnimation = contextSafe(() => {
    if (!outlineRef.current) return;
    const outlineLength = outlineRef.current.getTotalLength();
    gsap.to([getTargets(wavesRef), arrowRef.current, xRef.current], {
      opacity: 0,
      scale: 0,
      duration: 0.4,
      ease: "power2.in",
    });
    gsap.to(outlineRef.current, {
      strokeDashoffset: outlineLength,
      duration: 0.8,
      ease: "power2.inOut",
    });
  });

  // ============================================================================
  // State Management & Event Handlers
  // ============================================================================

  useGSAP(enterAnimation, { scope: containerRef, dependencies: [] });

  useEffect(() => {
    if (!hasEntered) return;
    isOpen ? enterOpen() : enterClosed();
  }, [isOpen, hasEntered, enterOpen, enterClosed]);

  useEffect(() => {
    if (!hasEntered || !isOpen) return;
    isHovered ? hoverOnOpen() : hoverOffOpen();
  }, [isHovered, hasEntered, isOpen, hoverOnOpen, hoverOffOpen]);

  useEffect(() => {
    if (!hasEntered || isOpen) return;
    isHovered ? hoverOnClosed() : hoverOffClosed();
  }, [isHovered, hasEntered, isOpen, hoverOnClosed, hoverOffClosed]);

  useEffect(() => {
    if (exit) exitAnimation();
  }, [exit, exitAnimation]);

  const handleMouseMove = contextSafe((e: React.MouseEvent) => {
    if (!isHovered || !containerRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    // Calculate cursor position relative to center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;

    // Convert to polar coordinates
    const distance = Math.sqrt(dx * dx + dy * dy) / (width / 2); // Normalized 0-1
    const angle = Math.atan2(dy, dx);

    // Calculate offset based on distance from center
    // When cursor near center: minimal manipulation
    // When cursor near edges: stronger offset
    const influence = distance * cursorInfluence;
    const iconOffset = influence * 3;
    const waveOffset = influence * 6;

    // Apply offset to icons (slight movement)
    const iconX = Math.cos(angle) * iconOffset;
    const iconY = Math.sin(angle) * iconOffset;

    gsap.to([arrowRef.current, xRef.current], {
      x: iconX,
      y: iconY,
      duration: 0.3,
      ease: "power2.out",
    });

    // Apply stronger offset to orbiting waves (layered effect)
    if (!isOpen && orbitTimeline.current) {
      const waves = getTargets(wavesRef);
      gsap.to(waves, {
        x: (i) =>
          16 * Math.cos((i * Math.PI) / 2) + Math.cos(angle) * waveOffset,
        y: (i) =>
          16 * Math.sin((i * Math.PI) / 2) + Math.sin(angle) * waveOffset,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  });

  return (
    <button
      ref={containerRef}
      onClick={isOpen ? clickToClose : clickToOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="w-12 h-12 cursor-pointer bg-transparent border-none relative overflow-hidden"
      style={{
        willChange: "transform",
      }}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      type="button"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <svg
          viewBox="0 0 48 48"
          className="absolute inset-0 w-full h-full overflow-visible"
          aria-hidden="true"
        >
          {/* Wavy outline border with rounded edges */}
          <path
            ref={outlineRef}
            d="M 24,2.5 
               Q 28,2.3 32,3.5 Q 36,4.7 39.5,7 Q 42.5,9 44.5,12 
               Q 46,15 46.5,18 Q 47,21 47,24 Q 47,27 46.5,30 
               Q 46,33 44.5,36 Q 42.5,39 39.5,41 Q 36,43.3 32,44.5 
               Q 28,45.7 24,45.5 Q 20,45.7 16,44.5 Q 12,43.3 8.5,41 
               Q 5.5,39 3.5,36 Q 2,33 1.5,30 Q 1,27 1,24 
               Q 1,21 1.5,18 Q 2,15 3.5,12 Q 5.5,9 8.5,7 
               Q 12,4.7 16,3.5 Q 20,2.3 24,2.5 Z"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <ArrowDown
          ref={arrowRef}
          className="absolute w-3/4 h-3/4 opacity-0 scale-0"
          style={{ willChange: "transform, opacity" }}
        />
        <X
          ref={xRef}
          className="absolute w-3/4 h-3/4 opacity-0 scale-0"
          style={{ willChange: "transform, opacity" }}
        />

        <div className="absolute w-11/12 h-11/12">
          {[...Array(4)].map((_, i) => (
            <svg
              key={`wave-svg-${i + 1}`}
              viewBox="0 0 44 24"
              className="absolute w-full h-full overflow-visible"
              aria-hidden="true"
            >
              <Wave
                id={`wave-${i + 1}`}
                ref={(el: SVGPathElement | null) => {
                  if (el) wavesRef.current[i] = el;
                }}
                style={{ opacity: 0, willChange: "transform, opacity" }}
              />
            </svg>
          ))}
        </div>
      </div>
    </button>
  );
}

"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useCallback } from "react";
import { ArrowDown, X } from "lucide-react";

gsap.registerPlugin(useGSAP);

/**
 * @fileoverview Animated Hamburger Menu Button with Wavy Design
 *
 * @description
 * A sophisticated hamburger menu button featuring wavy, animated elements that transition
 * between different states with fluid GSAP animations. The button uses a wavy outline mask
 * and contains animated wave elements that respond to user interactions.
 *
 * ============================================================================
 * VISUAL DESIGN
 * ============================================================================
 *
 * @design_button
 * - Rounded edges with no background
 * - Wavy outline border (drawn during enter animation)
 * - overflow-hidden to act as a mask for internal content
 * - Fixed dimensions to contain the wave animations
 *
 * @design_waves
 * - 3 wavy horizontal lines (AM/FM radio wave style)
 * - Full width of the button
 * - Evenly distributed along Y-axis (justify-content: space-evenly equivalent)
 * - Continuously animate with sine/wave motion
 *
 * ============================================================================
 * ANIMATION STATES & TRANSITIONS
 * ============================================================================
 *
 * @state_enter "Initial Load Animation"
 * 1. Wavy outline draws along its path (stroke-dashoffset animation)
 * 2. Three waves animate in from above (y: -100% → their positions)
 * 3. Waves settle into their evenly-spaced positions
 * 4. Transition to CLOSED state
 *
 * @state_closed "Default Idle State"
 * - 3 wavy horizontal lines
 * - Continuously animate with AM/FM wave motion (sine wave distortion)
 * - Evenly spaced vertically (top, middle, bottom)
 * - Loop indefinitely until state change
 *
 * @state_closed_hover "Hover State from Closed"
 * Transition IN:
 * - Middle wave duplicates into 4 waves
 * - 4 waves fly outward to circular positions around cursor
 * - Arrow-down icon flies in from above (y: -100% → center)
 * - 4 waves begin rotating around the arrow (orbital motion)
 * - Animation is OMNI-DIRECTIONAL (works from any hover entry point)
 * - Rotation direction is consistent (clockwise/counter-clockwise)
 *
 * Active State:
 * - Arrow-down in center
 * - 4 animated waves orbiting around the arrow
 * - Waves maintain their wavy animation while rotating
 *
 * Transition OUT (unhover):
 * - 4 waves converge back to 3-wave closed state
 * - Arrow flies back up (y: center → -100%)
 * - Waves resume closed state positions
 *
 * @state_click_closed_to_open "Click Transition from Closed/Hover"
 * - All elements (4 waves + arrow) scale down to center point
 * - scale: 1 → 0, opacity: 1 → 0
 * - Transform origin: center
 * - Elements behave as unified object during scale
 * - Duration: ~300-400ms
 * - Leads to OPEN state
 *
 * @state_open "Menu Open Idle State"
 * Entry Animation:
 * - 3 waves animate in from ABOVE (y: -100% → positions)
 * - Same wave structure as CLOSED state
 * - Same continuous AM/FM animation
 *
 * Active State:
 * - Identical to CLOSED state visually
 * - 3 animated wavy lines
 * - Evenly spaced vertically
 *
 * @state_open_hover "Hover State from Open"
 * Transition IN:
 * - X icon scales in at center (scale: 0 → 1)
 * - NO fly-in animation (different from closed hover)
 * - X appears instantly with scale transition
 * - Waves may fade or remain (clarification needed)
 *
 * Active State:
 * - X icon in center
 * - (Behavior of waves during open hover needs clarification)
 *
 * @state_click_open_to_closed "Click Transition from Open/Hover"
 * Exit Animation:
 * - 3 waves animate out BELOW (y: positions → 100%)
 * - Scale/fade out
 * - Leads back to CLOSED state
 *
 * Entry to Closed:
 * - 3 waves fly in from above (y: -100% → positions)
 * - Resume closed state animation loop
 *
 * @state_exit "Component Unmount"
 * - Final cleanup animation
 * - All elements fade/scale out
 * - Wavy outline disappears
 *
 * ============================================================================
 * TECHNICAL NOTES
 * ============================================================================
 *
 * @technical_waves
 * - Waves need to be SVG paths or CSS-based wavy shapes
 * - AM/FM animation: horizontal sine wave distortion (SVG path morphing or CSS distortion)
 * - Each wave is independent but synchronized in timing
 *
 * @technical_outline
 * - SVG stroke with stroke-dasharray/stroke-dashoffset for draw effect
 * - Rounded rect or custom wavy path
 * - Acts as visual border and mask boundary
 *
 * @technical_cursor_tracking
 * - Closed hover state needs cursor position for omni-directional behavior
 * - 4 waves position relative to cursor entry point
 * - Rotation is absolute (not affected by entry direction)
 *
 * @technical_duplication
 * - Middle wave duplication: either clone element or show/hide pre-existing 4 waves
 * - Morph transition from 3 waves to 4 waves arrangement
 *
 * ============================================================================
 * QUESTIONS FOR CLARIFICATION
 * ============================================================================
 *
 * ============================================================================
 * IMPLEMENTATION SPECIFICATIONS (ANSWERED)
 * ============================================================================
 *
 * @spec_1 Wave Behavior in Open Hover
 * ANSWER: The 3 waves transform into the 4 orbiting waves that surround and rotate
 * around the cursor. Same wave instances, just repositioned and animated differently.
 *
 * @spec_2 Wave Duplication Mechanics
 * ANSWER: During the transition to closed hover, a copy of the middle wave fades in
 * nonchalantly (not a separate step). This happens simultaneously while all waves are
 * already moving to their surrounding orbital positions. Subtle and fluid, not a
 * distinct duplication event.
 *
 * @spec_3 Rotation Details
 * ANSWER:
 * - Direction: Counter-clockwise
 * - Speed: Customizable (add boolean/parameter for adjustment)
 * - Radius: Fixed, large enough to surround the arrow/X icon
 * - Distance: Consistent orbital radius throughout rotation
 *
 * @spec_4 Arrow Design
 * ANSWER:
 * - Use Lucide or React-Feather ArrowDown icon
 * - Light pulse animation on size (subtle breathing effect)
 * - Size: ~75% of button size (3/4 scale)
 *
 * @spec_5 X Icon Design
 * ANSWER:
 * - Use Lucide or React-Feather X icon
 * - Same light pulse animation as arrow (size breathing)
 * - Size: ~75% of button size (3/4 scale)
 *
 * @spec_6 Timing & Easing
 * ANSWER:
 * - Fluid and smooth animations
 * - Boolean parameter to toggle between elastic and power curves
 * - Allows testing/comparing different easing styles
 *
 * @spec_7 Wave Visual Style
 * ANSWER:
 * - 2.5 to 3 wave peaks across the full button width
 * - Smooth, continuous wave form
 * - Follow intuition for amplitude and oscillation
 *
 * @spec_8 Cursor-Responsive Positioning (Advanced)
 * ANSWER: Two-layer cursor tracking system:
 * - Track cursor position in polar coordinates (angle + distance from center)
 * - When cursor near center: minimal manipulation
 * - When cursor near edges/corners: stronger directional offset
 *
 * Position Manipulation Logic:
 * - X/Arrow icon: Slight offset toward cursor direction
 * - Orbiting waves: Stronger offset in same direction (layered on top)
 * - Creates depth and responsiveness to cursor movement
 *
 * Example:
 *   Cursor at 250° near corner → X shifts slightly toward 250°, waves shift more
 *   Cursor at 23° near center → minimal shift for both
 *
 * @spec_9 Wave Persistence & Instance Management
 * ANSWER:
 * - Waves are (almost) always the same instances throughout all states
 * - Continuously animate and morph between positions
 * - No cross-fading or hard cuts - smooth repositioning
 * - Wave objects persist through state transitions
 *
 * @spec_10 Button Dimensions
 * ANSWER:
 * - 48×48px (w-12 h-12 in Tailwind)
 * - Provides more room for wave animations
 * - Better visual prominence for the detailed animations
 *
 * ============================================================================
 * CUSTOMIZATION PARAMETERS
 * ============================================================================
 *
 * @param_orbit_speed
 * - Type: number (seconds per full rotation)
 * - Default: 3-4 seconds
 * - Adjustable via props or internal state
 *
 * @param_easing_type
 * - Type: boolean (elastic vs power curves)
 * - Allows A/B testing of animation feel
 * - Toggle between bouncy/elastic and smooth/power easing
 *
 * @param_cursor_influence
 * - Type: number (0-1 multiplier)
 * - Controls strength of cursor-based position manipulation
 * - 0 = no influence, 1 = maximum offset
 *
 * ============================================================================
 * TECHNICAL IMPLEMENTATION NOTES
 * ============================================================================
 *
 * @tech_cursor_tracking
 * - MouseMove event listener on button
 * - Calculate polar coordinates: angle = atan2(dy, dx), distance from center
 * - Apply transform based on distance from center (0 = center, 1 = edge)
 * - GSAP quickTo for smooth cursor-following without lag
 *
 * @tech_wave_svg
 * - SVG paths with sine wave shape (2.5-3 peaks)
 * - Continuous horizontal oscillation via path morphing or transform
 * - 4 wave elements total (3 visible in closed, 4 in hover)
 * - CSS/SVG masks for overflow-hidden effect
 *
 * @tech_outline_draw
 * - SVG stroke with rounded rect + wavy path
 * - stroke-dasharray equals path length
 * - Animate stroke-dashoffset from length to 0 for draw effect
 *
 * @tech_icon_integration
 * - Import Lucide/React-Feather components
 * - GSAP animation on scale for pulse (0.95 ↔ 1.05)
 * - Position absolute in button center
 *
 * @tech_performance
 * - Use will-change for animated properties
 * - GPU-accelerated transforms (translate3d, not translate)
 * - RequestAnimationFrame for smooth 60fps animations
 */

interface HamburgerMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  exit: boolean;
  orbitSpeed?: number; // seconds per rotation
  useElastic?: boolean; // toggle elastic vs power easing
  cursorInfluence?: number; // 0-1 multiplier
}

// Generate wavy SVG path with 2.5-3 peaks
const generateWavePath = (width: number, peaks = 2.5, amplitude = 3) => {
  const points = 100;
  const frequency = (peaks * 2 * Math.PI) / width;
  let path = `M 0,0`;

  for (let i = 0; i <= points; i++) {
    const x = (i / points) * width;
    const y = Math.sin(x * frequency) * amplitude;
    path += ` L ${x},${y}`;
  }

  return path;
};

export default function HamburgerMenuButton({
  isOpen,
  onClick,
  exit,
  orbitSpeed = 4,
  useElastic = false,
  cursorInfluence = 0.3,
}: HamburgerMenuButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const outlineRef = useRef<SVGPathElement>(null);
  const wave1Ref = useRef<SVGPathElement>(null);
  const wave2Ref = useRef<SVGPathElement>(null);
  const wave3Ref = useRef<SVGPathElement>(null);
  const wave4Ref = useRef<SVGPathElement>(null); // 4th wave for hover state
  const arrowRef = useRef<HTMLDivElement>(null);
  const xIconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, angle: 0, distance: 0 });
  const hasEnteredRef = useRef(false);

  // Cursor tracking for omni-directional positioning
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    const angle = Math.atan2(y, x);
    const distance = Math.sqrt(x * x + y * y) / (rect.width / 2); // 0-1

    setCursorPos({ x, y, angle, distance: Math.min(distance, 1) });
  }, []);

  // Main GSAP animation setup
  useGSAP(
    () => {
      if (!buttonRef.current || !svgRef.current) return;

      const outline = outlineRef.current;
      const wave1 = wave1Ref.current;
      const wave2 = wave2Ref.current;
      const wave3 = wave3Ref.current;
      const wave4 = wave4Ref.current;
      const arrow = arrowRef.current;
      const xIcon = xIconRef.current;
      const content = contentRef.current;

      if (!outline || !wave1 || !wave2 || !wave3 || !wave4 || !arrow || !xIcon || !content)
        return;

      const easeType = useElastic ? "elastic.out(1, 0.5)" : "power2.out";

      // Calculate outline path length for draw animation
      const outlineLength = outline.getTotalLength();
      gsap.set(outline, {
        strokeDasharray: outlineLength,
        strokeDashoffset: outlineLength,
      });

      // Initial setup - hide everything
      gsap.set([wave1, wave2, wave3], { y: -60, opacity: 1 });
      gsap.set(wave4, { opacity: 0, scale: 0 });
      gsap.set(arrow, { y: -60, opacity: 0 });
      gsap.set(xIcon, { scale: 0, opacity: 0 });

      // === ENTER ANIMATION ===
      if (!hasEnteredRef.current) {
        hasEnteredRef.current = true;

        const enterTL = gsap.timeline();

        // Draw outline
        enterTL.to(outline, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: easeType,
        });

        // Waves drop in from above
        enterTL.to(
          [wave1, wave2, wave3],
          {
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: easeType,
          },
          "-=0.4"
        );

        // Start wave oscillation loop
        enterTL.add(() => {
          startWaveLoop();
        });
      }

      // Wave oscillation animation
      const startWaveLoop = () => {
        gsap.to([wave1, wave2, wave3], {
          x: "+=3",
          duration: 1.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: {
            each: 0.15,
            repeat: -1,
          },
        });
      };
    },
    { scope: buttonRef, dependencies: [useElastic] }
  );

  // Hover state management with cursor-responsive positioning
  useGSAP(
    () => {
      if (!buttonRef.current) return;

      const wave1 = wave1Ref.current;
      const wave2 = wave2Ref.current;
      const wave3 = wave3Ref.current;
      const wave4 = wave4Ref.current;
      const arrow = arrowRef.current;
      const xIcon = xIconRef.current;
      const content = contentRef.current;

      if (!wave1 || !wave2 || !wave3 || !wave4 || !arrow || !xIcon || !content) return;

      const easeType = useElastic ? "elastic.out(1, 0.5)" : "power2.out";

      if (exit) {
        // Exit animation
        gsap.to([wave1, wave2, wave3, wave4, arrow, xIcon], {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        });
        gsap.to(outlineRef.current, {
          strokeDashoffset: outlineRef.current?.getTotalLength() || 0,
          duration: 0.5,
          ease: "power2.in",
        });
        return;
      }

      // Cursor influence offset
      const offsetX = cursorPos.x * cursorInfluence * cursorPos.distance * 0.1;
      const offsetY = cursorPos.y * cursorInfluence * cursorPos.distance * 0.1;
      const waveOffsetMultiplier = 1.5; // Waves move more than icon

      if (!isOpen && isHovered) {
        // CLOSED HOVER: 4 waves orbit around arrow
        const orbitRadius = 12;

        // Fade in wave4 (duplicate of middle wave)
        gsap.to(wave4, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: easeType,
        });

        // Arrow flies in from above with offset
        gsap.to(arrow, {
          y: offsetY,
          x: offsetX,
          opacity: 1,
          scale: 0.75,
          duration: 0.5,
          ease: easeType,
        });

        // Pulse animation on arrow
        gsap.to(arrow, {
          scale: 0.75 * 1.05,
          duration: 1.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Position 4 waves in orbit (counter-clockwise)
        const waves = [wave1, wave2, wave3, wave4];
        waves.forEach((wave, i) => {
          const angle = (i / 4) * Math.PI * 2;
          const x = Math.cos(angle) * orbitRadius + offsetX * waveOffsetMultiplier;
          const y = Math.sin(angle) * orbitRadius + offsetY * waveOffsetMultiplier;

          gsap.to(wave, {
            x,
            y,
            duration: 0.6,
            ease: easeType,
          });

          // Rotate counter-clockwise
          gsap.to(wave, {
            rotation: `-=${360}`,
            duration: orbitSpeed,
            ease: "none",
            repeat: -1,
            modifiers: {
              rotation: (r) => `${parseFloat(r) % 360}`,
            },
          });
        });
      } else if (!isOpen && !isHovered) {
        // CLOSED: 3 waves in horizontal stack
        gsap.killTweensOf([wave1, wave2, wave3, wave4, arrow]);

        gsap.to(wave4, { opacity: 0, scale: 0, duration: 0.3 });
        gsap.to(arrow, { y: -60, opacity: 0, duration: 0.4, ease: "power2.in" });

        gsap.to(wave1, { x: 0, y: -10, rotation: 0, duration: 0.6, ease: easeType });
        gsap.to(wave2, { x: 0, y: 0, rotation: 0, duration: 0.6, ease: easeType });
        gsap.to(wave3, { x: 0, y: 10, rotation: 0, duration: 0.6, ease: easeType });

        // Restart wave loop
        gsap.to([wave1, wave2, wave3], {
          x: "+=3",
          duration: 1.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: { each: 0.15, repeat: -1 },
        });
      } else if (isOpen && isHovered) {
        // OPEN HOVER: X icon scales in, 4 waves orbit
        const orbitRadius = 12;

        gsap.to(xIcon, {
          scale: 0.75,
          opacity: 1,
          x: offsetX,
          y: offsetY,
          duration: 0.4,
          ease: easeType,
        });

        // Pulse X
        gsap.to(xIcon, {
          scale: 0.75 * 1.05,
          duration: 1.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Fade in wave4 and orbit
        gsap.to(wave4, { opacity: 1, scale: 1, duration: 0.3 });

        const waves = [wave1, wave2, wave3, wave4];
        waves.forEach((wave, i) => {
          const angle = (i / 4) * Math.PI * 2;
          const x = Math.cos(angle) * orbitRadius + offsetX * waveOffsetMultiplier;
          const y = Math.sin(angle) * orbitRadius + offsetY * waveOffsetMultiplier;

          gsap.to(wave, { x, y, duration: 0.6, ease: easeType });
          gsap.to(wave, {
            rotation: `-=${360}`,
            duration: orbitSpeed,
            ease: "none",
            repeat: -1,
          });
        });
      } else if (isOpen && !isHovered) {
        // OPEN: Same as closed, 3 waves
        gsap.killTweensOf([wave1, wave2, wave3, wave4, xIcon]);

        gsap.to(wave4, { opacity: 0, scale: 0, duration: 0.3 });
        gsap.to(xIcon, { scale: 0, opacity: 0, duration: 0.3 });

        gsap.to(wave1, { x: 0, y: -10, rotation: 0, duration: 0.6, ease: easeType });
        gsap.to(wave2, { x: 0, y: 0, rotation: 0, duration: 0.6, ease: easeType });
        gsap.to(wave3, { x: 0, y: 10, rotation: 0, duration: 0.6, ease: easeType });

        gsap.to([wave1, wave2, wave3], {
          x: "+=3",
          duration: 1.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: { each: 0.15, repeat: -1 },
        });
      }
    },
    { dependencies: [isOpen, isHovered, exit, cursorPos, useElastic, orbitSpeed, cursorInfluence] }
  );

  const handleClick = () => {
    onClick();
  };

  const wavePath = generateWavePath(48, 2.5, 2);
  const outlinePath = `
    M 8,2 
    Q 2,2 2,8 
    L 2,40 
    Q 2,46 8,46 
    L 40,46 
    Q 46,46 46,40 
    L 46,8 
    Q 46,2 40,2 
    Z
  `;

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative w-12 h-12 cursor-pointer bg-transparent border-none p-0 overflow-hidden"
      aria-label="Menu"
      type="button"
      style={{ borderRadius: "12px" }}
    >
      {/* SVG Container with wavy outline */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="button-clip">
            <rect x="2" y="2" width="44" height="44" rx="8" />
          </clipPath>
        </defs>

        {/* Wavy outline border */}
        <path
          ref={outlineRef}
          d={outlinePath}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-foreground"
        />

        {/* Content group with clip mask */}
        <g clipPath="url(#button-clip)">
          {/* Wave elements */}
          <path
            ref={wave1Ref}
            d={wavePath}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-foreground"
            transform="translate(0, 12)"
          />
          <path
            ref={wave2Ref}
            d={wavePath}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-foreground"
            transform="translate(0, 24)"
          />
          <path
            ref={wave3Ref}
            d={wavePath}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-foreground"
            transform="translate(0, 36)"
          />
          <path
            ref={wave4Ref}
            d={wavePath}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-foreground"
            transform="translate(0, 24)"
            style={{ opacity: 0 }}
          />
        </g>
      </svg>

      {/* Icon container */}
      <div ref={contentRef} className="absolute inset-0 flex items-center justify-center">
        {/* Arrow Down */}
        <div
          ref={arrowRef}
          className="absolute text-foreground"
          style={{ transformOrigin: "center" }}
        >
          <ArrowDown size={20} strokeWidth={2} />
        </div>

        {/* X Icon */}
        <div
          ref={xIconRef}
          className="absolute text-foreground"
          style={{ transformOrigin: "center" }}
        >
          <X size={20} strokeWidth={2} />
        </div>
      </div>
    </button>
  );
}

"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

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
}

export default function HamburgerMenuButton({
  isOpen,
  onClick,
  exit,
}: HamburgerMenuButtonProps) {
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasEnteredRef = useRef(false);

  useGSAP(
    () => {
      if (!hamburgerRef.current) return;

      const topLine = hamburgerRef.current.querySelector(".line-top");
      const middleLine = hamburgerRef.current.querySelector(".line-middle");
      const bottomLine = hamburgerRef.current.querySelector(".line-bottom");

      if (!topLine || !middleLine || !bottomLine) return;

      // Kill any existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // Create master timeline
      const masterTL = gsap.timeline({ paused: true });

      // === ENTER ANIMATION (0-1s) ===
      masterTL.addLabel("enter", 0);
      masterTL.from(
        [topLine, middleLine, bottomLine],
        {
          scaleX: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "enter"
      );

      // === CLOSED LOOP (1-3s, repeating) ===
      masterTL.addLabel("closed", 1);
      masterTL.to(
        [topLine, bottomLine],
        {
          scaleX: 0.9,
          duration: 0.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
        "closed"
      );
      masterTL.to(
        middleLine,
        {
          scaleX: 1,
          duration: 0.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
        "closed"
      );

      // === CLOSED HOVER (separate timeline) ===
      masterTL.addLabel("closedHover", 3);
      masterTL.to(
        [topLine, bottomLine],
        {
          scaleX: 1.1,
          duration: 0.4,
          ease: "power2.out",
        },
        "closedHover"
      );
      masterTL.to(
        middleLine,
        {
          scaleX: 0.8,
          duration: 0.4,
          ease: "power2.out",
        },
        "closedHover"
      );

      // === FROM HOVER TO OPEN (transition) ===
      masterTL.addLabel("fromHoverToOpen", 3.4);
      masterTL.to(
        topLine,
        {
          y: 8,
          rotation: 45,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "fromHoverToOpen"
      );
      masterTL.to(
        middleLine,
        {
          opacity: 0,
          scaleX: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        "fromHoverToOpen"
      );
      masterTL.to(
        bottomLine,
        {
          y: -8,
          rotation: -45,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "fromHoverToOpen"
      );

      // === OPEN LOOP (5s onwards, repeating) ===
      masterTL.addLabel("open", 5);
      masterTL.to(
        [topLine, bottomLine],
        {
          rotation: "+=5",
          duration: 1,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
        "open"
      );

      // === OPEN HOVER (separate state) ===
      masterTL.addLabel("openHover", 7);
      masterTL.to(
        [topLine, bottomLine],
        {
          scale: 1.15,
          duration: 0.3,
          ease: "back.out(1.7)",
        },
        "openHover"
      );

      // === FROM HOVER TO CLOSED (transition) ===
      masterTL.addLabel("fromHoverToClosed", 7.3);
      masterTL.to(
        topLine,
        {
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "fromHoverToClosed"
      );
      masterTL.to(
        middleLine,
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        "fromHoverToClosed+=0.1"
      );
      masterTL.to(
        bottomLine,
        {
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "fromHoverToClosed"
      );

      // === EXIT ANIMATION ===
      masterTL.addLabel("exit", 8);
      masterTL.to(
        [topLine, middleLine, bottomLine],
        {
          scaleX: 0,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in",
        },
        "exit"
      );

      timelineRef.current = masterTL;

      // Play enter animation on mount
      if (!hasEnteredRef.current) {
        hasEnteredRef.current = true;
        masterTL.play();
        // After enter completes, go to closed loop
        masterTL.eventCallback("onUpdate", () => {
          if (masterTL.time() >= 1 && masterTL.time() < 1.1) {
            masterTL.pause();
            masterTL.seek("closed");
            masterTL.play();
          }
        });
      }
    },
    { scope: hamburgerRef, dependencies: [] }
  );

  // Handle state changes
  useGSAP(
    () => {
      if (!timelineRef.current) return;

      const tl = timelineRef.current;

      // Handle exit
      if (exit) {
        tl.pause();
        tl.seek("exit");
        tl.play();
        return;
      }

      // State machine logic
      if (isOpen) {
        if (isHovered) {
          tl.pause();
          tl.seek("openHover");
        } else {
          tl.pause();
          tl.seek("open");
          tl.play();
        }
      } else {
        if (isHovered) {
          tl.pause();
          tl.seek("closedHover");
        } else {
          tl.pause();
          tl.seek("closed");
          tl.play();
        }
      }
    },
    { dependencies: [isOpen, isHovered, exit] }
  );

  const handleClick = () => {
    if (!timelineRef.current) return;

    const tl = timelineRef.current;

    if (isOpen) {
      // Play from hover to closed transition
      tl.pause();
      tl.seek("fromHoverToClosed");
      tl.play();

      // Wait for transition to complete
      setTimeout(() => {
        onClick();
      }, 400);
    } else {
      // Play from hover to open transition
      tl.pause();
      tl.seek("fromHoverToOpen");
      tl.play();

      // Wait for transition to complete
      setTimeout(() => {
        onClick();
      }, 300);
    }
  };

  return (
    <button
      ref={hamburgerRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-transparent border-none relative"
      aria-label="Menu"
      type="button"
    >
      <span className="line-top block w-full h-0.5 bg-foreground origin-center" />
      <span className="line-middle block w-full h-0.5 bg-foreground origin-center" />
      <span className="line-bottom block w-full h-0.5 bg-foreground origin-center" />
    </button>
  );
}

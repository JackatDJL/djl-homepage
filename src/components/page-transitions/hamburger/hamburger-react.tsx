"use client";
import { Twirl as Hamburger } from "hamburger-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
// --- ÄNDERUNG: useEffect hinzugefügt ---
import type { Dispatch, SetStateAction } from "react";
import { useRef, useEffect } from "react";

gsap.registerPlugin(useGSAP);

interface HamburgerMenuProps {
  onToggle?: Dispatch<SetStateAction<boolean>>;
  toggled?: boolean;
  visible?: boolean;
}

export default function HamburgerMenuButton({
  toggled,
  onToggle,
  visible = false,
}: HamburgerMenuProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<SVGSVGElement>(null);
  const continuousAnimRef = useRef<gsap.core.Tween | null>(null);
  const hoverAnimRef = useRef<gsap.core.Tween | null>(null);
  const rotationDirectionRef = useRef<1 | -1>(1); // 1 for right/clockwise, -1 for left/counter-clockwise

  // --- NEU: Refs, um die Props zu halten, ohne den Effekt neu auszulösen ---
  const toggledRef = useRef(toggled);
  const onToggleRef = useRef(onToggle);

  // --- NEU: Refs bei jeder Änderung aktualisieren ---
  useEffect(() => {
    toggledRef.current = toggled;
  }, [toggled]);

  useEffect(() => {
    onToggleRef.current = onToggle;
  }, [onToggle]);

  const updateShapeForDirection = (direction: 1 | -1) => {
    const rect = flowerRef.current?.querySelector("rect");
    const polygon = flowerRef.current?.querySelector("polygon");

    if (direction === 1) {
      // Rotating right - show rounded square (rect)
      if (rect) rect.style.display = "block";
      if (polygon) polygon.style.display = "none";
    } else {
      // Rotating left - show star (polygon)
      if (rect) rect.style.display = "none";
      if (polygon) polygon.style.display = "block";
    }
  };

  const startContinuousRotation = () => {
    if (continuousAnimRef.current) {
      continuousAnimRef.current.kill();
    }

    const direction = rotationDirectionRef.current;
    updateShapeForDirection(direction);

    continuousAnimRef.current = gsap.to(flowerRef.current, {
      rotate: `+=${360 * direction}`,
      duration: 20,
      ease: "none",
      repeat: -1,
      // Hinzugefügt: Stellt den Rotationsursprung explizit auf das Zentrum (32, 32).
      transformOrigin: "32 32",
    });
  };

  const handleMouseEnter = () => {
    if (continuousAnimRef.current) {
      continuousAnimRef.current.pause();
    }
    if (hoverAnimRef.current) {
      hoverAnimRef.current.kill();
    }

    const currentRotation = gsap.getProperty(
      flowerRef.current,
      "rotate"
    ) as number;

    const direction = rotationDirectionRef.current;
    const rect = flowerRef.current?.querySelector("rect");
    const polygon = flowerRef.current?.querySelector("polygon");

    hoverAnimRef.current = gsap.to(flowerRef.current, {
      rotate: currentRotation + 180 * direction,
      scale: 1.15,
      duration: 0.4,
      ease: "power2.out",
      // Hinzugefügt: Stellt den Rotationsursprung explizit auf das Zentrum (32, 32).
      transformOrigin: "32 32",
    });

    // Morph to circle regardless of current shape
    if (direction === 1 && rect) {
      // Rotating right - animate rect to circle
      gsap.to(rect, {
        attr: { rx: 26, ry: 26 },
        duration: 0.4,
        ease: "power2.out",
      });
    } else if (direction === -1) {
      // Rotating left - morph star to circle with crossfade
      if (polygon) {
        gsap.to(polygon, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }
      if (rect) {
        rect.style.display = "block";
        gsap.set(rect, { attr: { rx: 12, ry: 12 } });
        gsap.to(rect, {
          opacity: 1,
          attr: { rx: 26, ry: 26 },
          duration: 0.4,
          ease: "power2.out",
        });
      }
    }
  };

  const handleMouseLeave = () => {
    if (hoverAnimRef.current) {
      hoverAnimRef.current.kill();
    }

    const currentRotation = gsap.getProperty(
      flowerRef.current,
      "rotate"
    ) as number;

    // Get opposite direction for the release animation
    const oppositeDirection = rotationDirectionRef.current === 1 ? -1 : 1;
    const rect = flowerRef.current?.querySelector("rect");
    const polygon = flowerRef.current?.querySelector("polygon");

    hoverAnimRef.current = gsap.to(flowerRef.current, {
      rotate: currentRotation + 180 * oppositeDirection,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      // Hinzugefügt: Stellt den Rotationsursprung explizit auf das Zentrum (32, 32).
      transformOrigin: "32 32",
      onComplete: () => {
        // Now reverse the direction for continuous rotation
        rotationDirectionRef.current = oppositeDirection;
        startContinuousRotation();
      },
    });

    // Morph shape based on new direction with crossfade
    if (oppositeDirection === 1 && rect) {
      // Morphing to rounded square
      gsap.to(rect, {
        attr: { rx: 12, ry: 12 },
        duration: 0.4,
        ease: "power2.out",
      });
      if (polygon) {
        polygon.style.display = "none";
      }
    } else if (oppositeDirection === -1) {
      // Morphing circle to star with crossfade
      if (rect) {
        gsap.to(rect, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }
      if (polygon) {
        polygon.style.display = "block";
        gsap.set(polygon, { opacity: 0 });
        gsap.to(polygon, {
          opacity: 1,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.out",
        });
      }
    }
  };

  useGSAP(() => {
    // Start continuous rotation
    startContinuousRotation();
  }, []);

  // Animate wrapper visibility with complex enter animation
  useGSAP(() => {
    // Stellt sicher, dass der Wrapper initial korrekt positioniert ist (versteckt, wenn nicht sichtbar)
    if (!visible) {
      gsap.set(wrapperRef.current, { y: -200, opacity: 0, scale: 1 }); // Skalierung zurücksetzen
    }

    if (visible) {
      // Enter animation
      // --- GESAMTDAUER IST 2.0s ---
      const tl = gsap.timeline({
        onInterrupt: () => {
          // Stellt sicher, dass der State zurückgesetzt wird, wenn die Animation abbricht
          if (onToggleRef.current) {
            onToggleRef.current(toggledRef.current ?? false);
          }
        },
      });
      const rect = flowerRef.current?.querySelector("rect");
      const polygon = flowerRef.current?.querySelector("polygon");

      // Set initial state (above screen)
      gsap.set(wrapperRef.current, {
        y: -200,
        opacity: 1,
        visibility: "visible",
        scale: 1, // Sicherstellen, dass die Skalierung für Enter auf 1 ist
      });

      // --- 1. Move button down from above screen (0.0s - 1.2s) ---
      tl.to(
        wrapperRef.current,
        {
          y: 0,
          duration: 1.2, // Etwas schneller als Gesamtzeit für ein schnelles 'Einfliegen'
          ease: "power2.out",
        },
        0
      );

      // --- 2. Fast continuous rotation of border shape, slowing down at end (0.0s - 2.0s) ---
      tl.to(
        flowerRef.current,
        {
          rotate: "+=1800", // 5 full rotations, mehr Drehung
          duration: 2.0, // Läuft über die gesamte Zeit
          ease: "power2.out",
          transformOrigin: "32 32",
          onComplete: () => {
            startContinuousRotation();
          },
        },
        0
      );

      // --- 3. Shape morphing sequence: rect -> triangle -> circle -> rect (0.1s - 1.8s) ---
      if (rect && polygon) {
        // Set initial state for morph: Start with Rounded Square
        gsap.set(rect, {
          display: "block",
          opacity: 1,
          attr: { rx: 12, ry: 12 },
        });
        gsap.set(polygon, { display: "none", opacity: 0 });

        // Morph rect -> triangle
        tl.to(rect, { opacity: 0, duration: 0.15 }, 0.1);
        tl.to(polygon, { display: "block", opacity: 1, duration: 0.15 }, 0.1); // Endet bei 0.25s

        // Morph triangle -> circle
        tl.to(polygon, { opacity: 0, duration: 0.3 }, 0.6);
        tl.to(
          rect,
          {
            display: "block",
            opacity: 1,
            attr: { rx: 26, ry: 26 }, // Morph to circle
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.6
        ); // Endet bei 0.9s

        // Morph circle -> rect (final shape)
        tl.to(
          rect,
          {
            attr: { rx: 12, ry: 12 }, // Morph back to rect
            duration: 0.5, // Längere Dauer am Ende
            ease: "power2.inOut",
          },
          1.3
        ); // Endet bei 1.8s
      }

      // --- 4. Counter-clockwise rotation of hamburger icon (0.0s - 2.0s) ---
      // ZUSTANDS-OVERWRITE HIER KOMPLETT ENTFERNT
      const hamburgerContainer = wrapperRef.current?.querySelector(
        ".hamburger-icon-container"
      );
      if (hamburgerContainer) {
        tl.to(
          hamburgerContainer,
          {
            rotate: -1080, // 3 full rotations counter-clockwise
            duration: 2.0, // Läuft über die gesamte Zeit
            ease: "power2.out",
          },
          0
        ); // Startet bei 0
      }

      // Cleanup-Funktion, die die Timeline killt
      return () => {
        tl.kill();
      };
    } else {
      // Exit animation
      gsap.to(wrapperRef.current, {
        scale: 0, // Auf 0 skalieren
        opacity: 0,
        y: 0, // y-Position beibehalten, da wir skalieren
        duration: 0.8, // Dauer für den Elastic-Effekt
        ease: "elastic.in(1, 0.5)", // Gewünschtes Easing
        onComplete: () => {
          gsap.set(wrapperRef.current, { visibility: "hidden" });
          // Optional: Reset scale to 1 for next entry
          gsap.set(wrapperRef.current, { scale: 1 });
        },
      });
    }
    // Nur 'visible' als Dependency
  }, [visible]);

  return (
    <div
      ref={wrapperRef}
      className="hamburger-wrapper"
      style={{
        pointerEvents: visible ? "auto" : "none",
        // Sichtbarkeit wird jetzt hauptsächlich durch GSAP gesteuert
        visibility: visible ? "visible" : "hidden",
      }}
    >
      <button
        type="button"
        onClick={() => onToggle?.((prev) => !prev)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative flex items-center justify-center w-16 h-16 p-0 bg-transparent border-none cursor-pointer group"
        aria-label="Toggle menu"
      >
        {/* Blurred gradient background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ filter: "blur(16px)" }}
        >
          <title>Gradient background</title>
          <defs>
            <linearGradient
              id="chartGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" style={{ stopColor: "var(--color-chart-1)" }} />
              <stop
                offset="25%"
                style={{ stopColor: "var(--color-chart-2)" }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "var(--color-chart-3)" }}
              />
              <stop
                offset="75%"
                style={{ stopColor: "var(--color-chart-4)" }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "var(--color-chart-5)" }}
              />
            </linearGradient>
            <radialGradient id="opacityGradient">
              <stop offset="0%" stopOpacity="1" />
              <stop offset="100%" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="url(#chartGradient)"
            style={{ opacity: "url(#opacityGradient)" }}
          />
        </svg>

        {/* Rotating dotted border */}
        <svg
          ref={flowerRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          viewBox="0 0 64 64"
        >
          <title>Rotating border</title>
          {/* Rounded square - shown when rotating right */}
          <rect
            x="6"
            y="6"
            width="52"
            height="52"
            rx="12"
            ry="12"
            fill="none"
            stroke="var(--color-foreground)"
            strokeWidth="2"
            strokeDasharray="2 8"
            strokeLinecap="round"
          />
          {/* Triangle shape - shown when rotating left */}
          <polygon
            // GEÄNDERT: Polygon-Koordinaten um ca. 15% hochskaliert, wobei der Mittelpunkt (32, 32) beibehalten wurde
            points="32, 1.0549 4, 48.9451 60, 48.9451"
            fill="none"
            stroke="var(--color-foreground)"
            strokeWidth="2"
            strokeDasharray="2 8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              display: "none",
            }}
          />
        </svg>

        {/* Hamburger button centered inside */}
        <div className="hamburger-icon-container relative z-10 pointer-events-none group-hover:scale-110 transition-transform duration-300">
          <Hamburger toggled={toggled} size={24} color="#ffffff" label="Menu" />
        </div>
      </button>
    </div>
  );
}

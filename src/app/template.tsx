"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import FullScreenLogoLayer from "~c/page-transitions/full-screen-logo-layer";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
gsap.registerPlugin(useGSAP);

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useGSAP(
    () => {
      const handlePageShow = () => {
        const tl = gsap.timeline();

        setVisible(true);
        tl.to(".page-content-layer-x", { z: 20 });
        tl.to(".page-reveal-layer", { z: 10, visibility: "visible" }, "<");
        tl.from(
          ".page-content-layer-x",
          {
            duration: 1,
            xPercent: -100,
            ease: "sine.out",
          },
          0.5
        ).fromTo(
          ".page-content-layer-s",
          {
            backgroundColor: "#110e0c",
            borderRadius: "1rem",
            scale: 0.5,
          },
          {
            duration: 1,
            backgroundColor: "#0c0a09",
            borderRadius: "0rem",
            ease: CustomEase.create(
              "custom",
              "M0,0 C0.418,0 0.649,-0.018 0.729,0.022 0.888,0.102 1,0.811 1,1 "
            ),
            scale: 1,
          },
          "<"
        );
        tl.to(".page-reveal-layer", { z: -20, visibility: "hidden" }, ">");
        tl.to(".page-content-layer-x", { z: 10 }, "<");

        return tl;
      };

      const handlePageReveal = () => {
        const tl = gsap.timeline();

        setVisible(true);
        tl.to(".page-content-layer-x", { z: 20 });
        tl.to(".page-reveal-layer", { z: 10, visibility: "visible" }, "<");
        tl.from(
          ".page-content-layer-x",
          {
            duration: 1,
            xPercent: -100,
            ease: "sine.out",
          },
          0.5
        ).fromTo(
          ".page-content-layer-s",
          {
            backgroundColor: "#110e0c",
            borderRadius: "1rem",
            scale: 0.5,
          },
          {
            duration: 1,
            backgroundColor: "#0c0a09",
            borderRadius: "0rem",
            ease: CustomEase.create(
              "custom",
              "M0,0 C0.418,0 0.649,-0.018 0.729,0.022 0.888,0.102 1,0.811 1,1 "
            ),
            scale: 1,
          },
          "<"
        );
        tl.to(".page-reveal-layer", { z: -20, visibility: "hidden" }, ">");
        tl.to(".page-content-layer-x", { z: 10 }, "<");

        return tl;
      };

      const handlePageHide = () => {
        const tl = gsap.timeline();

        setVisible(false);
        tl.to(".page-content-layer-x", { z: 20 });
        tl.to(".page-reveal-layer", { z: 10, visibility: "visible" }, "<");
        tl.to(
          ".page-content-layer-x",
          {
            duration: 1,
            xPercent: 100,
            ease: "sine.in",
          },
          0.5
        ).fromTo(
          ".page-content-layer-s",
          {
            backgroundColor: "#0c0a09",
            borderRadius: "0rem",
            scale: 1,
          },
          {
            duration: 1,
            backgroundColor: "#110e0c",
            borderRadius: "1rem",
            ease: CustomEase.create(
              "custom",
              "M0,0 C0,0.189 0.112,0.898 0.271,0.978 0.351,1.018 0.582,1 1,1 "
            ),
            scale: 0.5,
          },
          "<"
        );
        // No internal cleanup, router death imminent

        return tl;
      };

      // Expose to window for debugging
      // biome-ignore lint/suspicious/noExplicitAny: needed for window debugging
      (window as any).pageTransitions = {
        pageShow: handlePageShow,
        pageReveal: handlePageReveal,
        pageHide: handlePageHide,
      };

      console.log("🎬 Page Transitions available:");
      console.log("  window.pageTransitions.pageShow()");
      console.log("  window.pageTransitions.pageReveal()");
      console.log("  window.pageTransitions.pageHide()");

      window.addEventListener("pageshow", handlePageShow);
      window.addEventListener("pagereveal", handlePageReveal);
      window.addEventListener("pagehide", handlePageHide);

      return () => {
        window.removeEventListener("pageshow", handlePageShow);
        window.removeEventListener("pagereveal", handlePageReveal);
        window.removeEventListener("pagehide", handlePageHide);
        // biome-ignore lint/suspicious/noExplicitAny: needed for window debugging
        delete (window as any).pageTransitions;
      };
    },
    { scope: containerRef, dependencies: [visible] }
  );

  useGSAP(
    () => {
      const timeoutId = setTimeout(() => {
        if (!visible) {
          const tl = gsap.timeline();
          setVisible(true);
          tl.to(".page-content-layer-x", { z: 20 });
          tl.to(".page-reveal-layer", { z: 10, visibility: "visible" }, "<");
          tl.from(
            ".page-content-layer-x",
            {
              duration: 1,
              xPercent: -100,
              ease: "sine.out",
            },
            0.5
          ).fromTo(
            ".page-content-layer-s",
            {
              backgroundColor: "#110e0c",
              borderRadius: "1rem",
              scale: 0.5,
            },
            {
              duration: 1,
              backgroundColor: "#0c0a09",
              borderRadius: "0rem",
              ease: CustomEase.create(
                "custom",
                "M0,0 C0.418,0 0.649,-0.018 0.729,0.022 0.888,0.102 1,0.811 1,1 "
              ),
              scale: 1,
            },
            "<"
          );
          tl.to(".page-reveal-layer", { z: -20, visibility: "hidden" }, ">");
          tl.to(".page-content-layer-x", { z: 10 }, "<");
        }
      }, 1500);

      return () => clearTimeout(timeoutId);
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      <FullScreenLogoLayer className="page-reveal-layer" />
      <main className="page-content-layer-x">
        <div className="page-content-layer-s w-screen h-max">{children}</div>
      </main>
    </section>
  );
}

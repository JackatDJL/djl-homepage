"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, startTransition } from "react";

interface PageTransitionHandlers {
  onTransitionStart?: () => void | Promise<void>;
  onTransitionEnd?: () => void | Promise<void>;
}

// Extend Document interface to include startViewTransition
interface ViewTransitionDocument extends Document {
  startViewTransition?: (callback: () => void | Promise<void>) => {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
  };
}

/**
 * Hook to handle View Transitions API with Next.js navigation
 * This intercepts Link clicks and programmatic navigation to use View Transitions API
 */
export function useNextViewTransitions({
  onTransitionStart,
  onTransitionEnd,
}: PageTransitionHandlers = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    // Check if View Transitions API is supported
    const doc = document as ViewTransitionDocument;
    const isSupported =
      typeof document !== "undefined" && "startViewTransition" in document;

    if (!isSupported) {
      console.warn(
        "View Transitions API is not supported in this browser. Navigation will work without transitions.",
      );
      return;
    }

    // Detect route changes
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;

      // Run transition end callback after route change
      if (onTransitionEnd) {
        onTransitionEnd();
      }
    }

    // Intercept all link clicks to use View Transitions API
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (!link) return;

      // Check if it's an internal link
      const href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto:")) {
        return;
      }

      // Check if the link should use default behavior
      if (
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey ||
        link.target === "_blank"
      ) {
        return;
      }

      // Prevent default navigation
      e.preventDefault();

      // Start view transition with proper typing
      if (doc.startViewTransition) {
        doc.startViewTransition(async () => {
          // Run transition start callback
          if (onTransitionStart) {
            await onTransitionStart();
          }

          // Navigate using Next.js router
          startTransition(() => {
            router.push(href);
          });
        });
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [pathname, router, onTransitionStart, onTransitionEnd]);
}

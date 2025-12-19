"use client";

import { useEffect } from "react";

type TransitionCallback = () => void | Promise<void>;

interface ViewTransitionsCallbacks {
  onPageShow?: TransitionCallback;
  onPageHide?: TransitionCallback;
}

/**
 * Hook to integrate View Transitions API with custom animations
 */
export function useViewTransitions({
  onPageShow,
  onPageHide,
}: ViewTransitionsCallbacks) {
  useEffect(() => {
    // Check if View Transitions API is supported
    const isSupported =
      typeof document !== "undefined" && "startViewTransition" in document;

    if (!isSupported) {
      console.warn(
        "View Transitions API is not supported in this browser. Falling back to basic animations.",
      );
    }

    // Handle initial page load
    const handlePageShow = async () => {
      if (isSupported && onPageShow) {
        // Use View Transitions API for smooth animations
        // @ts-ignore - startViewTransition is not in TypeScript types yet
        document.startViewTransition(async () => {
          await onPageShow();
        });
      } else if (onPageShow) {
        // Fallback without View Transitions API
        await onPageShow();
      }
    };

    // Run on initial load
    handlePageShow();

    // Handle navigation events for page transitions
    const handleBeforeUnload = () => {
      if (onPageHide) {
        onPageHide();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [onPageShow, onPageHide]);
}

/**
 * Start a view transition programmatically
 */
export function startViewTransition(callback: () => void | Promise<void>) {
  if (typeof document !== "undefined" && "startViewTransition" in document) {
    // @ts-ignore - startViewTransition is not in TypeScript types yet
    return document.startViewTransition(callback);
  }
  // Fallback: just run the callback
  return callback();
}

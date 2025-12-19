"use client";

import { useEffect } from "react";

type TransitionCallback = () => void | Promise<void>;

interface ViewTransitionsCallbacks {
  onPageShow?: TransitionCallback;
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
 * Hook to integrate View Transitions API with custom animations
 */
export function useViewTransitions({ onPageShow }: ViewTransitionsCallbacks) {
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
    const doc = document as ViewTransitionDocument;
    const handlePageShow = async () => {
      if (isSupported && onPageShow && doc.startViewTransition) {
        // Use View Transitions API for smooth animations
        doc.startViewTransition(async () => {
          await onPageShow();
        });
      } else if (onPageShow) {
        // Fallback without View Transitions API
        await onPageShow();
      }
    };

    // Run on initial load
    handlePageShow();
  }, [onPageShow]);
}

/**
 * Start a view transition programmatically
 */
export function startViewTransition(callback: () => void | Promise<void>) {
  const doc = document as ViewTransitionDocument;
  if (typeof document !== "undefined" && doc.startViewTransition) {
    return doc.startViewTransition(callback);
  }
  // Fallback: just run the callback
  return callback();
}

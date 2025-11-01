"use client";

import { motion } from "motion/react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  staggerChildren?: number;
  delayStart?: number;
  durationPerChar?: number;
  direction?: "up" | "down" | "left" | "right";
}

export const AnimatedText = motion.create(AnimatedTextWrapping);

function AnimatedTextWrapping({
  text,
  className = "",
  staggerChildren = 0.05,
  delayStart = 0,
  durationPerChar = 0.4,
  direction = "up",
}: AnimatedTextProps) {
  return (
    <div>
      <AnimatedTextInternal
        text={text}
        className={className}
        staggerChildren={staggerChildren}
        delayStart={delayStart}
        durationPerChar={durationPerChar}
        direction={direction}
      />
    </div>
  );
}

function AnimatedTextInternal({
  text,
  className = "",
  staggerChildren = 0.05,
  delayStart = 0,
  durationPerChar = 0.4,
  direction = "up",
}: AnimatedTextProps) {
  const getDirectionVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case "down":
        return {
          hidden: { y: -20, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case "left":
        return {
          hidden: { x: -20, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case "right":
        return {
          hidden: { x: 20, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
    }
  };

  const letterVariants = getDirectionVariants();

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren,
            delayChildren: delayStart,
          },
        },
      }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          variants={letterVariants}
          transition={{ duration: durationPerChar }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

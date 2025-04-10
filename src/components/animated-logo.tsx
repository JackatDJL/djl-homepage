"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function AnimatedLogo() {
  return (
    <div className="relative z-50 h-10 w-10">
      <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
        <Image
          src="/logo.png"
          alt="DJL Foundation Logo"
          fill
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}

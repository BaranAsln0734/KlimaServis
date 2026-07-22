"use client";

import React from "react";
import { Snowflake } from "lucide-react";
import { motion } from "framer-motion";

export default function SnowEffect() {
  const snowflakes = [
    { top: "8%", left: "4%", size: 24, delay: 0, duration: 9, opacity: 0.18 },
    { top: "20%", right: "5%", size: 34, delay: 1.5, duration: 11, opacity: 0.14 },
    { top: "38%", left: "2%", size: 28, delay: 3, duration: 8, opacity: 0.16 },
    { top: "55%", right: "3%", size: 40, delay: 0.5, duration: 12, opacity: 0.12 },
    { top: "72%", left: "6%", size: 30, delay: 2.5, duration: 10, opacity: 0.15 },
    { top: "88%", right: "7%", size: 22, delay: 4, duration: 8.5, opacity: 0.17 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {snowflakes.map((sf, idx) => (
        <motion.div
          key={idx}
          className="absolute text-[#0EA5E9]"
          style={{
            top: sf.top,
            left: sf.left,
            right: sf.right,
            opacity: sf.opacity,
          }}
          animate={{
            y: [0, -18, 0, 18, 0],
            x: [0, 8, -8, 4, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: sf.duration,
            repeat: Infinity,
            delay: sf.delay,
            ease: "easeInOut",
          }}
        >
          <Snowflake style={{ width: sf.size, height: sf.size }} />
        </motion.div>
      ))}
    </div>
  );
}

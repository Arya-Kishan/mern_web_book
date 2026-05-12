import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const ShinyBubble = ({ text, onPress, style }) => {
  const bubbleRef = useRef(null);

  useEffect(() => {
    if (!bubbleRef.current) return;

    gsap.to(bubbleRef.current, {
      scale: 1.06,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div
      ref={bubbleRef}
      onClick={onPress}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 18px",
        minHeight: "40px",
        borderRadius: "999px",
        cursor: onPress ? "pointer" : "default",
        position: "relative",
        overflow: "hidden",
        maxWidth: "100%",

        // Main gradient background
        background: "linear-gradient(135deg, #6EE7F9, #4e46e592)",

        // Shadow like React Native
        boxShadow: "0px 5px 8px rgba(0,0,0,0.3)",

        ...style,
      }}
    >
      {/* Shine Effect */}
      <div
        style={{
          position: "absolute",
          top: "4px",
          left: "8px",
          width: "80%",
          height: "45%",
          borderRadius: "999px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.65), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Text */}
      <span
        style={{
          color: "#FFFFFF",
          fontWeight: "700",
          fontSize: "14px",
          letterSpacing: "0.5px",
          zIndex: 2,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default ShinyBubble;
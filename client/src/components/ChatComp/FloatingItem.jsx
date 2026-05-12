import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ShinyBubble from "./ShinyBubble";

const AppConstants = {
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
};

const FloatingItem = ({ onFinish, item }) => {
  const bubbleRef = useRef(null);

  const leftPosition =
    item.leftPos > AppConstants.screenWidth * 0.5
      ? { left: "10px" }
      : { right: `${item.leftPos}px` };

  useEffect(() => {
    if (!bubbleRef.current) return;

    gsap.to(bubbleRef.current, {
      bottom: window.innerHeight * 0.85,
      opacity: 0,
      duration: 6,
      ease: "linear",
      onComplete: () => {
        onFinish();
      },
    });
  }, []);

  return (
    <div
      ref={bubbleRef}
      style={{
        position: "absolute",
        bottom: 0,
        opacity: 1,
        zIndex: 100,
        width: "40%",
        ...leftPosition,
      }}
    >
      <ShinyBubble text={item.text ?? "arya"} />
    </div>
  );
};

export default FloatingItem;
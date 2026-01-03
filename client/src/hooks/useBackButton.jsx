import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const useBackButton = (onBack) => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const prevIndexRef = useRef(window.history.state?.idx);

  useEffect(() => {
    const currentIndex = window.history.state?.idx;

    if (navigationType === "POP" && currentIndex < prevIndexRef.current) {
      onBack?.(); // back button pressed
    }

    prevIndexRef.current = currentIndex;
  }, [location, navigationType, onBack]);
};

export default useBackButton;

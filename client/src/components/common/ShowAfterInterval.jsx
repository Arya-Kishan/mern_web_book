import React, { useEffect, useState, useRef } from "react";

const ShowAfterInterval = ({
  children,
  showDuration = 5000,      // how long to show (ms)
  hideDuration = 10000,    // how long to hide (ms)
}) => {
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const runCycle = () => {
      setVisible(true);

      timeoutRef.current = setTimeout(() => {
        setVisible(false);

        timeoutRef.current = setTimeout(() => {
          runCycle(); // repeat again
        }, hideDuration);
      }, showDuration);
    };

    runCycle();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [showDuration, hideDuration]);

  return <>{visible ? children : null}</>;
};

export default ShowAfterInterval;
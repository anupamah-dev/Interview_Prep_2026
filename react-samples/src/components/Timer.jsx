import React, { useEffect, useState } from 'react';

/**
 * Basic countdown timer demonstrating hooks and cleanup.
 * Props:
 *  - initialSeconds (number)
 *  - onExpire (fn)
 */
export default function Timer({ initialSeconds = 60, onExpire = () => {} }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(id);
          onExpire();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [onExpire]);

  return <div className="small">Timer: {seconds}s</div>;
}

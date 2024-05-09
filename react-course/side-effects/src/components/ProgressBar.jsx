import { useEffect, useState } from 'react';

export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        return prevTime - 10;
      });
    }, 10);

    return () => {
      console.log('Clearing interval...');
      clearInterval(interval);
    };
  }, []);

  return <progress value={remainingTime} max={timer} />;
}

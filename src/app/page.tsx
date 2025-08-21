"use client";

import { useEffect, useState } from "react";
import Timer from "@/components/Timer/Timer";
import Settings from "@/components/Settings/Settings";
import styles from "./page.module.css";

export default function Home() {
  const defaultMs = 25 * 60 * 1000;

  const [remainMs, setRemainMs] = useState<number>(defaultMs);
  const [isRunning, setRun] = useState<boolean>(false);

  function toggleRun() {
    setRun((r) => !r);
  }

  function resetTo(secs: number) {
    setRun(false);
    setRemainMs(secs * 1000);
  }

  function ring() {
    const audio = new Audio("/ring.mp3");
    audio.play().catch((error) => console.log("Failed to play sound:", error));
  }

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    let hasRung = false;

    if (isRunning) {
      intervalId = setInterval(() => {
        setRemainMs((s) => {
          if (s <= 100) {
            if (s > 0 && !hasRung) {
              hasRung = true;
              ring();
            }
            setRun(false);
            return 0;
          }
          return s - 100;
        });
      }, 100);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  return (
    <main className={styles.container}>
      <div className={styles.clock}>
        <Timer secs={Math.floor(remainMs / 1000)} isRunning={isRunning} />
      </div>
      <div className={styles.settings}>
        <Settings
          isRunning={isRunning}
          resetTo={resetTo}
          toggleRun={toggleRun}
          pomodoroDefaultMins={Math.floor(defaultMs / 1000 / 60)}
        />
      </div>
    </main>
  );
}

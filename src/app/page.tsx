"use client";

import { useEffect, useState } from "react";
import Timer from "@/components/Timer";
import Settings from "@/components/Settings";

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

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (isRunning) {
      intervalId = setInterval(() => {
        setRemainMs((s) => s - 100);
      }, 100);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  return (
    <main>
      <Timer secs={Math.floor(remainMs / 1000)} isRunning={isRunning} />
      <Settings
        resetTo={resetTo}
        toggleRun={toggleRun}
        pomodoroDefaultMins={Math.floor(defaultMs / 1000 / 60)}
      />
      <br />
      Is playing? {isRunning.toString()}
    </main>
  );
}

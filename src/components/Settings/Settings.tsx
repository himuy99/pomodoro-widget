import { TimerMode } from "@/constants";
import { useState } from "react";
import styles from "./settings.module.css";
import { Pause, Play, RotateCcw } from "lucide-react";

type SettingsProps = {
  toggleRun: () => void;
  resetTo: (secs: number) => void;
  pomodoroDefaultMins: number;
  isRunning: boolean;
};

export default function Settings({
  toggleRun,
  resetTo,
  pomodoroDefaultMins,
  isRunning,
}: SettingsProps) {
  const [mode, setMode] = useState<TimerMode>(TimerMode.Pomodoro);
  const [pomodoroMin, setPomodoroMin] = useState<number>(pomodoroDefaultMins);
  const [shortMin, setShortMin] = useState<number>(5);
  const [longMin, setLongMin] = useState<number>(15);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let mins;
          switch (mode) {
            case TimerMode.Pomodoro:
              mins = pomodoroMin;
              break;
            case TimerMode.Short:
              mins = shortMin;
              break;
            case TimerMode.Long:
              mins = longMin;
              break;
          }
          resetTo(mins * 60);
        }}
      >
        <label className={styles.inputLabel} htmlFor="pomodoro-num">
          Pomodoro
        </label>
        <input
          className={styles.numInput}
          type="number"
          min="0"
          max="99"
          step="1"
          id="pomodoro-num"
          value={pomodoroMin}
          onChange={(e) => setPomodoroMin(Number(e.target.value))}
        ></input>

        <label className={styles.inputLabel} htmlFor="short-num">
          Short Break
        </label>
        <input
          className={styles.numInput}
          type="number"
          min="0"
          max="99"
          step="1"
          id="short-num"
          value={shortMin}
          onChange={(e) => setShortMin(Number(e.target.value))}
        ></input>

        <label className={styles.inputLabel} htmlFor="long-num">
          Long Break
        </label>
        <input
          className={styles.numInput}
          type="number"
          min="0"
          max="99"
          step="1"
          id="long-num"
          value={longMin}
          onChange={(e) => setLongMin(Number(e.target.value))}
        ></input>
        <div className={styles.radioContainer}>
          <div className={styles.radioItem}>
            <input
              type="radio"
              className={styles.radioInput}
              id="pomodoro-mode"
              name="mode"
              value="pomodoro"
              checked={mode === TimerMode.Pomodoro}
              onChange={() => setMode(TimerMode.Pomodoro)}
            ></input>
            <label className={styles.radioLabel} htmlFor="pomodoro-mode">
              Pomodoro
            </label>
          </div>

          <div className={styles.radioItem}>
            <input
              type="radio"
              className={styles.radioInput}
              id="short-break-mode"
              name="mode"
              value="short"
              checked={mode === TimerMode.Short}
              onChange={() => setMode(TimerMode.Short)}
            ></input>
            <label className={styles.radioLabel} htmlFor="short-break-mode">
              Short Break
            </label>
          </div>
          <div className={styles.radioItem}>
            <input
              type="radio"
              className={styles.radioInput}
              id="long-break-mode"
              name="mode"
              value="long"
              checked={mode === TimerMode.Long}
              onChange={() => setMode(TimerMode.Long)}
            ></input>
            <label className={styles.radioLabel} htmlFor="long-break-mode">
              Long Break
            </label>
          </div>
        </div>
        <button className={styles.setButton} type="submit">
          Set {mode}
        </button>
        <button
          type="button"
          onClick={() => {
            toggleRun();
          }}
        >
          {isRunning ? <Pause size={50} /> : <Play size={50} />}
        </button>
      </form>
    </>
  );
}

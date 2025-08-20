import { TimerMode } from "@/constants";
import { useState } from "react";

type SettingsProps = {
  toggleRun: () => void;
  resetTo: (secs: number) => void;
  pomodoroDefaultMins: number;
};

export default function Settings({
  toggleRun,
  resetTo,
  pomodoroDefaultMins,
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
        <label htmlFor="pomodoro-num">Pomodoro</label>
        <input
          type="number"
          min="0"
          max="99"
          step="1"
          id="pomodoro-num"
          value={pomodoroMin}
          onChange={(e) => setPomodoroMin(Number(e.target.value))}
        ></input>

        <label htmlFor="short-num">Short Break</label>
        <input
          type="number"
          min="0"
          max="99"
          step="1"
          id="short-num"
          value={shortMin}
          onChange={(e) => setShortMin(Number(e.target.value))}
        ></input>

        <label htmlFor="long-num">Long Break</label>
        <input
          type="number"
          min="0"
          max="99"
          step="1"
          id="long-num"
          value={longMin}
          onChange={(e) => setLongMin(Number(e.target.value))}
        ></input>

        <input
          type="radio"
          id="pomodoro-mode"
          name="mode"
          value="pomodoro"
          checked={mode === TimerMode.Pomodoro}
          onChange={() => setMode(TimerMode.Pomodoro)}
        ></input>
        <label htmlFor="pomodoro-mode">Pomodoro</label>

        <input
          type="radio"
          id="short-break-mode"
          name="mode"
          value="short"
          checked={mode === TimerMode.Short}
          onChange={() => setMode(TimerMode.Short)}
        ></input>
        <label htmlFor="short-break-mode">Short Break</label>

        <input
          type="radio"
          id="long-break-mode"
          name="mode"
          value="long"
          checked={mode === TimerMode.Long}
          onChange={() => setMode(TimerMode.Long)}
        ></input>
        <label htmlFor="long-break-mode">Long Break</label>

        <button
          type="button"
          onClick={() => {
            toggleRun();
          }}
        >
          Play/Pause
        </button>
        <button type="submit">Reset</button>
      </form>
    </>
  );
}

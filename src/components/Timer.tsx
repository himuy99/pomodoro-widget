type TimerProps = {
  secs: number;
  isRunning: boolean;
};

export default function Timer({ secs, isRunning }: TimerProps) {
  const displayMins = Math.floor(secs / 60)
    .toString()
    .padStart(2, "0");
  const displaySecs = (secs % 60).toString().padStart(2, "0");
  return (
    <div>
      <span>{displayMins}</span>
      <span>:</span>
      <span>{displaySecs}</span>
    </div>
  );
}

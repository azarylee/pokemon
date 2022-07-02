import { useSharedCountDown } from "./alarmState";

const Alarm = () => {
  const { countDownNumber, handleClickOnSnooze } = useSharedCountDown();

  return (
    <div>
      <h1>Alarm Clock</h1>
      <span>{countDownNumber}</span>
      <div>
        <button onClick={() => handleClickOnSnooze()}>Snooze</button>
        <button>Dismiss</button>
      </div>
    </div>
  );
};

export default Alarm;

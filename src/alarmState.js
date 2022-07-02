import { useState, useEffect } from "react";
import { takeWhile, startWith, scan, repeatWhen } from "rxjs/operators";
import { interval, concat, of, BehaviorSubject } from "rxjs";

export const useSharedCountDown = () => {
  const countdown$ = interval(1000).pipe(
    startWith(10),
    scan((time) => time - 1),
    takeWhile((time) => time >= 0)
  );
  const action$ = new BehaviorSubject("");

  const observable$ = concat(countdown$, of("Wake Up!")).pipe(
    repeatWhen(() => action$)
  );
  const [countDownNumber, setCountDownNumber] = useState();

  useEffect(() => {
    const sub = observable$.subscribe(setCountDownNumber);

    return () => {
      if (sub) {
        sub.unsubscribe();
      }
    };
  }, []);

  function handleClickOnSnooze() {
    action$.next("snooze");
  }

  return { countDownNumber, handleClickOnSnooze };
};

import React, { useEffect, useRef, useState } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";

export default function Timer() {
  const [hours, SetHours] = useState(0);
  const [minutes, SetMinutes] = useState(0);
  const [seconds, SetSeconds] = useState(0);
  const [milliseconds, SetMilliseconds] = useState(0);
  const [stop, setStop] = useState(true);
  const [activeStartButton, setActiveStartButton] = useState(false);
  const [activeStopButton, setActiveStopButton] = useState(false);
  const [activeResetButton, setActiveResetButton] = useState(false);
  const [activeWaitButton, setActiveWaitButton] = useState(false);
  const [clickedTime, setClickedTime] = useState(0);
  const previousValue = useRef(0);
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();

  const startTimer = (e) => {
    setStop(false);
    setActiveStartButton(true);
    setActiveStopButton(false);
    setActiveResetButton(false);
    setActiveWaitButton(false);
  };

  const stopTimer = () => {
    setStop(true);
    SetHours(0);
    SetMinutes(0);
    SetSeconds(0);
    SetMilliseconds(0);
    setActiveStartButton(false);
    setActiveStopButton(true);
    setActiveResetButton(false);
    setActiveWaitButton(false);
  };

  const resetTimer = () => {
    SetHours(0);
    SetMinutes(0);
    SetSeconds(0);
    SetMilliseconds(0);
    setStop(false);
    if (activeStartButton) {
      setActiveStopButton(false);
      setActiveResetButton(true);
    } else if (activeStopButton) {
      setActiveStartButton(true);
      setActiveStopButton(false);
      setActiveResetButton(true);
    }
    setActiveWaitButton(false);

    setTimeout(() => {
      setActiveResetButton(false);
    }, 150);
  };

  useEffect(() => {
    if (clickedTime - previousValue.current < 300) {
      setStop(true);
      setActiveWaitButton(true)
      setActiveStartButton(false)
      setActiveStopButton(false)
      console.log("Previous TIme: ", previousValue.current);
      console.log("Clicked TIme: ", clickedTime);
      console.log(
        "Difference between clicks: ",
        clickedTime - previousValue.current
      );
    } else {
      console.log(
        `You should click two times between 300 ms! You've clicked in ${
          clickedTime - previousValue.current
        } ms`
      );
    }
  }, [clickedTime]);

  const waitTimer = () => {
    setClickedTime([new Date().getTime()]);
  };

  useEffect(() => {
    previousValue.current = clickedTime;
  }, [clickedTime]);

  useEffect(() => {
    let interval = null;
    if (!stop) {
      interval = setInterval(() => {
        if (minutes > 59) {
          SetHours(hours + 1);
          SetMinutes(0);
          clearInterval(interval);
        }
        if (seconds > 59) {
          SetMinutes(minutes + 1);
          SetSeconds(0);
          clearInterval(interval);
        }
        if (milliseconds >= 99) {
          SetSeconds(seconds + 1);
          SetMilliseconds(0);
          clearInterval(interval);
        }

        if (milliseconds < 99) {
          SetMilliseconds(milliseconds + 1);
        }
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

  useEffect(() => {
    console.log('Developed by Musobek Madrimov with ❤️! ✊')
  }, [])
  return (
    <div className="timerContainer">
      <div className="header">
        <h4>Секундомер</h4>
      </div>
      <div className="timer">
        <div className="clockHands">
          <div className="hours">{hours < 10 ? `0${hours}` : hours}</div>:
          <div className="minutes">
            {minutes < 10 ? `0${minutes}` : minutes}
          </div>
          :
          <div className="seconds">
            {seconds < 10 ? `0${seconds}` : seconds}
          </div>
          :
          <div className="milliseconds">
            {milliseconds < 10 ? `0${milliseconds}` : milliseconds}
          </div>
        </div>
      </div>
      <div className="buttons">
        <button
          className={activeStartButton ? "startButton clicked" : "startButton"}
          onClick={startTimer}
        >
          Start
        </button>
        <button
          className={activeStopButton ? "stopButton clicked" : "stopButton"}
          onClick={stopTimer}
        >
          Stop
        </button>
        <button
          className={activeWaitButton ? "waitButton clicked" : "waitButton"}
          onClick={() => waitTimer()}
          ref={setTriggerRef}
        >
          Wait
        </button>
        {visible && (
          <div
            ref={setTooltipRef}
            {...getTooltipProps({ className: "tooltip-container" })}
          >
            <div {...getArrowProps({ className: "tooltip-arrow" })} />
            <p className="tooltip-text">You should click two times between <b>300 ms</b>! Open the console for seeing difference between two your clicks!</p>
          </div>
        )}
        <button
          className={activeResetButton ? "resetButton clicked" : "resetButton"}
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

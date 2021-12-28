import React, { useEffect, useState } from "react";

export default function Timer() {
  const [hours, SetHours] = useState(0);
  const [minutes, SetMinutes] = useState(0);
  const [seconds, SetSeconds] = useState(0);
  const [milliseconds, SetMilliseconds] = useState(0);
  const [stop, setStop] = useState(true);
  const [activeStartButton, setActiveStartButton] = useState(false);
  const [activeStopButton, setActiveStopButton] = useState(false);
  const [activeResetButton, setActiveResetButton] = useState(false);
  const [clickedTime, setClickedTime] = useState([]);

  const startTimer = (e) => {
    setStop(false);
    setActiveStartButton(true);
    setActiveStopButton(false);
    setActiveResetButton(false);
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

    setTimeout(() => {
      setActiveResetButton(false);
    }, 150);
  };

  const waitTimer = () => {
    if (clickedTime.length > 0) {
      setClickedTime([
        clickedTime[clickedTime.length - 1],
        new Date().getTime(),
      ]);
      if (
        clickedTime[clickedTime.length - 1] -
          clickedTime[clickedTime.length - 2] <=
        500
      ) {
        setStop(true);
        setClickedTime([clickedTime[clickedTime.length - 1]]);
        console.log("ClickedTime 2: ", clickedTime[clickedTime.length - 1]);
        console.log("ClickedTime 1: ", clickedTime[clickedTime.length - 2]);
        console.log(
          "Farq: ",
          clickedTime[clickedTime.length - 1] -
            clickedTime[clickedTime.length - 2]
        );
        console.log(clickedTime);
      } else {
        setClickedTime([clickedTime[clickedTime.length - 1]]);
        console.log("ClickedTime 2: ", clickedTime[clickedTime.length - 1]);
        console.log("ClickedTime 1: ", clickedTime[clickedTime.length - 2]);
        console.log(
          "Farq: ",
          clickedTime[clickedTime.length - 1] -
            clickedTime[clickedTime.length - 2]
        );
        console.log(clickedTime);
      }
    } else {
      setClickedTime([new Date().getTime()]);
      console.log("ClickedTime 2: ", clickedTime[clickedTime.length - 1]);
      console.log("ClickedTime 1: ", clickedTime[clickedTime.length - 2]);
      console.log(
        "Farq: ",
        clickedTime[clickedTime.length - 1] -
          clickedTime[clickedTime.length - 2]
      );
      console.log(clickedTime);
    }
  };

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
          className={activeResetButton ? "waitButton clicked" : "waitButton"}
          onClick={waitTimer}
        >
          Wait
        </button>
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

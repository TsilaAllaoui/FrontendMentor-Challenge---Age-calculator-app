import { useRef, useState } from "react";
import "./App.scss";
import arrow from "./assets/icon-arrow.svg";

function App() {
  const [years, setYears] = useState("--");
  const [months, setMonths] = useState("--");
  const [days, setDays] = useState("--");

  const [yearsError, setYearsError] = useState("");
  const [monthsError, setMonthsError] = useState("");
  const [daysError, setDaysError] = useState("");

  const yearInput = useRef<HTMLInputElement | null>(null);
  const monthInput = useRef<HTMLInputElement | null>(null);
  const dayInput = useRef<HTMLInputElement | null>(null);

  const handleDayChange = (_e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (dayInput.current!.value == "") {
      setDaysError("This field is required");
      dayInput.current!.style.border = "solid 1.5px rgb(255,108,110)";
      const span = dayInput.current!.previousSibling! as HTMLElement;
      span.style.color = "rgb(255,108,110)";
      return true;
    } else {
      if (isNaN(Number(dayInput.current!.value))) {
        setDaysError("Must be a valid day");
        dayInput.current!.style.border = "solid 1.5px rgb(255,108,110)";
        const span = dayInput.current!.previousSibling! as HTMLElement;
        span.style.color = "rgb(255,108,110)";
        return true;
      }
      if (
        (monthInput.current!.value == "" ||
          yearInput.current!.value == "") &&
        parseInt(dayInput.current!.value) > new Date().getDate()
      ) {
        dayInput.current!.value = new Date().getDate().toString();
      }
      if (
        (monthInput.current!.value == "" ||
          yearInput.current!.value == "") &&
        parseInt(dayInput.current!.value) <= 0
      ) {
        dayInput.current!.value = "1";
      }

      let month = monthInput.current!.value;
      let year = yearInput.current!.value;
      console.log(month + ":" + year);
      let numberOfTotalDays = new Date(
        parseInt(year),
        parseInt(month),
        0
      ).getDate();
      console.log("---  : " + parseInt(monthInput.current!.value))
      console.log("+++  : " + (new Date().getMonth() + 1))

      if ((parseInt(monthInput.current!.value) == (new Date().getMonth() + 1)) &&
        (parseInt(yearInput.current!.value) == (new Date().getFullYear()))) {
        numberOfTotalDays = new Date().getDate();
        console.log("****  " + numberOfTotalDays)
      }
      if (parseInt(dayInput.current!.value) > numberOfTotalDays)
        dayInput.current!.value = numberOfTotalDays.toString();
      if (parseInt(dayInput.current!.value) <= 0) dayInput.current!.value = "1";

      if (dayInput.current!.value) setDaysError("");
      dayInput.current!.style.border = "solid 1.5px black";
      const span = dayInput.current!.previousSibling! as HTMLElement;
      span.style.color = "black";
      return false;

    }
  };
  const handleMonthChange = (
    _e: React.ChangeEvent<HTMLInputElement> | null
  ) => {
    if (monthInput.current!.value == "") {
      setMonthsError("This field is required");
      monthInput.current!.style.border = "solid 1.5px rgb(255,108,110)";
      const span = monthInput.current!.previousSibling! as HTMLElement;
      span.style.color = "rgb(255,108,110)";
      return true;
    } else {
      if (isNaN(Number(monthInput.current!.value))) {
        setMonthsError("Must be a valid month");
        monthInput.current!.style.border = "solid 1.5px rgb(255,108,110)";
        const span = monthInput.current!.previousSibling! as HTMLElement;
        span.style.color = "rgb(255,108,110)";
        return true;
      }
      let max = new Date().getMonth() + 1;
      if (yearInput.current!.value != "" && yearInput.current!.value != (new Date().getFullYear()).toString()) {
        max = 12;
      }

      if (parseInt(monthInput.current!.value) > max)
        monthInput.current!.value = max.toString();
      if (parseInt(monthInput.current!.value) <= 0)
        monthInput.current!.value = "1";

      setMonthsError("");
      monthInput.current!.style.border = "solid 1.5px black";
      const span = monthInput.current!.previousSibling! as HTMLElement;
      span.style.color = "black";
      return false;
    }
  };
  const handleYearChange = (_e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (yearInput.current!.value == "") {
      setYearsError("This field is required");
      yearInput.current!.style.border = "solid 1.5px rgb(255,108,110)";
      const span = yearInput.current!.previousSibling! as HTMLElement;
      span.style.color = "rgb(255,108,110)";
      return true;
    } else {
      if (isNaN(Number(yearInput.current!.value))) {
        setYearsError("Must be a valid year");
        yearInput.current!.style.border = "solid 1.5px rgb(255,108,110)";
        const span = yearInput.current!.previousSibling! as HTMLElement;
        span.style.color = "rgb(255,108,110)";
        return true;
      }
      if (
        parseInt(yearInput.current!.value) > new Date().getFullYear() ||
        parseInt(yearInput.current!.value) <= 0
      )
        yearInput.current!.value = new Date().getFullYear().toString();

      setYearsError("");
      yearInput.current!.style.border = "solid 1.5px black";
      const span = yearInput.current!.previousSibling! as HTMLElement;
      span.style.color = "black";
      return false;
    }
  };

  const compute = () => {
    let isErrorDays = handleDayChange(null);
    let isErrorMonths = handleMonthChange(null);
    let isErrorYears = handleYearChange(null);

    console.log(days)

    if (isErrorDays || isErrorMonths || isErrorYears) {
      setDays("--");
      setMonths("--");
      setYears("--");
      return;
    }

    let dayValue = dayInput.current!.value;
    let monthValue = monthInput.current!.value;
    let yearValue = yearInput.current!.value;

    let date = new Date(
      parseInt(yearValue),
      parseInt(monthValue) - 1,
      parseInt(dayValue)
    );

    console.log("Date: " + date);

    const now = new Date();
    let daysCount = Math.ceil(
      (now.getTime() - date.getTime()) / (1000 * 3600 * 24)
    );

    console.log("Days Count: " + daysCount);

    setYears(Math.floor(daysCount / 365).toString());
    setMonths(Math.floor((daysCount % 365) / 30).toString());
    setDays(((daysCount % 365) % 30).toString());
  };

  return (
    <div id="app">
      <div id="inputs">
        <div className="input">
          <label>DAY</label>
          <input
            type="text"
            ref={dayInput}
            placeholder="DD"
            onChange={handleDayChange}
          />
          <span>{daysError}</span>
        </div>
        <div className="input">
          <label>MONTH</label>
          <input
            type="text"
            ref={monthInput}
            placeholder="MM"
            onChange={handleMonthChange}
          />
          <span>{monthsError}</span>
        </div>
        <div className="input">
          <label>YEAR</label>
          <input
            type="text"
            ref={yearInput}
            placeholder="YYYY"
            onChange={handleYearChange}
          />
          <span>{yearsError}</span>
        </div>
      </div>
      <div id="arrow">
        <div id="line"></div>
        <img src={arrow} alt="arrow" onClick={compute} />
      </div>
      <div id="result">
        <div className="output">
          <span>{years}</span> years
        </div>
        <div className="output">
          <span>{months}</span> months
        </div>
        <div className="output">
          <span>{days}</span> days
        </div>
      </div>
    </div>
  );
}

export default App;

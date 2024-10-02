import { createContext, useState, useEffect } from "react";

export const WeekContext = createContext();

const WeekProvider = ({ children }) => {
  const [dates, setDates] = useState([]);
  const [weekDays, setWeekDays] = useState([]);
  const [weekNumber, setWeekNumber] = useState(0);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(0);
  const [once, setOnce] = useState(false);

  const increaseWeekNumber = () => {
    setWeekNumber((prevState) => (prevState + 1 > 52 ? 1 : prevState + 1));
  };

  const decreaseWeekNumber = () => {
    setWeekNumber((prevState) => (prevState - 1 < 1 ? 52 : prevState - 1));
  };

  const changeMonth = (weekDays) => {
    const displayedDays = weekDays.map((m) => getCurrentMonth(m));

    const isSameMonth = (shit) => {
      const halfLength = Math.floor(shit.length / 2);
      return shit.every((value) => value === shit[halfLength]);
    };

    const middleDay = displayedDays[Math.floor(displayedDays.length / 2)];

    if (isSameMonth(displayedDays)) {
      return middleDay;
    } else {
      return displayedDays[4];
    }
  };

  const getCurrentMonth = (date) => {
    let month = date.toLocaleString("default", { month: "long" });
    month = month.charAt(0).toUpperCase() + month.slice(1);

    return month;
  };

  const getCurrentWeek = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    const result = [d.getUTCFullYear(), weekNo];

    return result[1];
  };

  // get dates of the week, calculated from weeknumber & year
  const getDatesOfCurrentWeek = (weekNumber, year) => {
    const firstDayOfYear = new Date(year, 0, 1);
    const dayOfWeek = firstDayOfYear.getDay();
    const firstDayOfWeek = new Date(firstDayOfYear.getTime());

    const daysOffset =
      (weekNumber - 1) * 7 - (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    firstDayOfWeek.setDate(firstDayOfYear.getDate() + daysOffset);

    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek.getTime());
      date.setDate(firstDayOfWeek.getDate() + i);

      daysOfWeek.push(date);
    }
    setWeekDays(daysOfWeek);
  };

  // initial setup of states.
  useEffect(() => {
    setMonth(getCurrentMonth(new Date()));
    const currentWeek = getCurrentWeek(new Date());
    const currentYear = new Date().getFullYear();
    setWeekNumber(currentWeek);
    getDatesOfCurrentWeek(currentWeek, currentYear);
    setYear(currentYear);
  }, [once]);

  // Update the dates if the weeknumber/year/weekdays are changed.
  useEffect(() => {
    getDatesOfCurrentWeek(weekNumber, year);
  }, [weekNumber]);

  useEffect(() => {
    setMonth(changeMonth(weekDays));
  }, [weekDays]);

  return (
    <WeekContext.Provider
      value={{
        dates,
        setDates,
        weekNumber,
        setWeekNumber,
        month,
        setMonth,
        weekDays,
        setWeekDays,
        increaseWeekNumber,
        decreaseWeekNumber,
      }}
    >
      {children}
    </WeekContext.Provider>
  );
};

export default WeekProvider;

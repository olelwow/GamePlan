import { createContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
//Create a context to share week-data between components
const WeekContext = createContext();

const WeekProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDays, setWeekDays] = useState([]);
  const [weekNumber, setWeekNumber] = useState(0);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(0);
  const [nikos, setNikos] = useState({});

  const increaseWeekNumber = () => {
    setWeekNumber((prevState) => (prevState + 1 > 52 ? 1 : prevState + 1));
  };

  const decreaseWeekNumber = () => {
    setWeekNumber((prevState) => (prevState - 1 < 1 ? 52 : prevState - 1));
  };

  const changeMonth = (weekDays) => {
    const displayedDays = weekDays.map((m) => getCurrentMonth(m));

    const isSameMonth = (values) => {
      const halfLength = Math.floor(values.length / 2);
      return values.every((value) => value === values[halfLength]);
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
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    const result = [d.getUTCFullYear(), weekNumber];

    return result[1];
  };

  const getDatesOfCurrentWeek = (weekNumber, year) => {
    const firstDayOfYear = new Date(year, 0, 1);
    const dayOfWeek = firstDayOfYear.getDay();
    const firstDayOfWeek = new Date(firstDayOfYear.getTime());

    const daysOffSet =
      (weekNumber - 1) * 7 - (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    firstDayOfWeek.setDate(firstDayOfYear.getDate() + daysOffSet);

    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek.getTime());
      date.setDate(firstDayOfWeek.getDate() + i);
      daysOfWeek.push(date);
    }
    setWeekDays(daysOfWeek);
  };

  //Initiates when the component is mounted
  useEffect(() => {
    setMonth(getCurrentMonth(new Date()));
    const currentWeek = getCurrentWeek(new Date());
    const currentYear = new Date().getFullYear();
    setWeekNumber(currentWeek);
    getDatesOfCurrentWeek(currentWeek, currentYear);
    setYear(currentYear);
  }, []);

  const toggleActivity = async (
    activity,
    [isChecked, setIsChecked],
    [activities, setActivities],
    props
  ) => {
    setIsChecked((prevState) => !prevState);

    activity.completed = isChecked;
    const activityXp = activity.completed && activity.xp;

    const updatedActivity = {
      ...activity,
      completed: activity.completed,
      date: activity.date,
    };

    await fetch(`https://localhost:7136/api/activities/${activity.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedActivity),
    });

    if (activityXp > 0) {
      const res = await fetch(
        `https://localhost:7136/api/users/${props.user}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ xp: activityXp }),
        }
      );

      const person = await fetch(
        `https://localhost:7136/api/users/${props.user}`
      );
      const data = await person.json();
      setNikos(data);
      if (res.ok) {
        console.log("xp updated");
      } else {
        console.log("error updating xp");
      }
    }
    setActivities(
      activities.map((a) => (a.id === activity.id ? updatedActivity : a))
    );
  };

  //Initiates when the weekNumber is changed
  useEffect(() => {
    getDatesOfCurrentWeek(weekNumber, year);
  }, [weekNumber]);
  //Initiates when the weekDays is changed
  useEffect(() => {
    setMonth(changeMonth(weekDays));
  }, [weekDays]);

  return (
    <WeekContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        weekNumber,
        setWeekNumber,
        month,
        weekDays,
        setWeekDays,
        setMonth,
        increaseWeekNumber,
        decreaseWeekNumber,
        toggleActivity,
        nikos,
      }}
    >
      {children}
    </WeekContext.Provider>
  );
};

export { WeekProvider, WeekContext };

import Day from "./Day";
import React, { useContext } from "react";
import { WeekContext } from "./WeekContext";


const Week = () => {
    const { weekDays } = useContext(WeekContext);

  return (
    <>
    <div className="weekday">
      {weekDays.map((day, index) => (
        <Day key={index} day={day} />
      ))}
      </div>
    </>
  );
};

export default Week;

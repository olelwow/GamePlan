import Day from "./Day";
import React, { useContext } from "react";
import { WeekContext } from "./WeekContext";


const Week = () => {
    const { weekDays, handleNextWeek, handlePrevWeek } = useContext(WeekContext);
  

  return (
    <>
    <div className="weekday">
      {weekDays.map((day, index) => (
        <Day key={index} day={day} />
      ))}
      </div>
      <button onClick={handlePrevWeek}>Prev</button>
      <button onClick={handleNextWeek}>Next</button>
    </>
  );
};

export default Week;

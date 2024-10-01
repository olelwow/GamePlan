import Day from "./Day";
import { useContext } from "react";
import { WeekContext } from "./WeekContext";

const Week = () => {
    const { weekDays } = useContext(WeekContext);

  return (
    <>
    <div className="weekday">
      {weekDays.map((day, index) => (
        <Day key={index} day={day} user={user}/>
      ))}
      </div>
    </>
  );
};

export default Week;

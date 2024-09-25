import Day from "./Day";
import User from "./User";


const Week = () => {
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - date.getDay() + i + 1);
      weekDays.push(date);
    }

  return (
    <>
      <User />
    <div className="weekday">
      {weekDays.map((day, index) => (
        <Day key={index} day={day} />
      ))}
    </div>
    </>
  );
};

export default Week;

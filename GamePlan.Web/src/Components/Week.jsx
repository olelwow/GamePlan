import Day from "./Day";


const Week = () => {
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - date.getDay() + i + 1);
      weekDays.push(date);
    }

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

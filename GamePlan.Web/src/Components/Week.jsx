import Day from "./Day";


const Week = () => {
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - date.getDay() + i + 1);
      weekDays.push(date);
  }
  
  const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return [d.getFullYear(), weekNo];
  }

  const handleNextWeek = () => {
    setWeekNumber(prevWeek => prevWeek + 1);
  };

  const handlePrevWeek = () => {
    setWeekNumber(prevWeek => prevWeek - 1);
  };

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

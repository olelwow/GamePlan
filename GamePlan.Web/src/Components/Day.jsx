import { useState } from "react";

const Day = (props) => {
  const [expandDay, setExpandDay] = useState(false);

  const TodaysDate = () => {
    const date = new Date();
    const todaysDate = props.day.toLocaleDateString("sv-SE", {
      weekday: "long",
      day: "numeric",
    });
    return todaysDate;
  };

  const AddActivity = () => {
    console.log(`Lägg till aktivitet ${TodaysDate()}`);
  };

  return (
    <div className="day">
      <button onClick={() => setExpandDay(!expandDay)}>{TodaysDate()}</button>
      {expandDay && (
        <div>
          <p>Aktivitet för {TodaysDate()}</p>
          <button onClick={AddActivity}>Lägg till aktivitet</button>
        </div>
      )}
    </div>
  );
};

export default Day;

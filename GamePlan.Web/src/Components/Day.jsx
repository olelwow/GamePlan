import { useEffect, useState } from "react";

const Day = (props) => {
  const [expandDay, setExpandDay] = useState(false);
  const [activities, setActivities] = useState([]);

  const TodaysDate = () => {
    const date = new Date();
    const todaysDate = props.day.toLocaleDateString("sv-SE", {
      weekday: "long",
      day: "numeric",
    });
    return todaysDate;
  };

  //useeffect to fetch activities and display them when the
  //day is expanded and wanting to add activity to that day, show as a list or something.
  useEffect(() => {
    let expandedDay = true;
    if (expandDay) {
      const fetchActivities = async () => {
        const response = await fetch("https://localhost:7136/api/activities");
        const data = await response.json();
        if (expandedDay) {
          setActivities(data);  
        }
      };
      fetchActivities();
    }
    return () => {
      expandedDay = false;
    };

  }, [expandDay]);
  
  console.log(activities);
  // const getActivity = () => {
  //   useEffect 
  //   })
  // } 

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

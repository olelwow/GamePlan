import { useEffect, useState } from "react";
import ArrowDown from "../assets/images/arrowDown.png";
import ArrowUp from "../assets/images/arrowUp.png";

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

  const dayWednesday = props.day.getDay() === 3;
  const daySaturday = props.day.getDay() === 6;

  const AddActivity = () => {
    console.log(`Lägg till aktivitet ${TodaysDate()}`);
  };

  const RemoveActivity = () => {
    console.log(`Ta bort aktivitet ${TodaysDate()}`);
  }

const [onClick, setOnClick] = useState(false);
const [borderRadius, setBorderRadius] = useState('5px');

function handleClick() {
  setOnClick(prevState => !prevState);
  setBorderRadius(onClick ? '5px' : '5px 5px 0px 0px');
}

  return (
    <>
      <button 
      style={
         {borderRadius: borderRadius} 
        }
      className="day" 
      onClick={
        function () 
        {
          setExpandDay(!expandDay),
          handleClick()
        }}>
        {TodaysDate()}
        <p>3st</p>
        <img 
          src={onClick ?  ArrowUp : ArrowDown} 
          alt="arrow" 
          className="arrow" 
        />
      </button>
      
      {expandDay && (
        <div 
        id="dayContent"
        
        >
          <p className="activitySummary">Aktivitet för {TodaysDate()}</p>
          {dayWednesday &&
            activities.find((activity) => activity.name === "Study") && (
              <p>Idag är det Study</p>
            )}
          {daySaturday &&
            activities.find((activity) => activity.name === "Gym") && (
              <p>Idag är det Gym</p>
            )}
            <div className="buttonContainer">
              <button
                className="addButton" 
              onClick=
              {AddActivity}> + 
                </button>
              {activities && <button
                className="removeButton" 
              onClick=
              {RemoveActivity}> - 
              </button>}
          </div>
        </div>
      )}
    </>
  );
};

export default Day;

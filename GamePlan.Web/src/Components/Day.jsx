import { useEffect, useState } from "react";
import ArrowDown from "../assets/images/arrowDown.png";
import ArrowUp from "../assets/images/arrowUp.png";

const Day = (props) => {
  const [expandDay, setExpandDay] = useState(false);
  const [activities, setActivities] = useState([]);
  const [activityCount, setActivityCount] = useState(0);

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
  const fetchActivities = async () => {
    const response = await fetch(
      `https://localhost:7136/api/users/${props.user.user}/activities`
    );

    const data = await response.json();
    const todayActivities = data.filter(
      (activity) =>
        new Date(activity.date).toDateString() === props.day.toDateString()
    );
    setActivities(todayActivities);
    setActivityCount(todayActivities.length);
  };

  useEffect(() => {
    fetchActivities();
  }, [props.user, props.day]);
  
  useEffect(() => {
    if (expandDay) {
      fetchActivities();
    }
  }, [expandDay]);

  const toggleActivity = async (activity) => {
    const activityState = !activity.completed;
    const activityXp = activityState ? activity.xp : -activity.xp;

    const updatedActivity = { ...activity, completed: activityState };
      await fetch(
      `https://localhost:7136/api/activities/${activity.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedActivity),
      }
    );

    await fetch(
      `https://localhost:7136/api/users/${props.user.user}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ xp: activityXp }),
      }
    );

    setActivities(
      activities.map((a) => (a.id === activity.id ? updatedActivity : a))
    );
  };

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
        style={{ borderRadius: borderRadius }}
        className="day"
        onClick={() => {
          setExpandDay(!expandDay), handleClick();
        }}
      >
        {TodaysDate()}
        <p>{activities.length} aktiviteter</p>
        <img
          src={onClick ? ArrowUp : ArrowDown}
          alt="arrow"
          className="arrow"
        />
      </button>

      {expandDay && (
        <div id="dayContent">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id}>
                <input
                  type="checkbox"
                  checked={activity.completed}
                  onChange={() => toggleActivity(activity)}
                />
                <span>
                  {activity.name} - XP: {activity.xp}
                </span>
              </div>
            ))
          ) : (
            <p>Inga aktiviteter idag.</p>
          )}

          <div className="buttonContainer">
            <button className="addButton" onClick={AddActivity}>
              {" "}
              +
            </button>
            {activities && (
              <button className="removeButton" onClick={RemoveActivity}>
                {" "}
                -
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Day;

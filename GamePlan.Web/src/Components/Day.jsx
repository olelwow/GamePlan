import { useEffect, useState } from "react";
import ArrowDown from "../assets/images/arrowDown.png";
import ArrowUp from "../assets/images/arrowUp.png";

const Day = (props) => {
  let objectifiedDay = new Date(props.day);
  let convertedDate = objectifiedDay.toISOString().split("T")[0];

  const [expandDay, setExpandDay] = useState(false);
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState("");
  const [date, setDate] = useState(props.day);

  // states for styling
  const [onClick, setOnClick] = useState(false);
  const [borderRadius, setBorderRadius] = useState("5px");

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
        const response = await fetch("https://localhost:7136/api/activities/");
        const data = await response.json();
        if (expandedDay) {
          setActivities(data);
          getUser();
        }
      };
      fetchActivities();
    }
    return () => {
      expandedDay = false;
    };
  }, [expandDay]);

  // get the current logged in user
  async function getUser() {
    const activityList = await fetch(
      "https://localhost:7136/api/users/3/activities"
    );
    const person = await fetch("https://localhost:7136/api/users/3");
    const data = await activityList.json();
    const userData = await person.json();
    setUserActivities(data);
    setUser(userData);
  }

  // handles the click on the add activity button
  const AddActivity = async () => {
    setIsClicked((prevState) => !prevState);
  };

  //function that saves an activity on the user to the database
  async function SaveActivity(activity) {
    const res = await fetch("https://localhost:7136/api/activities/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activity),
    });
    if (!res.ok) {
      console.log("Error when saving activity");
    } else {
      console.log("Activity saved");
    }
  }

  //function that get the selected option from the select list
  function handleChange(event) {
    setSelectedActivityId(event.target.value);
  }

  //function that handles the submit of the
  //form and saves the activity to the user
  function handleSubmit(event) {
    event.preventDefault();
    getUser();
    //iterate the activities and find the selected activity
    const activityArray = activities;
    let selectedActivity;
    for (var activity in activityArray) {
      if (activityArray[activity].id === parseInt(selectedActivityId)) {
        selectedActivity = activityArray[activity];
      }
    }
    // send the activity as DTO model to the save function
    SaveActivity({
      name: selectedActivity.name,
      xp: selectedActivity.xp,
      date: date,
      userId: user.id,
    });
  }

  //function that removes an activity from the user
  const RemoveActivity = () => {
    console.log(`Ta bort aktivitet ${TodaysDate()}`);
  };

  //handles the states of these elements to change the styling
  function handleClick() {
    setOnClick((prevState) => !prevState);
    setBorderRadius(onClick ? "5px" : "5px 5px 0px 0px");
  }

  return (
    <>
      <button
        style={{ borderRadius: borderRadius }}
        className="day"
        // name={props.day}
        onClick={function () {
          setExpandDay(!expandDay), handleClick();
        }}
      >
        {TodaysDate()}
        <p>3st</p>
        <img
          src={onClick ? ArrowUp : ArrowDown}
          alt="arrow"
          className="arrow"
        />
      </button>

      {expandDay && (
        <div id="dayContent">
          <p className="activitySummary">Aktivitet för {TodaysDate()}</p>

          {userActivities && userActivities?.length > 0 ? (
            userActivities?.map((activity) => {
              const activityDate = activity.date.split("T")[0];
              return activityDate === convertedDate ? (
                <p className="activity" key={activity.id}>
                  Idag är det ❤️{activity.name}❤️
                </p>
              ) : null;
            })
          ) : (
            <p>No activities found</p>
          )}

          <div className="buttonContainer">
            <button className="addButton" onClick={AddActivity}>
              +
            </button>
            {isClicked && (
              <form onSubmit={handleSubmit}>
                <select onChange={handleChange}>
                  <option value="" disabled>
                    Select an activity
                  </option>
                  {activities.map((activity) => (
                    <option
                      key={activity.id}
                      value={activity.id}
                      name={activity}
                    >
                      {activity.name}
                    </option>
                  ))}
                </select>
                <button type="submit">Save</button>
                {/* () => SaveActivity(isSelected) */}
              </form>
            )}

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

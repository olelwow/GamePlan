import { useEffect, useState, useContext } from "react";
import ArrowDown from "../assets/images/arrowDown.png";
import ArrowUp from "../assets/images/arrowUp.png";
import { WeekContext } from "./WeekContext";

const Day = (props) => {
  const activityList = [
    { id: 1, name: "Study", xp: 10, date: "", userId: 0 },
    { id: 2, name: "Workout", xp: 20, date: "", userId: 0 },
    { id: 3, name: "Clean Bathroom", xp: 15, date: "", userId: 0 },
  ];

  let objectifiedDay = new Date(props.day);
  let convertedDate = objectifiedDay.toISOString().split("T")[0];

  const { toggleActivity } = useContext(WeekContext);
  const [expandDay, setExpandDay] = useState(false);
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [addIsClicked, setAddIsClicked] = useState(false);
  const [removeIsClicked, setRemoveIsClicked] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState("");
  const [actCount, setActCount] = useState();
  const [isChecked, setIsChecked] = useState(false);

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
  const fetchActivities = async () => {
    const response = await fetch(
      `https://localhost:7136/api/users/${props.user}/activities`
    );

    const data = await response.json();
    const todayActivities = data.filter(
      (activity) =>
        new Date(activity.date).toDateString() === props.day.toDateString()
    );
    setActivities(todayActivities);
  };

  useEffect(() => {
    fetchActivities();
  }, [props.user, props.day]);

  useEffect(() => {
    if (expandDay) {
      setActivities(activityList);
    }
  }, [expandDay]);

  // function that toggles the activity to completed or not
  // abd updates the xp of the user and the activity status in the database

  // const toggleActivity = async (activity) => {
  //   setIsChecked((prevState) => !prevState);
  //   activity.completed = isChecked;
  //   const activityXp = activity.completed && activity.xp;

  //   const updatedActivity = {
  //     ...activity,
  //     completed: activity.completed,
  //     date: activity.date,
  //   };
  //   await fetch(`https://localhost:7136/api/activities/${activity.id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedActivity),
  //   });

  //   if (activityXp > 0) {
  //     const res = await fetch(
  //       `https://localhost:7136/api/users/${props.user}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ xp: activityXp }),
  //       }
  //     );
  //     if (res.ok) {
  //       console.log("xp updated");
  //     } else {
  //       console.log("error updating xp");
  //     }
  //   }
  //   setActivities(
  //     activities.map((a) => (a.id === activity.id ? updatedActivity : a))
  //   );
  // };

  // useeffect for fetching things on load
  useEffect(() => {
    const fetchData = async () => {
      getDaysActivities();
      await getUser();
    };
    fetchData();
  }, [props.day]);

  // gets the current logged in user
  async function getUser() {
    try {
      const response = await fetch(
        `https://localhost:7136/api/users/${props.user}/activities`
      );
      const responseData = await response.json();
      const person = await fetch("https://localhost:7136/api/users/1");
      const userData = await person.json();
      setUserActivities(responseData);
      setUser(userData);
    } catch (error) {
      console.log(error);
    }
  }

  // handles the click on the add activity button
  const AddActivity = () => {
    setAddIsClicked((prevState) => !prevState);
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
  function handleAddChange(event) {
    setSelectedActivityId(event.target.value);
  }

  //function that handles the submit of the
  //form and saves the activity to the user
  function handleAddSubmit(event) {
    event.preventDefault();
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
      date: props.day,
      userId: user.id,
    });
  }

  // function that saves the selected option to the state
  function handleRemoveChange(event) {
    setSelectedActivityId(event.target.value);
  }

  //function that expands the activity list
  const RemoveActivity = () => {
    setRemoveIsClicked((prevState) => !prevState);
  };

  //function that removes an activity from the user
  async function handleRemoveSubmit(event) {
    event.preventDefault();
    const response = await fetch(
      `https://localhost:7136/api/activities/${selectedActivityId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedActivityId }),
      }
    );
    if (!response.ok) {
      console.log("Error when removing activity");
    } else {
      console.log("Activity removed");
    }
    const res = await fetch("https://localhost:7136/api/users/1/activities");
    if (!res.ok) {
      SaveActivity({
        name: "empty",
        xp: 0,
        date: props.day,
        userId: 3,
      });
    }
  }

  //handles the states of these elements to change the styling
  function handleClick() {
    setOnClick((prevState) => !prevState);
    setBorderRadius(onClick ? "5px" : "5px 5px 0px 0px");
  }
  // fetching the activities for the day from the respective user state
  function getDaysActivities() {
    try {
      const res = userActivities?.filter((activity) => {
        return activity.date.split("T")[0] === convertedDate;
      });
      setActCount(res.length);
    } catch (error) {
      console.log(error.message);
    }
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
        <p>{actCount} aktiviteter</p>
        <img
          src={onClick ? ArrowUp : ArrowDown}
          alt="arrow"
          className="arrow"
        />
      </button>

      {expandDay && (
        <div id="dayContent">
          {userActivities && userActivities?.length > 0 ? (
            userActivities?.map((activity) => {
              const activityDate = activity.date.split("T")[0];
              return activityDate === convertedDate ? (
                <div className="activity" key={activity.id}>
                  <p key={activity.id}>Idag är det {activity.name}</p>
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={activity.completed}
                    value={isChecked}
                    onClick={(e) => e.preventDefault()}
                    // {isChecked}
                    onChange={() =>
                      toggleActivity(
                        activity,
                        [isChecked, setIsChecked],
                        [activities, setActivities],
                        props
                      )
                    }
                  />
                  <p className="xpAmount"> XP: {activity.xp}</p>
                </div>
              ) : null;
            })
          ) : (
            <p>No activities found</p>
          )}
          <div className="buttonContainer">
            <button className="addButton" onClick={AddActivity}>
              {" "}
              +
            </button>
            {addIsClicked && (
              <form onSubmit={handleAddSubmit}>
                <select onChange={handleAddChange}>
                  <option value="0">Select activity</option>
                  {activities.map((activity) => (
                    <option
                      key={activity.id}
                      value={activity.id}
                      name={activity}
                    >
                      {activity.name} {activity.xp} XP{" "}
                    </option>
                  ))}
                </select>
                <button type="submit">Save</button>
              </form>
            )}

            {activities && (
              <button className="removeButton" onClick={RemoveActivity}>
                {" "}
                -
              </button>
            )}
            {removeIsClicked && (
              <form onSubmit={handleRemoveSubmit}>
                <select onChange={handleRemoveChange}>
                  <option value="0">Select activity</option>
                  {userActivities.map(
                    (activity) =>
                      activity.xp !== 0 &&
                      activity.date.split("T")[0] === convertedDate && (
                        <option
                          key={activity.id}
                          value={activity.id}
                          name={activity}
                        >
                          {activity.name} {activity.xp} XP{" "}
                          {activity.date.split("T")[0]}
                        </option>
                      )
                  )}
                </select>
                <button type="submit">Save</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Day;

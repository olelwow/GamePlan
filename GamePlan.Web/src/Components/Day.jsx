import { useEffect, useState } from "react";
import ArrowDown from "../assets/images/arrowDown.png";
import ArrowUp from "../assets/images/arrowUp.png";

const Day = (props) => {
  const activityList = [
    { id: 1, name: "Study", xp: 10, date: "", userId: 0 },
    { id: 2, name: "Workout", xp: 20, date: "", userId: 0 },
    { id: 3, name: "Clean Bathroom", xp: 15, date: "", userId: 0 },
  ];

  let objectifiedDay = new Date(props.day);
  let convertedDate = objectifiedDay.toISOString().split("T")[0];

  const [expandDay, setExpandDay] = useState(false);
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [addIsClicked, setAddIsClicked] = useState(false);
  const [removeIsClicked, setRemoveIsClicked] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState("");
  const [actCount, setActCount] = useState();

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
      setActivities(activityList);
      // const fetchActivities = async () => {
      //   const response = await fetch("https://localhost:7136/api/activities/");
      //   const data = await response.json();
      //   if (expandedDay) {
      //     setActivities(data);
      //   }
      // };
      // fetchActivities();
    }
    return () => {
      expandedDay = false;
    };
  }, [expandDay]);

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
        "https://localhost:7136/api/users/3/activities"
      );
      const responseData = await response.json();
      const person = await fetch("https://localhost:7136/api/users/3");
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
    const res = await fetch("https://localhost:7136/api/users/3/activities");
    if (!res.ok) {
      SaveActivity({
        name: "",
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
        onClick={function () {
          setExpandDay(!expandDay), handleClick();
        }}
      >
        {TodaysDate()}
        <p>{actCount}</p>
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
                  {userActivities.map((activity) => (
                    <option
                      key={activity.id}
                      value={activity.id}
                      name={activity}
                    >
                      {activity.name} {activity.xp} XP{" "}
                      {activity.date.split("T")[0]}
                    </option>
                  ))}
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

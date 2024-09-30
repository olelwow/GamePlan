import { useEffect, useState } from "react";
import ArrowDown from "../assets/images/arrowDown.png";
import ArrowUp from "../assets/images/arrowUp.png";
import { Button, Image, View, Text, StyleSheet } from "react-native";

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
  };

  const [onPress, setOnPress] = useState(false);
  const [borderRadius, setBorderRadius] = useState("5px");

  function handleClick() {
    setOnPress((prevState) => !prevState);
    setBorderRadius(onPress ? "5px" : "5px 5px 0px 0px");
  }

  return (
    <>
      <Button
        style={{ borderRadius: borderRadius }}
        className="day"
        onPress={function () {
          setExpandDay(!expandDay), handleClick();
        }}
        title={TodaysDate()}
      >
        <View>
          <Text>3st</Text>
          <Image
            source={onPress ? ArrowUp : ArrowDown}
            alt="arrow"
            styles ={style.arrow}
          />
        </View>
      </Button>

      {expandDay && (
        <View id="dayContent">
          <Text className="activitySummary">Aktivitet för {TodaysDate()}</Text>
          {dayWednesday &&
            activities.find((activity) => activity.name === "Study") && (
              <Text>Idag är det Study</Text>
            )}
          {daySaturday &&
            activities.find((activity) => activity.name === "Gym") && (
              <Text>Idag är det Gym</Text>
            )}
          <View className="ButtonContainer">
            <Button className="addButton" onPress={AddActivity} title=" +" />
            {activities && (
              <Button
                className="removeButton"
                onPress={RemoveActivity}
                title=" -"
              />
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default Day;

const style = StyleSheet.create({
  day: {

  },
});
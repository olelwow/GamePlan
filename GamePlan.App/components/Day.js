import { useEffect, useState } from "react";
import ArrowDown from "../assets/images/arrowDown.png";
import ArrowUp from "../assets/images/arrowUp.png";
import { Image, View, Text, StyleSheet, Pressable } from "react-native";

const Day = (props) => {
  const [expandDay, setExpandDay] = useState(false);
  const [activities, setActivities] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [yo, setYo] = useState(false);

  const TodaysDate = () => {
    const todaysDate = props.day.toLocaleDateString("sv-SE", {
      weekday: "long",
      day: "numeric",
      month: "numeric",
    });
    return todaysDate;
  };

  //useeffect to fetch activities and display them when the
  //day is expanded and wanting to add activity to that day, show as a list or something.
  useEffect(() => {
    let expandedDay = true;
    if (expandDay) {
      const fetchActivities = async () => {
        const response = await fetch(
          `http://192.168.50.149:7136/api/users/1/activities`
        );
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
    setExpandDay((prevExpand) => !prevExpand);
  }

  return (
    <>
      <Pressable
        style={[styles.day, expandDay ? styles.expandedDay : null]}
        onPress={handleClick}
      >
        <View style={styles.header}>
          <Text>{TodaysDate()}</Text>
          <Image
            source={expandDay ? ArrowUp : ArrowDown}
            alt="arrow"
            styles={styles.arrow}
          />
        </View>
      </Pressable>

      {expandDay && (
        <View style={styles.dayContent}>
          <Text style={styles.activitySummary}>
            Aktivitet för {TodaysDate()}
          </Text>
          {dayWednesday &&
            activities.find((activity) => activity.name === "Study") && (
              <Text>Idag är det Study</Text>
            )}
          {daySaturday &&
            activities.find((activity) => activity.name === "Gym") && (
              <Text>Idag är det Gym</Text>
            )}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.addButton} onPress={AddActivity}>
              <Text> + </Text>
            </Pressable>
            {activities.length > 0 && (
              <Pressable style={styles.removeButton} onPress={RemoveActivity}>
                <Text> - </Text>
              </Pressable>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default Day;

const styles = StyleSheet.create({
  day: {
    backgroundColor: "gray",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    overflow: "hidden",
  },
  expandedDay: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrow: {
    width: 20,
    height: 20,
  },
  dayContent: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  activitySummary: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
  },
  removeButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
  },
});

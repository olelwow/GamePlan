import Day from "./Day";
import { View } from "react-native";
import { WeekContext } from "../context/WeekContext";
import { useContext } from "react";

const Week = () => {
  const { weekDays } = useContext(WeekContext);

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekDays[i]);
    dates.push(date);
  }

  return (
    <View className="weekday">
      {dates.map((day, index) => (
        <Day key={index} day={day} />
      ))}
    </View>
  );
};

export default Week;

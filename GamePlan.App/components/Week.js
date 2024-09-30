import Day from "./Day";
import { View } from "react-native";
import { WeekContext } from "../context/WeekContext";
import { useContext } from "react";

const Week = () => {
  const { weekDays } = useContext(WeekContext);

  return (
    <View className="weekday">
      {weekDays.map((day, index) => (
        <Day key={index} day={day} />
      ))}
    </View>
  );
};

export default Week;

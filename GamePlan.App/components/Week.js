import Day from "./Day";
import { View, StyleSheet } from "react-native";
import { WeekContext } from "../context/WeekContext";
import { useContext } from "react";

const Week = () => {
  const { weekDays } = useContext(WeekContext);

  return (
    <View style={styles.weekday}>
      {weekDays.map((day, index) => (
        <Day key={index} day={day} />
      ))}
    </View>
  );
};

export default Week;

const styles = StyleSheet.create({
  weekday: {
    backgroundColor: 'lightgray',
    width: '95%',
  },
});
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navbar from "./components/Navbar";
import Week from "./components/Week";
import WeekProvider from "./context/WeekContext";

export default function App() {
  return (
    <WeekProvider>
      <View style={styles.container}>
        <Navbar />
        <Week />
        <StatusBar style="auto" />
      </View>
    </WeekProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "bisque",
    alignItems: "center",
    justifyContent: "center",
  },
});

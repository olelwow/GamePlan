import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navbar from "./components/Navbar";
import Week from "./components/Week";

export default function App() {
  return (
    <View style={styles.container}>
      <Navbar />
      <Week />
      <StatusBar style="auto" />
    </View>
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

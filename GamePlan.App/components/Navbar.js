import UserMenu from "./UserMenu";
// import BurgerMenu from "./BurgerMenu";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Button,
  SafeAreaView,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { WeekContext } from "../context/WeekContext";

const Navbar = () => {
  const [goalXp, setGoalXp] = useState(200);
  const [user, setUser] = useState({});
  const { weekNumber, increaseWeekNumber, decreaseWeekNumber, month } =
    useContext(WeekContext);

  // Get user object from api
  const getUser = async () => {
    const res = await fetch("http://192.168.50.149:7136/api/users/1");
    const data = await res.json();
    console.log("user data: ", data);

    setUser(data);
  };

  useEffect(() => {
    getUser();
    console.log("using effect");
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.navbar}>
        <ImageBackground
          source={require("../assets/images/Background_main.png")}
          style={styles.navbarBackground}
        >
          <View style={styles.navbarLeft}></View>
          <View style={styles.navbarCenter}>
            <Text style={styles.viewMonth}>{month}</Text>
            <View style={styles.weekNumberView}>
              <Button
                style={styles.weekNumberButton}
                title="-"
                onPress={decreaseWeekNumber}
              ></Button>
              <Text style={styles.weekNumberText}>Vecka {weekNumber}</Text>
              <Button
                style={styles.weekNumberButton}
                title="+"
                onPress={increaseWeekNumber}
              ></Button>
            </View>
            <View className="goal" style={xpBar(user.xp / 2)}>
              <Text>
                Veckans mål: {user.xp}/{goalXp}
              </Text>
            </View>
          </View>
          <View style={styles.navbarRight}>
            <UserMenu {...user} />
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

// const xpBar = (percentage) => ({
//     backgroundColor: "rgb(255, 255, 255)",
//     backgroundImage: `linear-gradient(to right, rgb(43, 255, 0) ${percentage}%, rgba(0, 0, 0, 0) ${percentage}%)`,
// });

const xpBar = (percentage) => ({
  alignItems: "center",
  backgroundImage: `linear-gradient(to right, rgb(43, 255, 0) ${percentage}%, rgba(0, 0, 0, 0) ${percentage}%)`,
  backgroundColor: "rgb(255, 255, 255)",
  width: "100%",
  borderRadius: 5,
});

export default Navbar;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "18%",
  },
  navbar: {
    flex: 1,
  },
  navbarBackground: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  navbarLeft: {
    flex: 1,
    gap: 1,
  },
  navbarCenter: {
    gap: 7,
    flex: 2,
    alignItems: "center",
  },
  viewMonth: {
    fontSize: 18,
    fontWeight: "bold",
  },
  goal: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 5,
    height: 10,
    overflow: "hidden",
  },
  navbarRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  weekNumberView: {
    display: "flex",
    flexDirection: "row",
    margin: 1,
    alignItems: "center",
  },
  weekNumberText: {
    margin: 1,
  },
  weekNumberButton: {
    backgroundColor: "rgb(71,134,136)",
    height: 0.5,
    aspectRatio: 1,
  },
});

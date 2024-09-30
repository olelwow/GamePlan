import UserMenu from "./UserMenu";
// import BurgerMenu from "./BurgerMenu";
import { Text, View, Image, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [goalXp, setGoalXp] = useState(200);
    const [user, setUser] = useState({});

    const viewMonth = () => {
        const date = new Date();
        const month = date.toLocaleString("default", { month: "long" });
        return month;
    };

    // Get user object from api
    const getUser = async () => {
        const res = await fetch("https://localhost:7136/api/users/3");
        const data = await res.json();

        setUser(data);
    };

    useEffect(() => {
        getUser();
        console.log("using effect");
    }, []);

    return (
        <View className="navbar">
            <View className="navbarLeft">
                {/* <BurgerMenu /> */}
            </View>
            <View className="navbarCenter">
                <Text className="viewMonth">{viewMonth()}</Text>
                <View className="goal" style={xpBar(user.xp / 2)}>
                    <Text>
                        Weekly goal: {user.xp}/{goalXp}
                    </Text>
                </View>
            </View>
            <View className="navbarRight">
                <UserMenu {...user} />
            </View>
        </View>
    );
};

const xpBar = (percentage) => ({
    backgroundColor: "rgb(255, 255, 255)",
    backgroundImage: `linear-gradient(to right, rgb(43, 255, 0) ${percentage}%, rgba(0, 0, 0, 0) ${percentage}%)`,
});

export default Navbar;
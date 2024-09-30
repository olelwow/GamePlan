import UserMenu from "./UserMenu";
// import BurgerMenu from "./BurgerMenu";
import { Text, View, Image, StyleSheet, ImageBackground } from 'react-native';
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
        <View style={styles.navbar}>
            <ImageBackground
                source={require('../assets/images/Background_main.png')}
                style={styles.navbarBackground}
            >
            <View style={styles.navbarLeft}>
                {/* <BurgerMenu /> */}
            </View>
            <View style={styles.navbarCenter}>
                <Text style={styles.viewMonth}>{viewMonth()}</Text>
                <View className="goal" style={xpBar(user.xp / 2)}>
                    <Text>
                        Weekly goal: {user.xp}/{goalXp}
                    </Text>
                </View>
            </View>
            <View style={styles.navbarRight}>
                <UserMenu {...user} />
            </View>

            </ImageBackground>
        </View>
    );
};

// const xpBar = (percentage) => ({
//     backgroundColor: "rgb(255, 255, 255)",
//     backgroundImage: `linear-gradient(to right, rgb(43, 255, 0) ${percentage}%, rgba(0, 0, 0, 0) ${percentage}%)`,
// });

const xpBar = (percentage) => ({
    backgroundColor: 'rgb(43, 255, 0)',
    width: `${percentage}%`,
    borderRadius: 5,
});

export default Navbar;

const styles = StyleSheet.create({
    navbar: {
        position: 'absolute', 
        top: 0,
        left: 0,
        right: 0,
        height: '15%',
    },
    navbarBackground: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    navbarLeft: {
        flex: 1,
    },
    navbarCenter: {
        flex: 2,
        alignItems: 'center',
    },
    viewMonth: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    goal: {
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)', 
        borderRadius: 5,
        height: 10,
        overflow: 'hidden', 
    },
    navbarRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
});
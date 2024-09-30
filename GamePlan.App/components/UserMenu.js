import { FlatList, SectionList } from "react-native-web";
import { Text, Image, View } from "react-native";
import { useState } from "react";
import fishSteer from "../assets/images/fishSteer.gif";
import levelIcon from "../assets/images/levelIcon.png";
import experienceIcon from "../assets/images/experienceIcon.png";



const UserMenu = (props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const menuOptions = ["User Settings", "Log out", "Whatever"];

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    return (
        <View className="userContainer">
            {isDropdownOpen ? (
                <View className="userDropdown">
                    <View className="userInfo">
                        <Image
                            source={fishSteer}
                            alt="user icon"
                            className="userImg"
                            onClick={toggleDropdown}
                        />
                        <Text>{props.userName}</Text>
                        <View className="userDetails">
                            <View className="userLevel">
                                <Image className="levelIcon" source={levelIcon} alt="level" />
                                <Text className="userH3">{props.level}</Text>
                            </View>
                            <View className="userXp">
                                <Image className="xpIcon" source={experienceIcon} alt="experience" />
                                <Text className="userH3">{props.xp}</Text>
                            </View>
                        </View>
                    </View>
                    <SectionList className="dropdownList">
                        {menuOptions.map((item) => (
                            <View className="dropdownItem" key={item}>
                                <Text>{item}</Text>
                            </View>
                        ))}
                    </SectionList>
                </View>
            ) : (
                <Image
                    source={fishSteer}
                    alt="user icon"
                    className="userImg"
                    onClick={toggleDropdown}
                />
            )}
        </View>
    );
};
export default UserMenu;
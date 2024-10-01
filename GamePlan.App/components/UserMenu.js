import { Text, Image, View, FlatList, SectionList, StyleSheet, TouchableOpacity } from "react-native";
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
    <View style={styles.userContainer}>
      {isDropdownOpen ? (
        <View style={styles.userDropdown}>
          <View style={styles.userInfo}>
            <TouchableOpacity onPress={toggleDropdown}>

            <Image
              source={fishSteer}
              alt="user icon"
              style={styles.userImg}
              
              />
              </TouchableOpacity>
            <Text>{props.userName}</Text>
            <View style={styles.userDetails}>
              <View style={styles.userLevel}>
                <Image style={styles.levelIcon} 
                source={levelIcon} 
                alt="level" 
                />
                <Text style={styles.userH3}>{props.level}</Text>
              </View>
              <View style={styles.userXp}>
                <Image
                  // style={xpIcon}
                  source={experienceIcon}
                  alt="experience"
                />
                <Text style={styles.userH3}>{props.xp}</Text>
              </View>
            </View>
          </View>
          <View style={styles.dropdownList}>
            {menuOptions.map((item) => (
              <View 
              // style={dropdownItem} 
              key={item}>
                <Text>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <TouchableOpacity onPress={toggleDropdown}>
            <Image
              source={fishSteer}
              alt="user icon"
              style={styles.userImg}
              />
              </TouchableOpacity>
      )}
    </View>
  );
};
export default UserMenu;

const styles = StyleSheet.create({
  userContainer: {
    flex:1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  userImg: {
    position: 'relative',
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
  },
  userInfo: {
    textAlign: 'center',
  },
  userDetails: {
    flex: 1,
  },
  userDropdown: {
  },
  hr: {
    
  },
  userH3: {

  },
  dropdownList: {

  },
  dropdownItem: {

  },


  
});

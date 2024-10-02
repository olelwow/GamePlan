import fishSteer from "../../assets/images/fishSteer.gif";
import levelIcon from "../../assets/images/levelUpIcon.png";
import experienceIcon from "../../assets/images/XPicon1.png";
import { useState } from "react";

const UserMenu = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuOptions = ["Inställningar", "Logga ut", "Whatever"];

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="userContainer">
      {isDropdownOpen ? (
        <div className="userDropdown">
          <div className="userInfo">
            <img
              src={fishSteer}
              alt="user icon"
              className="userImg"
              onClick={toggleDropdown}
            />
            <h3>{props.userName}</h3>
            <hr />
            <div className="userDetails">
              <div className="userLevel">
                <img className="levelIcon" src={levelIcon} alt="level" />
                <h3 className="userH3">{props.level}</h3>
              </div>
              <hr />
              <div className="userXp">
                <img className="xpIcon" src={experienceIcon} alt="experience" />
                <h3 className="userH3">{props.xp}</h3>
              </div>
            </div>
          </div>
          <hr />
          <ul className="dropdownList">
            {menuOptions.map((item) => (
              <li className="dropdownItem" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <img
          src={fishSteer}
          alt="user icon"
          className="userImg"
          onClick={toggleDropdown}
        />
      )}
    </div>
  );
};
export default UserMenu;

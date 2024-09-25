import fishSteer from "../../assets/images/fishSteer.gif";
import { useState } from "react";

const UserMenu = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuOptions = ["User Settings", "Log out", "Whatever"];

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="userContainer">
      <img
        src={fishSteer}
        alt="user icon"
        className="userImg"
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div className="userDropdown">
          {menuOptions.map((item) => (
            <div className="dropdownItem" key={item}>
              {item}
            </div>
          ))}
        </div>
      )}
      <h3 className="userXp">
        {props.userName}s XP: {props.xp}
      </h3>
    </div>
  );
};
export default UserMenu;

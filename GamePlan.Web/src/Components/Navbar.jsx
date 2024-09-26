import { useState, useEffect } from "react";
import UserMenu from "./NavbarComponents/UserMenu";
import BurgerMenu from "./NavbarComponents/BurgerMenu";
import NavbarBackground from "../assets/images/Background_main.png";

const Navbar = () => {
  const [goalXp, setGoalXp] = useState(100);
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
    <nav className="navbar">
      <div className="navbarLeft">
        <BurgerMenu />
      </div>
      <div className="navbarCenter">
        <h2 className="viewMonth">{viewMonth()}</h2>
        <h4 className="goalXp">Goal XP: {goalXp}</h4>
      </div>
      <div className="navbarRight">
        <UserMenu {...user} />
      </div>
    </nav>
  );
};
export default Navbar;

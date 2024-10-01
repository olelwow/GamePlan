import { useState, useEffect } from "react";
import UserMenu from "./NavbarComponents/UserMenu";
import BurgerMenu from "./NavbarComponents/BurgerMenu";
import NavbarBackground from "../assets/images/Background_main.png";

const Navbar = (props) => {
  const [goalXp, setGoalXp] = useState(200);
  const [user, setUser] = useState({});

  const viewMonth = () => {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    return month;
  };

  // Get user object from api
  const getUser = async () => {
    const res = await fetch(`https://localhost:7136/api/users/${props.user}`);
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
        <div className="goal" style={xpBar(user.xp / 2)}>
          <p>
            Weekly goal: {user.xp}/{goalXp}
          </p>
        </div>
      </div>
      <div className="navbarRight">
        <UserMenu {...user} />
      </div>
    </nav>
  );
};

const xpBar = (percentage) => ({
  backgroundColor: "rgb(255, 255, 255)",
  backgroundImage: `linear-gradient(to right, rgb(43, 255, 0) ${percentage}%, rgba(0, 0, 0, 0) ${percentage}%)`,
});

export default Navbar;

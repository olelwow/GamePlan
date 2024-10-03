import { useState, useEffect, useContext } from "react";
import UserMenu from "./NavbarComponents/UserMenu";
import NavbarBackground from "../assets/images/Background_main.png";
import Week from "./Week";
import { WeekProvider, WeekContext } from "./WeekContext";

const Navbar = (props) => {
  const [goalXp, setGoalXp] = useState(200);
  const [user, setUser] = useState({});
  const {
    weekNumber,
    increaseWeekNumber,
    decreaseWeekNumber,
    month,
    setMonth,
    toggleActivity,
    nikos,
  } = useContext(WeekContext);

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
    user.xp = nikos.xp;
  }, [toggleActivity]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbarLeft">{/* <BurgerMenu /> */}</div>
      <div className="navbarCenter">
        <h2 className="viewMonth">{month}</h2>
        <div className="navbarWeeks">
          <button className="btn-weekNumber" onClick={decreaseWeekNumber}>
            Föreg.
          </button>
          <button className="btn-weekNumber" onClick={decreaseWeekNumber}>
            Föreg.
          </button>
          <span className="weekNumber"> Vecka {weekNumber}</span>
          <button className="btn-weekNumber" onClick={increaseWeekNumber}>
            Nästa
          </button>
          <button className="btn-weekNumber" onClick={increaseWeekNumber}>
            Nästa
          </button>
        </div>
        <div className="goal" style={xpBar(user.xp / 2)}>
          <p>
            Veckans mål: {user.xp}/{goalXp}
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

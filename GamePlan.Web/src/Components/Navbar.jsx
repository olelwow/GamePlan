import { useState, useEffect } from "react";
import UserMenu from "./NavbarComponents/UserMenu";
import BurgerMenu from "./NavbarComponents/BurgerMenu";
import NavbarBackground from "../assets/images/Background_main.png";

const Navbar = () => {
  const [goalXp, setGoalXp] = useState(200);
  const [user, setUser] = useState({});
  const [weekNumber, setWeekNumber] = useState(null);

  const viewMonth = () => {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    return month;
  };

  const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return [d.getFullYear(), weekNo];
  }

  const handleNextWeek = () => {
    setWeekNumber(prevWeek => prevWeek + 1);
  };

  const handlePrevWeek = () => {
    setWeekNumber(prevWeek => prevWeek - 1);
  };

  // Get user object from api
  const getUser = async () => {
    const res = await fetch("https://localhost:7136/api/users/3");
    const data = await res.json();

    setUser(data);
  };

  useEffect(() => {
    getUser();
    const date = new Date();
    const [year, week] = getWeekNumber(date);
    setWeekNumber(week);
    console.log("using effect");
  }, []);

  return (
    <nav className="navbar">
      <div className="navbarLeft">
        <BurgerMenu />
      </div>
      <div className="navbarCenter">
        <h2 className="viewMonth">{viewMonth()}</h2>
        <h2 className="viewWeek">{weekNumber}</h2>
        <button onClick={handlePrevWeek}>Prev</button>
        <button onClick={handleNextWeek}>Next</button>
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

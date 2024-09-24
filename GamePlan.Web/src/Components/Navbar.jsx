import { useState } from "react";

const Navbar = () => {
    const viewMonth = () => {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        return month;
    }
    const [userXp, setUserXp] = useState(0);
    const [goalXp, setGoalXp] = useState(100);

console.log(setGoalXp, setUserXp);

    return (
        <nav className="navbar">
            <h2 className="viewMonth">{viewMonth()}</h2>
            <h3 className="userXp">User XP: {userXp}</h3>
            <h4 className="goalXp">Goal XP: {goalXp}</h4>
        </nav>

    );

}
export default Navbar;


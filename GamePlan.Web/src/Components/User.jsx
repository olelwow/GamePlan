import { useState } from "react";

const host = "https://localhost:7136/";
let data = {};
const User = () => {

    const [user, setUser] = useState({})

    async function handleClick() {
        const res = await fetch (`${host}api/users/${1}`)
        data = await res.json()
        setUser(prevUser => prevUser = data)
    }

    return <div>
            <button onClick={handleClick}>Get User</button>
            <p>Username: {user.userName}</p>

            <p>Xp: {user.xp}</p>
            </div>;
    };

    export default User;
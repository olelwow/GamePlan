import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Week from "./Components/Week";

function App() {
  const [user, setUser] = useState(1);

  return (
    <div className="mainPage">
      <Navbar user={user} />
      <Week user={user} />
    </div>
  );
}

export default App;

import { useState } from "react";
import { WeekProvider } from './Components/WeekContext'
import Navbar from './Components/Navbar'
import Week from './Components/Week'
import './App.css'

function App() {
  const [user, setUser] = useState(1);

  return (
    <div className='mainPage'>
      <WeekProvider>
      <Navbar user={user} />
      <Week user={user} />
      </WeekProvider>
    </div>
  );
}

export default App;

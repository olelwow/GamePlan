import { useState } from "react";
import { WeekProvider } from './Components/WeekContext'

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

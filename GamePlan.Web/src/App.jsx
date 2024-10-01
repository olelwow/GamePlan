import './App.css'
import Navbar from './Components/Navbar'
import Week from './Components/Week'
import { WeekProvider } from './Components/WeekContext'
 

function App() {

  return (
    <div className='mainPage'>
      <WeekProvider>
      <Navbar/>
      <Week/>
      </WeekProvider>
    </div>
  )
}

export default App

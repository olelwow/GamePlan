import { createContext, useState, useEffect } from 'react';
    //skapar ett context objekt som delar veckorelaterad data mellan komponenterna
    const WeekContext = createContext();
 
    const WeekProvider = ({ children }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [weekDays, setWeekDays] = useState([]);
    const [weekNumber, setWeekNumber] = useState(0);
    const [month, setMonth] = useState("");
    const [year, setYear] = useState(0);
    
    const increaseWeekNumber = () => {
        setWeekNumber((prevState) => (prevState + 1 > 52 ? 1 : prevState + 1));
    };

    const decreaseWeekNumber = () => {
        setWeekNumber((prevState) => (prevState - 1 < 1 ? 52 : prevState - 1)); 
    };
 
    const changeMonth = (weekDays) => {
        const displayedDays = weekDays.map((m) => getCurrentMonth(m));
    
        const isSameMonth = (shit) => {
          const halfLength = Math.floor(shit.length / 2);
          return shit.every((value) => value === shit[halfLength]);
        };
    
        const middleDay = displayedDays[Math.floor(displayedDays.length / 2)];
    
        if (isSameMonth(displayedDays)) {
          return middleDay;
        } else {
          return displayedDays[4];
        }
      };
//hämtar den aktuella månaden och veckan som en sträng och sätter den in i state variablen month
const getCurrentMonth = (date) => {
    let month = date.toLocaleString("default", { month: "long" });
    month = month.charAt(0).toUpperCase() + month.slice(1);

    return month;
  };
        
        const getCurrentWeek = (d) => {
            d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
            d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
            var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            var weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
            const result = [d.getUTCFullYear(), weekNumber];

            return result[1];
        };

    const getDatesOfCurrentWeek = (weekNumber, year) => {
        const firstDayOfYear = new Date(year, 0, 1);
        const dayOfWeek = firstDayOfYear.getDay();
        const firstDayOfWeek = new Date(firstDayOfYear.getTime());

        const daysOffSet =
            (weekNumber - 1) * 7 - (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
        firstDayOfWeek.setDate(firstDayOfYear.getDate() + daysOffSet);
        
        const daysOfWeek = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(firstDayOfWeek.getTime());
            date.setDate(firstDayOfWeek.getDate() + i);
            daysOfWeek.push(date);
        }
        setWeekDays(daysOfWeek);
    };
        
    //körs en gång vid start av applikationen
    useEffect(() => {
        setMonth(getCurrentMonth(new Date()));
        const currentWeek = getCurrentWeek(new Date);
        const currentYear = new Date().getFullYear();
        setWeekNumber(currentWeek);
        getDatesOfCurrentWeek(currentWeek, currentYear);
        setYear(currentYear);
    }, []);
    //körs när veckonumret ändras
    useEffect(() => {
        getDatesOfCurrentWeek(weekNumber, year);
    }, [weekNumber]);
        
    useEffect(() => {
        setMonth(changeMonth(weekDays));
      }, [weekDays]);

        return (
            <WeekContext.Provider
                value={{
                currentDate,
                setCurrentDate,
                weekNumber,
                setWeekNumber,
                month,
                weekDays,
                setWeekDays,
                setMonth,
                increaseWeekNumber,
                decreaseWeekNumber,
            }}>
                {children}
            </WeekContext.Provider>
        );
    };

export { WeekProvider, WeekContext };

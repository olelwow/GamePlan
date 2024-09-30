import React, { createContext, useState, useEffect } from 'react';

export const WeekContext = createContext();

export const WeekProvider = ({ children }) => {
    const [weekNumber, setWeekNumber] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [weekDays, setWeekDays] = useState([]);

    useEffect(() => {
        const date = new Date();
        const [year, week] = getWeekNumber(date);
        setWeekNumber(week);
        updateWeekDays();
    }, []);

    const getWeekNumber = (d) => {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
        return [d.getFullYear(), weekNo];
    }
    
    const updateWeekDays = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() - date.getDay() + i + 1);
            days.push(newDate);
        }
        setWeekDays(days);
    };

    const handleNextWeek = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + 7);
            const [year, week] = getWeekNumber(newDate);
            setWeekNumber(week);
            updateWeekDays(newDate);
            return newDate;
        });
    };

    const handlePrevWeek = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() - 7);
            const [year, week] = getWeekNumber(newDate);
            setWeekNumber(week);
            updateWeekDays(newDate);
            return newDate;
        });
    };

    return (
        <WeekContext.Provider value={{ weekNumber, weekDays, handleNextWeek, handlePrevWeek }}>
            {children}
        </WeekContext.Provider>
    );
};
import Day from "./Day";

const Week = () => {

const AddActivity = () => {
    console.log("Add activity to weekday")
}

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    return(
        <div className="weekday">
            {weekDays.map(day => (<Day day={day}/>))}
        </div>
    );
}

export default Week;
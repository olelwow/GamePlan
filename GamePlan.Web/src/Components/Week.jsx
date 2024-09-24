const Week = () => {

const AddActivity = () => {
    console.log("Add activity to weekday")
}

    return(
        <div className="weekday">
        <div>Monday {AddActivity()}</div>
        <div>Tuesday {AddActivity()}</div>
        <div>Wednesday {AddActivity()}</div>
        <div>Thursday {AddActivity()}</div>
        <div>Friday {AddActivity()}</div>
        <div>Saturday {AddActivity()}</div>
        <div>Sunday {AddActivity()}</div>
        </div>
    );
}

export default Week;
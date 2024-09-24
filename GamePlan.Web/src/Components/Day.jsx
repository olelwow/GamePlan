const Day = (props) => {

    const TodaysDate = () => {
        const date = new Date();
        const todaysDate = date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'numeric' });
        return todaysDate;
    }

    return(
        <div>{props.day} {TodaysDate()}</div>
    )
}

export default Day;
import { useState } from "react";

const AddTask = (props) => {
    const [text, setText] = useState(props.updateData?props.updateData.text:'');
    const [day, setDay] = useState(props.updateData?props.updateData.day:'');
    const [reminder, setReminder] = useState(props.updateData?props.updateData.reminder:false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!text) {
            alert('Please add a task')
            return
        }
        if (props.updateData){
            const id = props.updateData.id
            props.onUpdate ({ id, text, day, reminder });
        } else {
            props.onAdd ({ text, day, reminder });
        }

        setText('');
        setDay('');
        setReminder(false);
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label htmlFor="task">Task</label>
                <input 
                    type="text" 
                    id="task"
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                />
            </div>
            
            <div className="form-control">
                <label htmlFor="day-time">Day and Time</label>
                <input 
                    type="text" 
                    id="day-time"
                    value={day} 
                    onChange={(e) => setDay(e.target.value)}
                />
            </div>
            
            <div className="form-control form-control-check">
                <input 
                    type="checkbox" 
                    id="reminder"
                    checked={reminder}
                    value={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)} 
                />
                <label htmlFor="reminder">Set Reminder</label>
            </div>

            <input className="btn btn-block" type="submit" value="Save Task" />
        </form> 
    )
}

export default AddTask


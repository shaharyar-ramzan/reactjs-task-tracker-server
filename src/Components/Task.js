const Task = (props) => {
    return (
        <div className={`task ${props.task.reminder?'reminder':''}`} 
            onDoubleClick={() => props.dbReminder(props.task.id)}>
            <h3>
                {props.task.text}
                <small>
                    <small 
                    onClick={() => props.delClick(props.task.id)}>
                        Delete</small><br />
                    <small 
                    onClick={() => props.updateClick(props.task)}>
                        Update</small>
                </small>
            </h3>
            <p>{props.task.day}</p>
        </div>
    )
}

export default Task
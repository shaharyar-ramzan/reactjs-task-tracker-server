import Task from './Task'

const Tasks = (props) => {
    // const abc => setTasks([...tasks, {}]);

    return (
        <>
            {props.tasks.map((task) => (
                <Task key={task.id} task={task} 
                    delClick={props.delClicks} 
                    updateClick={props.updateClicks}
                    dbReminder={props.dbReminders} />
            ))}
        </>
    )
}


export default Tasks
import './App.css';
import React , {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Tasks from './Components/Tasks';
import AddTask from './Components/AddTask';
import Footer from './Components/Footer';
import About from './Components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [updateData, setUpdateData] = useState();

  const [tasks, setTasks] = useState([
    /*{
        "id": 1,
        "text": "Doctors Appointment",
        "day": "Feb 5th at 2:30pm",
        "reminder": true
    },
    {
        "id": 2,
        "text": "Meeting at School",
        "day": "Feb 6th at 1:30pm",
        "reminder": true
    },
    {
        "id": 3,
        "text": "Meeting 2 at School",
        "day": "Feb 6th at 2:30pm",
        "reminder": false
    }*/
  ])

  
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks (tasksFromServer);
    }
    getTasks();
  }, []); 
  
  const fetchTasks = async () => {
    const result = await fetch ('http://localhost:5000/tasks')
    const data = await result.json();
    return data;
  }
  
  const fetchTask = async (id) => {
    const result = await fetch (`http://localhost:5000/tasks/${id}`)
    const data = await result.json();
    return data;
  }
  
  // Add Tasks
  const addTask = async (task) => {
    const res = await fetch (`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await res.json();

    setTasks ([...tasks, data]);
    
    /*const id = Math.floor(Math.random() * 10000) + 1;
    const NewTask = { id, ...task};
    setTasks([...tasks, NewTask]);*/
  }

  // Update Task
  const updateTask = async (data) => {
    
    const taskToUpdate = await fetchTask(data.id)
    const updTask = {...taskToUpdate, id: data.id, text: data.text, day: data.day, reminder: data.reminder }

    const res = await fetch (`http://localhost:5000/tasks/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    });
    const resData = await res.json();

    //console.log(taskToUpdate,updTask,resData);
    
    setTasks(
      tasks.map((task) => 
        task.id === resData.id ? { ...task, text: resData.text, day: resData.day, reminder: resData.reminder } : task
      )
    );
    setShowAddTask(false);
  }
  
  // Update Task data in form
  const updateSet = (task) => {
    setShowAddTask(false);
    setUpdateData(task);
    //setTasks(tasks.filter((task) => task.id !== id));
    setTimeout(function(){
      setShowAddTask(true);
    }, 0);
  }

  // Delete Tasks
  const deleteTask = async (id) => {
    await fetch (`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch (`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    });
    const data = await res.json();

    setTasks(
      tasks.map((task) => 
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  }

  return (
    <Router>
      <div className="container">

        <Header onAdd={() => setShowAddTask(!showAddTask)} showForm={showAddTask} />
        
      <Routes>
        <Route path='/about' exact element={<About/>} ></Route>
        <Route path='/' exact element={
          <>
            {showAddTask && <AddTask 
              onAdd={addTask} 
              onUpdate={updateTask}
              updateData={updateData} />}
            {/* {showAddTask ? <AddTask onAdd={addTask} /> : ''} */}

            {tasks.length > 0 ? 
              (<Tasks tasks={tasks} 
                updateClicks={updateSet} 
                delClicks={deleteTask} 
                dbReminders={toggleReminder} 
                />) : ( 'No Tasks Found.' )
            }
          </>
        }></Route>

        </Routes>

        <Footer />
        
      </div>

    </Router>
  )
}


export default App;

import { useEffect, useState } from "react";
import { Button } from '@mui/material'
import { Link } from "react-router-dom"

function ToDoList() {

  const [ tasks, setTasks ] = useState([])

  useEffect(() => {
    let URL = "http://localhost:5001/tasks"
    fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      setTasks(data)
    })
    .catch((err => console.error("we have an Error", err)))
  }, [])

  return (
    <>
    <div style={{ padding: "20px" }}>
        <h1> To do app</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title} - {task.completed ? "✅" : "❌"}
            </li>
          ))}
        </ul>
    </div>

  <div>
      <Link to="/new-todo">
        <Button variant="contained" color="primary">
          Add new todo
        </Button>
      </Link>
    </div>
  </>

  );
}

export default ToDoList;

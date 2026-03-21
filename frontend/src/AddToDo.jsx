
import { useState } from "react"
import { TextField, Button } from '@mui/material'


const AddToDo = () => {

  const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:5001/tasks", {
        method: 'POST',
        headers: {
        "Content-Type": "application/json", // tell backend it’s JSON
      },
      body: JSON.stringify({ title }),
      })

      const newTask = response.json()
      console.log(newTask)
      setTitle("")

    } catch (err) {
      console.error('Error posting todo', err)
    }
    
    }





  return (
    <>
    <div>
      <TextField
        required
        variant = "outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    
    <div>
      <Button
        variant="contained"
        onClick={handleSubmit}
      >
        Add todo
      </Button>
    </div>




    </div>
    </>
  )





}

export default AddToDo
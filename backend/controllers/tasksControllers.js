const pool = require("../models/db")

const getTasks = async(req,res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC")
    res.status(200).json(result.rows)
  }
  catch(err) {
    console.log('err', err)
    res.status(500).json({ error: 'database error'})
  }
} 

const createTask = async (req, res) => {
  try {
    const { title } = req.body

    const result = await pool.query(
      "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
      [title]
    )

    console.log("Inserted task:", result.rows[0]) // debug

    // **Send JSON response to the client**
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error("POST /tasks error:", err)
    res.status(500).json({ error: err.message })
  }
}

const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const { title, completed } =  req.body
    
    const result = await pool.query(
        "UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *",
      [title, completed, id]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error("PUT tasks error", err)
    res.status(500).json({ error: err.message})
  }
}

const deleteTask = async (req,res) => {
  try {
    const { id } = req.params
    
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.json({ message: "Task deleted", task: result.rows[0] })
  }
  catch (err) {
    console.error('DELETE tasks error', err)
    res.status(500).json({ error: err.message })
  }
}


module.exports = { getTasks, createTask, updateTask, deleteTask }
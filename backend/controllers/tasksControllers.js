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

module.exports = { getTasks, createTask }
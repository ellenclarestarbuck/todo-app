const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()
const port = 5001

app.use(cors())
app.use(express.json())

// Import and use routes
const tasksRoutes = require("./routes/tasks")
app.use("/tasks", tasksRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
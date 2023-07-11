const path = require("path")
const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv").config()
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")
const path = require("path");
const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname,'./frontend/build')))

// Routes
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/tickets", require("./routes/ticketRoutes"))


app.use('*',(req,res) => {
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

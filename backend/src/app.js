const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const { HandlingNotFound } = require("./middlewares/Handling404.middleware")
const ApiError = require("./utils/ApiError")

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan("dev"))

// routes
app.use("/api/v1", require("./routes"))

// 404 handler (must be AFTER routes)
app.use((req, res, next) => {
    next(new ApiError(404, "Hello"))
})

// error handler
app.use(HandlingNotFound)

// server
module.exports = app

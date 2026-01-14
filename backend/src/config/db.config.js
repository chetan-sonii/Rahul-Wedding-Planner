const mongoose = require("mongoose")

exports.ConnectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Rahul_Wedding_Planner")
        console.log(`MongoDB connected: ${mongoose.connection.host}`)
    } catch (error) {
        console.error("MongoDB connection failed", error)
        process.exit(1)
    }
}

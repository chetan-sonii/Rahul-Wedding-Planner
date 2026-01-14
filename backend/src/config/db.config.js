const mongoose = require("mongoose")

exports.ConnectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI
        console.log(uri);
        if (!uri) {
            console.log("MONGO_URI is not defined in environment variables")
        }

        const conn = await mongoose.connect(uri)

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error("MongoDB Error:", error.message)
        process.exit(1)
    }
}

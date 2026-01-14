const mongoose = require("mongoose")

exports.ConnectDB= async()=>{
    try {
       await mongoose.connect("mongodb+srv://chetan:chetan309204@cluster0.2g44vys.mongodb.net/?appName=Cluster0")
        console.log(`the db is connect with ${mongoose.connection.host}`);
        
    } catch (error) {
        mongoose.disconnect()
        process.exit(1)
    }
}
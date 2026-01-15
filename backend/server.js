require("dotenv").config();
const app = require("./src/app");
const { ConnectDB } = require("./src/config/db.config");

const port = process.env.PORT

app.listen(port,()=>{
    ConnectDB()
    console.log(`the app is listen at http://localhost:${port}`);
    
})
const mongoose = require("mongoose")

function connectToDB (){
    
    console.log("MONGO URI:", process.env.MONGO_URI)

    mongoose.connect(process.env.MONGO_URI)
     .then(() => {
        console.log("server is connected to DB")
        console.log("DATABASE:", mongoose.connection.name)
     })
     .catch(err => {
        console.log("Error connecting DB", err.message)
        
        process.exit(1)
     })
}


module.exports = connectToDB
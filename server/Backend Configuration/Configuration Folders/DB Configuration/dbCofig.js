const mongoose= require("mongoose")
async function connectDB(){

    try {
        await mongoose.connect("mongodb://localhost:27017/ProjectDBName");
        console.log("MongoDb is connected")
    } catch (error) {
        console.log(error)
    }

}

module.exports = connectDB;
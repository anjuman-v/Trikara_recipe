const mongoose = require('mongoose')
 const mongoDB = "mongodb://localhost:27017/trikara-recipe"
//const mongoDB = "mongodb+srv://trikara:trikara@clustertrikara.lokw22j.mongodb.net/?retryWrites=true&w=majority";

module.exports = ()=>mongoose.connect(mongoDB)
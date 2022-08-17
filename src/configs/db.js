const mongoose = require('mongoose')
 const mongoDB = "mongodb://localhost:27017/trikara-recipe"
//const mongoDB = "";

module.exports = ()=>mongoose.connect(mongoDB)
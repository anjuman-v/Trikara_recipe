const mongoose = require('mongoose')
const recipeSchema = new mongoose.Schema(
    {
       name : { type: String, required: true},
       price : { type: String, required: true},
       description : { type: String, required: true},
       avatar_url : { type: Number, required: true}
    },
    {
        versionKey : false
        
    }
)

module.exports = mongoose.model('recipe', recipeSchema)
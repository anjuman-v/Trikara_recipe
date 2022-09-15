const express = require('express')
 const cors = require('cors')

const mongoDBConnector = require('./configs/db')


const { register, login } = require('./controllers/user.controller')
const recipeController  = require('./controllers/recipe.controller');

const app = express()
app.use(express.json())


const port = process.env.PORT || 5000
//
//cors 
// const corsOptions ={
//     origin:'http://localhost:3000/', 
//     credentials:true,           
//     optionSuccessStatus:200
// }

app.use(cors());

app.use('/signup', register)
app.use('/signin', login)
app.use('/', recipeController)

 app.listen(port, async ()=>{
        try {
            await mongoDBConnector()
            console.log(`Server is listening on the port ${port}`)    
        } 
        catch (error) {
            console.log({
                message : error.message,
                status : "something went wrong"
            })
        }
    })

    
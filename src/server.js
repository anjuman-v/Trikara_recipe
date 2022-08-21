const express = require('express')
 const cors = require('cors')

const mongoDBConnector = require('./configs/db')


const { register, login } = require('./controllers/user.controller')
const recipeController  = require('./controllers/recipe.controller');

const app = express()
app.use(express.json())


const port = process.env.PORT || 5000

const corsOptions ={
    origin:'https://trikara-recipe-client-anzy.vercel.app', 
    credentials:true,           
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use('/signup', register)
app.use('/signin', login)
app.use('/', recipeController)



    app.listen(port, async ()=>{
        try {
            await mongoDBConnector()
            console.log(`Server is listening on the port ${port} `)    
        } 
        catch (error) {
            console.log({
                message : error.message,
                status : "something went wrong"
            })
        }
    })

    
const { Router } = require("express")
const { auth } = require('../middleware/auth');

const Recipe = require('../models/recipe.model');

const router = Router()


router.post('/recipe', auth,  async (req, res) => {
    try{
        const recipe = await Recipe.create(req.body)
        return res.status(200).send(recipe)
    }
    catch (error) {
        return res.status(500).send({message: error.message})
    }
})


router.get('/recipe/:id', auth,  async(req, res) => {
    try{
        const recipe = await Recipe.findById(req.params.id).lean().exec()
        return res.status(200).send(recipe)

    } catch(error) {
        return res.status(500).send({message : error.message})
    }

})


router.delete("/recipe/:id", auth, async (req, res) => {
    try {
      const recipe = await Recipe.findByIdAndDelete(req.params.id).lean().exec();
  
      res.status(200).send(recipe);
    } catch (error) {
      return res.status(500).send(error.message);
    }

});


router.patch("/recipe/:id", auth, async (req, res) => {
    try {
      const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!recipe) {
        return res.status(404).send("No recipe Data Found");
      }
      res.status(200).send(recipe);
    } catch (error) {
        return res.status(500).send(error.message);
      }
  
});


router.get('/recipes', auth,  async(req, res) => {
    try{
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        let totalPages = 0;
        let recipes
        if(req.query.q) {
           if(req.query.q == 'filter'){
                recipes = await Recipe.find({name: req.query.base}).skip((page - 1) * limit).limit(limit).lean().exec()
                const totalPage = await Recipe.find({name: req.query.base}).countDocuments()
                totalPages = (Math.ceil(totalPage/limit))
            }

            else
                {
                    recipes = await Recipe.find({block : req.query.block}).skip((page - 1) * limit).limit(limit).lean().exec()
                    const totalPage = await Recipe.find({block : req.query.block}).countDocuments()
                    totolPages = (Math.ceil(totalPage/limit))
                }
        }
        else{
            recipes = await Recipe.find().skip((page - 1) * limit).limit(limit).lean().exec()
            const totalPage = await Recipe.find().countDocuments()
            totalPages = (Math.ceil(totalPage/limit))

        }

        let arr = []
        for(let i = 1; i <= totalPages; i++){
            arr.push(i)

        }
        return res.status(200).send({recipes, totalPages:arr})
    } 
    catch (error) {
        return req.status(500).send({message : error.message})
    }
})


module.exports = router;
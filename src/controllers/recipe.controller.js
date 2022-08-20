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
//sdfghj

router.get('/recipes', auth,  async(req, res) => {
  
    try {
        const recipe = await Recipe.find().lean().exec()
    
        res.status(200).send(recipe);
      } catch (error) {
        return res.status(500).send(error.message);
      }
})


module.exports = router;
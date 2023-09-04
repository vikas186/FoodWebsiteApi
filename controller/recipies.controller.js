const Recipiesmodel = require("../models/recipies.models");

// Create Recipies function

exports.createRecipies = async (req, res) => {
  try {
    const file = req.file;
    const { title, subtitle, nutrition, ingredients, preparation} = req.body;
    //  console.log(req.body)

    if (!title && !subtitle && !nutrition && !ingredients  && !preparation ) {
      res.status(400).json({ message: " Recipies Data can not be empty!" });
    }

    const nutritionArray = JSON.parse(nutrition); // Parse the JSON string to an array

    const ingredientList = ingredients.split(',').map(item => item.trim());

    const recipie = new Recipiesmodel ({
      title: title,
      subtitle: subtitle,
      nutrition: nutritionArray,
      image: file.filename,
      ingredients: ingredientList,
      preparation: preparation
    });
    
    const savedRecipie = await recipie.save();

    res.status(201).json({
      message: "Recipies data created successfully!",
      user: savedRecipie,
    });
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "An error occurred while creating Recipies data",
    });
  }
};

// Find a recipies function

exports.findRecipies = async (req, res) => {
  try {
    const recipie = await Recipiesmodel.findById(req.params.id);
    res.status(200).json({ message: "find a recipie successfully", recipie });
  } catch (error) {
    res.status(404).json({
        message: "An error occurred while finding a recipie data",
      });
  }
};

//  Get all recipies function

exports.findAllRecipies = async (req, res) => {
    try {
      const recipie = await Recipiesmodel.find();
      res.status(200).json({ message: "find all recipies successfully" , recipie});
    } catch (error) {
      res.status(404).json({message: "An error occurred while finding all recipies data"});
    }
  };


//  Update function for  recipie
  exports.updateRecipies = async (req, res) => {
    const { id, title, nutrition, ingredients, subtitle, preparation } = req.body;
    const file = req.file;
    const user = await Recipiesmodel.findOne({_id:id});

    const nutritionArray = JSON.parse(nutrition); // Parse the JSON string to an array

    const ingredientList = ingredients.split(',').map(item => item.trim());
  
    if (!user) {
      res.status(400).json({
        message: "Data to update can not be empty!",
      });
    }
    if (file) {
      await Recipiesmodel.findByIdAndUpdate(id, {
        image: file.filename,
        title: title,
        subtitle: subtitle,
        preparation: preparation,
        nutrition: nutritionArray,
        ingredients: ingredientList
        
      })
        .then((data) => {
          if (!data) {
            res.status(404).json({
              message: `User data not found.`,
            });
          } else {
            res.json({ message: "blog data updated successfully." });
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          });
        });
    } else {
      await Recipiesmodel.findByIdAndUpdate(id, {
        title: title,
        description: description,
        preparation : preparation,
        nutrition: nutritionArray,
        ingredients: ingredientList
      })
        .then((data) => {
          if (!data) {
            res.status(404).json({
              message: `User data not found.`,
            });
          } else {
            res.json({ message: "blog data updated successfully." });
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          });
        });
    }
  };

// Delete news function

exports.destroyRecipies = async (req, res) => {
  const { id } = req.body;
  await Recipiesmodel.findByIdAndRemove(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Recipies data not found.`,
        });
      } else {
        res.json({
          message: "Recipies data deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occurred while deleting Recipies data",
      });
    });
};



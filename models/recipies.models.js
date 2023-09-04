const mongoose = require ('mongoose');

const schema = new mongoose.Schema({
        title : {
        type : String,
        default : null
    },
        subtitle : {
        type : String,
        default : null
    },
        nutrition :[{
        no : String,
        nutname: String,
        nutvalue: String,
    }],
        ingredients: [{
        type: String,
        default : null
      }],

        preparation : {
        type : String,
        default : null
    },
    image: {
        type: String,
      },
},
{  
    timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
}
);

const recipies = new mongoose.model('Recipies', schema);
module.exports = recipies;

//COLLEcTIONS are DETERMINED BY THE SCHEMEA NAME!!!!!!
//  Add your code here
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema ({

    // MAYBE CHANGE THIS TO 
  
    text: {
        type: String
    }

})

const Comment = model("Comment", commentSchema)// in the "" will be the collections name in lowercase in the database
module.exports = Comment;
//COLLEcTIONS are DETERMINED BY THE SCHEMEA NAME!!!!!!
//  Add your code here
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema ({

    // MAYBE CHANGE THIS TO 
  
    text: {
        type: String
    },


    posterId:  {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

    // have current session user ID?

   
    /*    posterId:  {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }*/
    
    //--- > when you Create the comment, you make it so that data passed to this key is the current USER ID. This way you can populate all the User who posted info on the thread id PAGE thus making listing the name easy
    // something like above would set it up so that 

})

const Comment = model("Comment", commentSchema)// in the "" will be the collections name in lowercase in the database
module.exports = Comment;
//COLLEcTIONS are DETERMINED BY THE SCHEMEA NAME!!!!!!
//  Add your code here
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const threadSchema = new Schema ({

    
    title: {
        type: String
    },
    threadComments:  [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }],

        oPiD:  {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    
    

})

const Thread = model("Thread", threadSchema)// in the "" will be the collections name in lowercase in the database
module.exports = Thread;
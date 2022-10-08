const router = require("express").Router();
const Comment = require('../models/Comment.model');


//--------- this has to be `/`  and can't just be anything. this is refering to the "routes" folder
//         |
router.get(`/comments`, (req, res, next) => {
    // console.log(res.render(`./celebrities/celebrities`));
    Comment.find()
    .then(allComments => {
        console.log("Got all celebs", allComments );
        //※※※※※※※※CHANGE Celebreties Views to COMMENTS※※※※※※※※
        res.render('./celebrities/celebrities', { comments: allComments });
    })
    .catch(error => {
        console.log(`Error on celeb get`, error);
 
        next(error);
    })
 
 
   });

//    router.get(`/editComment`, (req, res, next) => {
//     // console.log(res.render(`./celebrities/celebrities`));

//     res.render(`threads/edit-comment`)
 
//    });

// GET ROUTE FOR COMMENT EDIT PAGE
router.get('/comment/:id/edit', (req, res, next) => {
    Comment.findById(req.params.id)
    .then(commentToEdit=>{
        console.log({COMMENTTEST: commentToEdit})


        res.render(`threads/edit-comment`, {comment: commentToEdit, threadId: !!req.query.threadId ? req.query.threadId : false})
        
    

    })

 
    .catch(err => {console.log({err})})
})



//POST ROUTE FOR COMMENT EDIT PAGE
router.post('/comment/:id/edit', (req, res, next)=>{

    Comment.findByIdAndUpdate( req.params.id, {
        text: req.body.text,
    })
      
    .then((response)=>{
        console.log({POSTRESPONSE: response})
        res.redirect(`/threads/${req.body.threadId}`);
        console.log({POSTRESPONSE: response})
    }).catch((err)=>{
        console.log(err);
    })


})

router.post('/comment/:id/delete', (req, res, next)=>{

    Comment.findByIdAndRemove(req.params.id)
    .then((response)=>{
        console.log({THEPOSTRESPONSE:response})
       
        console.log(req.body.threadProper)
        res.redirect('back');
    })
    .catch((err)=>{
        console.log(err);
    })

});











  module.exports = router;
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
router.post('/comment/:id', (req, res, next)=>{

    Comment.findByIdAndUpdate( req.params.id, {
        text: req.body.text,
    
       

    })
    
    
    
    .then((response)=>{
        console.log({POSTRESPONSE: response})
        res.redirect(`/threads/${req.body.threadId}`);

    }).catch((err)=>{
        console.log(err);
    })


})





   router.post('/celebs/create', (req, res, next) => {
      console.log({entireFormInput: req.body});// req.body is the thing catching the data sent from the html form method POST
      const {name, occupation, catchphrase, _id} = req.body;
      // adds new book to database from the form
      Comment.create({name, occupation, catchphrase, _id})
          // .then(newBookForDb => console.log(`New book created: ${newBookForDb.title}`))
          .then(() => {
              res.redirect(`/celebs`)
          })
          .catch(error => {
              next(error)
          });
  
    });
  




  module.exports = router;
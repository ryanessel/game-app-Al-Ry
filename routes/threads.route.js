const router = require("express").Router();
const { isObjectIdOrHexString } = require("mongoose");
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard");
const Comment = require("../models/Comment.model");
const Thread = require('../models/Thread.model');
const User = require('../models/User.model');



router.get(`/threads`, (req, res, next) => {
    // console.log(res.render(`./celebrities/celebrities`));
    Thread.find()
    .then(allThreadsDb => {
        // console.log("Got all movies", allMoviesDb);
 
    


        res.render('./threads/threads', { threads: allThreadsDb});
        
    })
    .catch(error => {
        console.log(`Error on movie get`, error);
 
        next(error);
    })
 
 
   });




router.get(`/threads/create`, isLoggedIn, (req, res) =>{
    // res.render(`movies/new-movie.hbs`)
    
    Comment.find()
    .then(allCommentsDb => {
        console.log("Got all comments", allCommentsDb);
 
        res.render('./threads/new-thread.hbs');
        
    })
    .catch(error => {
        console.log(`Error on movie get`, error);
 
        next(error);
    })



    })
 
    //SHOULD BE CREATE NEW THREAD
    router.post('/threads/create', (req, res, next) => {
       console.log({entireFormInput: req.body});// req.body is the thing catching the data sent from the html form method POST
       const {title, text} = req.body;
       // adds new book to database from the form
      
            
        // when you .create snth you can call all the schema
        Comment.create({text, posterId: req.session.currentUser._id})
        .then(postText => {
        //     console.log(postText._id)
        //  let commentId = postText._id
        //     Thread.findByIdAndUpdate(threadID._id, {
        //       $push:  {threadComments: commentId }
              
              
        //     })

        Thread.create({title, threadComments: [postText._id]})
        // .then(newBookForDb => console.log(`New book created: ${newBookForDb.title}`))
       
        //Celeb.findByIdAndUpdate()
     //    console.log(req.body.id)
        .then(newThread => {
           
            console.log({REQCHEQ: newThread.threadComments})
            console.log({COMMENTID: postText.id})
            console.log({THREADID: newThread._id})

            console.log({postText, newThread, commentAuthor: postText.posterId});
            
            res.redirect(`/threads/${newThread._id}`)
        })


              
           })
           .catch(error => {
               next(error)
           });
   
     });



     router.get('/threads/:Id', (req, res, next)=>{
       
        // Thread.findById(req.params.Id)
        // .populate('comments')
        // .then(allCommentsDb => {




        // })
            Thread.findById(req.params.Id)
            .populate({
                path :'threadComments',
                populate: {
                    path: 'posterId'
                }
            })
            .then(theThread=>{
                console.log({TESTTTTTT: theThread.threadComments, threads: theThread.threadComments[0]})
                res.render('threads/thread-details', {thread: theThread})
            
            




        })
        .catch((err)=>{
            console.log(err);
        })
    })



    router.post('/threads/:id', (req, res, next) => {


        Thread.findByIdAndUpdate(req.params._id, {
            $push:  {threadComments: commentId }
            
            
          })

    })

  
    
    router.post('/movies/:id/delete', (req, res, next)=>{

        Thread.findByIdAndRemove(req.params.id)
        .then((response)=>{
            res.redirect('/movies');
        })
        .catch((err)=>{
            console.log(err);
        })
    
    });


    router.get('/movies/:id/edit', (req, res, next) => {
        Thread.findById(req.params.id).populate('cast')
        .then(theThread=>{
            console.log({TESTTTTTT: theThread})



            
        
        Comment.find()
        .then(allCommentsDb => {

            

            console.log("Got all celebs", allCommentsDb);
     
            res.render('movies/edit-movie', {thread: theThread, comments: allCommentsDb})
        })
        })

     
        .catch(err => {console.log({err})})
    })
    











    

    // router.get(`/movies/:id/edit`, (req, res, next) => {
    //     Movie.findById(req.params.id)
    //     .then(() => {

    //     })

    //     Celeb.find()
    //     .then((celebFromDb) => {
    //         res.render(`movies/edit-movie`, {celebs: celebFromDb})
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })


    // })



    router.post('/movies/:id', (req, res, next)=>{

        Thread.findByIdAndUpdate( req.params.id, {
            title: req.body.title,
            genre: req.body.genre,
            plot: req.body.plot,
            cast: req.body.cast
           

        })
        
        
        
        .then((response)=>{
    
            res.redirect(`/movies/${req.params.id}`);
    
        }).catch((err)=>{
            console.log(err);
        })
    
    
    })
// TRYING TO SEND LIEKD MOVIED ID's TO CURRENT SESSION UESER likedMovie ARRAY
    router.post(`/like/:id`, isLoggedIn, (req, res, next) => {

       



      let movieId = req.params.id

  

      
    // CAN ADJUST THIS LATER> THIS IS JUST FOR LIKES. DOESN"T MATTER THAT MUCH IN OUR CASE.  
        User.findByIdAndUpdate(req.session.currentUser._id, {
            
            
            $addToSet: {likedMovies: movieId},//addToSet to array only once.
         
            // likedMovies: req.body.likedMovies = [req.params.id]
        })
        .then(response => {
            console.log(response)
            console.log(response.likedMovies)
        })
        // .then(user => {
        //     user.likedMovies = user.likedMovies.push(movieId)
        //     console.log(user.likedMovies.length)
        //     console.log(user)
        // })
       

        console.log({注意likedMovie: req.params.id})// clicking like gives movie id (needs to be passed to the User.moviesliked array)
        res.redirect(`/movies`)
    })
  

  module.exports = router;
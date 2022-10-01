const router = require("express").Router();
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard");
const Comment = require("../models/Comment.model");
const Thread = require('../models/Thread.model');
const User = require('../models/User.model');



router.get(`/movies`, (req, res, next) => {
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




router.get(`/movies/create`, (req, res) =>{
    // res.render(`movies/new-movie.hbs`)
    
    Comment.find()
    .then(allCommentsDb => {
        console.log("Got all celebs", allCommentsDb);
 
        res.render('./movies/new-movie.hbs', { comments: allCommentsDb});
        
    })
    .catch(error => {
        console.log(`Error on movie get`, error);
 
        next(error);
    })



    })
 
    //SHOULD BE CREATE NEW THREAD
    router.post('/movies/create', (req, res, next) => {
       console.log({entireFormInput: req.body});// req.body is the thing catching the data sent from the html form method POST
       const {title, subject} = req.body;
       // adds new book to database from the form
       Thread.create({title, subject})
           // .then(newBookForDb => console.log(`New book created: ${newBookForDb.title}`))
          
           //Celeb.findByIdAndUpdate()
          
           .then(() => {
               res.redirect(`/movies`)
           })
           .catch(error => {
               next(error)
           });
   
     });



     router.get('/movies/:Id', (req, res, next)=>{
        Thread.findById(req.params.Id).populate('cast')
        .then(theThread=>{
            console.log({TESTTTTTT: theThread})



            res.render('movies/movie-details', theThread)
        })
        .catch((err)=>{
            console.log(err);
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
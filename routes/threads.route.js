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

        res.render('./threads/threads', {threads: allThreadsDb});
        
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

        Thread.create({title, threadComments: [postText._id], oPiD: req.session.currentUser._id})
        // .then(newBookForDb => console.log(`New book created: ${newBookForDb.title}`))
       
        //Celeb.findByIdAndUpdate()
     //    console.log(req.body.id)
        .then(newThread => {
           //※※※User.findByIdandUpdate(req.session.currentUser._id, {$push : {createdThreads: newThread._id}})※※※
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


//POST ROUTE ADDS COMMENT ID to Thread "threadComments"





     router.get('/threads/:Id', (req, res, next)=>{
        console.log({CHECKINGparams: req.params})
       
        Thread.findById(req.params.Id)
        .populate({
            path :'threadComments',
            populate: {
                path: 'posterId'
            }
        })
        .then(theThread=>{

            if(!req.session.currentUser) {
                console.log({NOTLOGGEDIN: theThread})
                res.render(`threads/thread-details`, {threadProper: theThread})
            }
            else if (req.session.currentUser) { 
                   

            console.log({LOGGEDIN: theThread.oPiD})
            // const updatedThreads = [...theThread.threadComments].map(comments => {
            //     // console.log({thread: comments._doc, user: req.session.currentUser, match: String(comments._doc.posterId._id) === String(req.session.currentUser._id)});
            //     console.log({THREADID:String(theThread.oPiD), CURRENTUSER:String(req.session.currentUser._id)})

            //     return {
            //         ...comments._doc,
            //         canUserModify:!!req.session.currentUser && String(comments._doc.posterId._id) === String(req.session.currentUser._id)
                   
            //     }



            // });
           
           
           let updateComments = theThread.threadComments.map((eachComment)=> {

                // full expression (Math.abs(new Date() - eachComment.createdAt))
                const now = new Date();
                const commentAge = Math.abs(now - eachComment.createdAt)
                const properCommentAge = Math.round((commentAge / 1000) /60)

              





                eachComment.minutes = Math.round((commentAge / 1000) /60)
                // calculating hours
            if (eachComment.minutes >= 60) {
                eachComment.hours = Math.round(eachComment.minutes/60)
            }
                //calculating days
            if (eachComment.hours >= 24) {

                eachComment.days = Math.round(eachComment.hours/24)
            }


                if (req.session.currentUser && String(eachComment.posterId._id) === String(req.session.currentUser._id)){

                    eachComment.canUserModify = true

                } else {
                    eachComment.canUserModify = false

                }


                return eachComment
                console.log(eachComment)
            }

            )
           
            res.render('threads/thread-details', 
            {              threadProper:theThread,
                            comments: updateComments,
                canRemoveThread: !!req.session.currentUser && String(theThread.oPiD) === String(req.session.currentUser._id),
                hideMins: !!updateComments.minutes >= 60
                }
                
         
                        )
     

           
        }
        })
        .catch((err)=>{
            console.log(err);
        })
    })

//MAKING COMMENTS
    router.post('/threads/:id', isLoggedIn, (req, res, next) => {
        console.log({THREADREQ: req.params.id})
        const {title, text} = req.body;
        Comment.create({text, posterId: req.session.currentUser._id})
        .then(postComment => {
    
            console.log({Comment: postComment})
           
            
        Thread.findByIdAndUpdate(req.params.id, {
            
            $push:  {threadComments: postComment._id }
            
            
          })

          .then(response => {
            
          })
          console.log({REQPARAMS2: req.params})
         console.log({threadComments: postComment._id })
         res.redirect(`/threads/${req.params.id}`)
        })
        .catch((err) => {
            console.log(err);
        })
    
    
    })

  
    
    router.post('/thread/:id/delete', (req, res, next)=>{


        
        Thread.findByIdAndRemove(req.params.id)
        .then((response)=>{
            console.log({THEPOSTRESPONSE:response})
           
            console.log(req.body.threadProper)
            res.redirect('/threads');
        })
        .catch((err)=>{
            console.log(err);
        })
    
    });


  

  module.exports = router;
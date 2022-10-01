
GIVES ACCESS TO BOTH THE USER (IF LOGGED IN AND movies but it makes the page break if it doesn't)

router.get(`/movies`, (req, res, next) => {
    // console.log(res.render(`./celebrities/celebrities`));
    Movie.find()
    .then(allMoviesDb => {
        // console.log("Got all movies", allMoviesDb);
        
    User.findById(req.session.currentUser._id)

.then(current => {
    console.log({MOVIESUSER: current})
    res.render('./movies/movies', { movies: allMoviesDb, currentUser: current});
})


        
    })
    .catch(error => {
        console.log(`Error on movie get`, error);
 
        next(error);
    })
 
 
   });
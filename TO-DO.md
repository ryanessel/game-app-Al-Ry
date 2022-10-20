1. ADJUST VIEWS TO REFLECT THE NEW MODELS ETC
✅2. ADJUST ROUTES TO REFLECT NEW MODELS ETC
3. movie/:id/details page required. Should populate from that specific id's array of comments.
 - when comments are created on the page the id should be pushed to array of comments.
 - Comment model should have
   - text(the actual comment) -when a comment is "created" it will have text(defined by the POST form INPUT) 
   - userWhoPosted ID? ---> when comment is created the userID will be taken from the currentUserInSession.
                     -Then the page should refresh after the new comment is posted. 
                     - there will be a function(route) that will populate the comment userId so that we will have access to all of that User's
                     sepcific informaiton like username etc. So when we display that comment it will also show the userName of the User who made 
                     the pos









1. Comment is deleted from the db but not the id listed in the threadComments.(IDK) if this is a big deal since it doesn't break anthing. Its just that a thread's threadComments id elements array can only increase and never decrease. Maybe it saves data but im not sure if it matters right now since it doesn't break our stuff
2. Thing about the counting clock to list the speficic number of years, months, weeks, days, hours, mins ago. 
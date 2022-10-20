document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);





let commentDelBtn = document.getElementById(`testBtn`)

  function willYouDeleteComment() {
   
    confirm("Are you sure you want to delete this comment?")  
     
  }


  //test btn
setTimeout(() => {
  document.getElementById(`testBtn`).onclick = () => {
    
    willYouDeleteComment();

  }

}, 500)
 //comment delete button

 // PROBLEMS
 //-only targets on of the each loop buttons (seems at random). 
 //-Confirm alert comes up but will always delete the comment no matter is you choose "ok" or "cancel"

//  document.getElementById(`comment-del-btn`).onclick = () => {
//   willYouDeleteComment();
//   if (willYouDeleteComment === true){
//    return
//   } else {
//     next();
//   }
 
// }



// was exporting it so that we could grab it in the coomment.routes.js but it gives me an error saying "confirm" (method) is not defined.
//not sure how to have it do the javascript option thing before running the get and post route. It may have something with how the data is sent from the HBS view. 
module.exports = { willYouDeleteComment }
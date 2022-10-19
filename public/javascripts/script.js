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


 document.getElementById(`comment-del-btn`).onclick = () => {
  willYouDeleteComment();
  if (willYouDeleteComment === true){
   console.log("IT WORKS")
  } else {return}
 
}

module.exports = { willYouDeleteComment }
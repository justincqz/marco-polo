var counter = 0;

$(".upvote").click(function(){
  counter++;
  $("#count").text(counter);
});

$(".downvote").click(function(){
  counter--;    
  $("#count").text(counter);
});

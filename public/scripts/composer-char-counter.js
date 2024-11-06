$(document).ready(function() {
  //input logs any characters input, but not key logs
  $('#tweet-text').on('input', function(event) {
    //targets the value of the event target, in this case text box
    const tweetString = $(event.target).val();
    const tweetLength = tweetString.length;
    const charsRemaining = 140 - tweetLength;
    const form = $(event.target).parent();
    //uses form.find to target the counter class, to avoid searching whole page
    const characterCounter = form.find('.counter');
    //the longer the tweet gets, the shorter the characters remaining
    characterCounter.text(charsRemaining);
    if (charsRemaining < 0) {  
      characterCounter.addClass("error");
    } else {
      characterCounter.removeClass('error');
    }
  });
});

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  function loadTweets() {
    $.ajax('/tweets', {
      method: 'GET'
    })
    .then(function(data) {
      renderTweets(data);
    })
  }

  loadTweets();
  $("form").on('submit', function(event) {
    event.preventDefault();
    const input = $('#tweet-text').val();
    const count = input.length;
    if (input.trim() === "") {
      alert("Please enter text");
      return;
    }
    if (count > 140) {
      alert('Character limit exceeded');
      return;
    }
    
    const data = $(this).serialize();
    $(this).trigger('reset')
    $.ajax({
      method: 'POST',
      url: "/tweets",
      data: data,
      success: loadTweets()
    })
  })
});
  





const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    let renderTweet = createTweetElement(tweet);
    $('.tweet-container').prepend(renderTweet);
  }
};

const createTweetElement = function(tweet) {
  const date = tweet.created_at;
  let $tweet = $(`<article class="tweet-class">
    <header>
      <div>
      <img src=${tweet.user.avatars}/>
        <p> ${tweet.user.name}</p>
        </div>
        <p class="handle">${tweet.user.handle}</p>
      </header>
        <p class="tweet">${tweet.content.text}</p>
        <footer>
          <p>${timeago.format(date)}</p>
          <p><i class="fa-solid fa-flag"></i>  <i class="fa-solid fa-retweet"></i> 
             <i class="fa-solid fa-heart"> </i></p>
        </footer>
      </article>`);
  return $tweet;
};


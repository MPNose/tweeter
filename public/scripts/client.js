/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//when the the document has rendered, this function runs
$(document).ready(function() {
  function loadTweets() {
    $.ajax('/tweets', {
      method: 'GET'
    })
    .then(function(data) {
      renderTweets(data);
    })
  }
  //listening for a submit signal inside the form
  loadTweets();
  $("form").on('submit', function(event) {
    //prevent page from realoading
    event.preventDefault();
    const input = $('#tweet-text').val();
    const count = input.length;
    $('.empty-error').slideUp();
    $('.too-long').slideUp();
    if (input.trim() === "") {
      $('.empty-error').slideDown();
      return;
    }
    if (count > 140) {
      $('.too-long').slideDown();
      return;
    }
    //clean up response data into readable format
    const data = $(this).serialize();
    $.ajax({
      method: 'POST',
      url: "/tweets",
      data: data,
      //reset counter, clear text bar, load tweets with new tweet
      success: function() {
        $(`.counter`).text('140');
        $('#tweet-text').val("");
        loadTweets();
      }
    })
  })
});


const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//takes in tweets from get request
const renderTweets = function(tweets) {
  $('.tweet-container').empty();
  for (const tweet of tweets) {
    let renderTweet = createTweetElement(tweet);
    $('.tweet-container').prepend(renderTweet);
  }
};

//formats appearance of tweet passed from renderTweets, based off html and css layout
const createTweetElement = function(tweet) {
  const date = tweet.created_at;
  let $tweet = $(`<article class="tweet-class">
    <header>
      <div>
      <img src=${escape(tweet.user.avatars)}/>
        <p> ${tweet.user.name}</p>
        </div>
        <p class="handle">${escape(tweet.user.handle)}</p>
      </header>
        <p class="tweet">${escape(tweet.content.text)}</p>
        <footer>
          <p>${escape(timeago.format(date))}</p>
          <p><i class="fa-solid fa-flag"></i>  <i class="fa-solid fa-retweet"></i> 
             <i class="fa-solid fa-heart"> </i></p>
        </footer>
      </article>`);
  return $tweet;
};


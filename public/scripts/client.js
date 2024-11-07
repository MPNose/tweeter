/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$("form").on('submit', function(event) {
  event.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    method: 'POST',
    url: "/tweets",
    data: data
  })
console.log(data);
});

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    console.log(tweet);
    let renderTweet = createTweetElement(tweet);
    $('.tweet-container').append(renderTweet);
  }
};

const createTweetElement = function(tweet) {
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
          <p>${tweet.created_at}</p>
          <p><i class="fa-solid fa-flag"></i>  <i class="fa-solid fa-retweet"></i> 
             <i class="fa-solid fa-heart"> </i></p>
        </footer>
      </article>`);
  return $tweet;
};

renderTweets(data);
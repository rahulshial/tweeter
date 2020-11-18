/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const createTweetElement = function(record) {

    // const $tweet = $(`<article class="tweet-hello-world">Hello world</article>`);
    //create tweetMarkup
    const $$userName = record['user']['name'];
    const $avatars = record['user']['avatars'];
    const $userHandle = record['user']['handle'];
    const $tweetBody = record['content']['text'];
    const $createdAt = record['created_at'];

    const $tweetMarkUp = `
    <div class="tweet-list">
    <!-- have a header, which contains the user's: avatar, then name, and handle on extreme right -->
    <header class="tweet-list-header">
      <div class="avatar-name-wrapper">
        <img class="avatar" src="${$avatars}"></img>
        <label name="user-name" class="user-name">${$$userName}</label>
      </div>
      <div>
        <label class="user-handle">${$userHandle}</label>
      </div>
    </header>
    <!-- have a body, which contains the tweet text -->
    <div class="tweet-list-body">
      <p>${$tweetBody}</p>
    </div>
    <!-- have a footer which displays: how long ago tweet was created on the left, and "Flag", "Re-tweet" and "Like" icons upon hovering over the tweet, on the right -->
    <footer class="tweet-list-footer">
      <div class="created-on">
        <p>${$createdAt}</p>
      </div>
      <div class="icons">
        <i class="fa fa-flag"></i>
        <i class="fa fa-heart"></i>
        <i class="fa fa-retweet"></i>
      </div>
    </footer>
    </div>
    `;
    return $tweetMarkUp;
  };

  // Test / driver code (temporary). Eventually will get this from the server.
  
  const renderTweets = function() {
    for (const record of db) {
      console.log(record);
      const $tweet = createTweetElement(record);
      $(".tweet-container").append($tweet);
    }
  };
  
  const db = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1605545728283
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1605632128283
    }
  ];

  // Test / driver code (temporary)
  renderTweets();
  // console.log($tweet); // to see what it looks like
  // $('.tweet-list').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});



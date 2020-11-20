/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const botTweet = [{
    "user": {
      "name": "Tweet Bot",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@TweetBot"
    },
    "content": {
      "text": "Welcome to your Tweeter Account! What's on your mind!"
    },
    "created_at": Date.now()
  }];
  /** Helper Functions */

  /** Preventing XSS with Escaping */
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  /** function to post the tweet to the database and render the last tweet in the list panel */
  const postTweetAndRender = function(tweet) {
    $.ajax({
      url: '/tweets',
      dataType: 'text',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded',
      data: $(tweet).serialize(),
    })
      .then(() => {
        $("#tweet-text").val('');
        /** render the last entered tweet */
        $.ajax("/tweets",{type: "GET"})
          .then(data => {
            renderTweets([data[data.length - 1]]);
          })
          .catch(error => {
            console.log(error);
          });
      });
  };
  /** valudate tweet attributes and display error messages if any.
  * return true or false back to the calling function for further processing
  */
  const validateTweet = function(tweet) {
    if (!tweet.length > 0) {
      $(".error-message").text("Tweet cannot be empty!");
      $(".error-line").slideDown();
      return false;
    } else if (tweet.length > 140) {
      $(".error-message").text("Maximum 140 characters allowed!!");
      $(".error-line").slideDown();
      return false;
    }
    return true;
  };

  /** create the HTML Markup to display / render the tweets from the database */
  const createTweetElement = function(record) {
    const tweetMarkUp = `
      <div class="tweet-list">
        <!-- have a header, which contains the user's: avatar, then name, and handle on extreme right -->
        <header class="tweet-list-header">
          <div class="avatar-name-wrapper">
            <img class="avatar" src="${record.user.avatars}"></img>
            <label name="user-name" class="user-name">${record.user.name}</label>
          </div>
          <div>
            <label class="user-handle">${record.user.handle}</label>
          </div>
        </header>
        <!-- have a body, which contains the tweet text -->
        <div class="tweet-list-body">
          <p class="tweet-line">${escape(record.content.text)}</p>
        </div>
        <!-- have a footer which displays: how long ago tweet was created on the left, and "Flag", "Re-tweet" and "Like" icons upon hovering over the tweet, on the right -->
        <footer class="tweet-list-footer">
          <div class="created-on">
            <p>${moment(record.created_at).fromNow()}</p>
          </div>
          <div class="icons">
            <i class="fa fa-flag"></i>
            <i class="fa fa-heart"></i>
            <i class="fa fa-retweet"></i>
          </div>
        </footer>
      </div>
    `;
    return tweetMarkUp;
  };

  /** function called from within loadTweets and postAndRender
   * This function receives the database and for each record calls the createTweetElement to render
   * the tweet in the list panel
   */
  const renderTweets = function(database) {
    for (const record of database) {
      const $tweet = createTweetElement(record);
      $(".tweet-container").prepend($tweet);
    }
  };
  
  /** perform a AJAX call to fetch the database and pass it along to renderTweets for rendering */
  const loadTweets = function() {
    $.ajax("/tweets",{type: "GET"})
      .then(data => {
        if (data.length === 0) {
          renderTweets(botTweet);
        }
        renderTweets(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  /** toggle the new tweet form on / off with the compose button in the nav bar. */
  $(".compose-button").click(function() {
    $(".tweet-form").toggle();
  });

  /** receive the tweet from the form and process for errors or appending to the database */
  $(".tweet-button").click(event => {
    $(".error-line").slideUp();
    event.preventDefault();
    const tweet = $("#tweet-text").val();
    if (validateTweet(tweet)) {
      postTweetAndRender("#tweet-text");
    }
  });

  $(document).scroll(function() {
    let y = $(this).scrollTop();
    if (y > 200) {
      $(".scroll").fadeIn();
    } else {
      $(".scroll").fadeOut();
    }
  });

  $(".scroll").click(event => {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 });
    return false;
  });
  
  loadTweets();
});



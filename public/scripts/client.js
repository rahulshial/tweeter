/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  /** Helper Functions */

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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

  const createTweetElement = function(record) {
    const userName = record['user']['name'];
    const avatars = record['user']['avatars'];
    const userHandle = record['user']['handle'];
    const tweetBody = record['content']['text'];
    let createdAt = Math.round((Date.now() - record['created_at']) / 86400000);
    (createdAt > 1 ? createdAt += ' days ' : createdAt += ' day ');
    const tweetMarkUp = `
      <div class="tweet-list">
        <!-- have a header, which contains the user's: avatar, then name, and handle on extreme right -->
        <header class="tweet-list-header">
          <div class="avatar-name-wrapper">
            <img class="avatar" src="${avatars}"></img>
            <label name="user-name" class="user-name">${userName}</label>
          </div>
          <div>
            <label class="user-handle">${userHandle}</label>
          </div>
        </header>
        <!-- have a body, which contains the tweet text -->
        <div class="tweet-list-body">
          <p>${escape(tweetBody)}</p>
        </div>
        <!-- have a footer which displays: how long ago tweet was created on the left, and "Flag", "Re-tweet" and "Like" icons upon hovering over the tweet, on the right -->
        <footer class="tweet-list-footer">
          <div class="created-on">
            <p>${createdAt} ago</p>
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

  const renderTweets = function(database) {
    for (const record of database) {
      const $tweet = createTweetElement(record);
      $(".tweet-container").prepend($tweet);
    }
  };
  
  const loadTweets = function() {
    $.ajax("/tweets",{type: "GET"})
      .then(data => {
        renderTweets(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  $(".pencil-button").click(function() {
    $(".tweet-form").toggle();
  });

  $(".tweet-button").click(event => {
    $(".error-line").slideUp();
    event.preventDefault();
    const tweet = $("#tweet-text").val();
    if (validateTweet(tweet)) {
      postTweetAndRender("#tweet-text");
    }
  });

  loadTweets();
});



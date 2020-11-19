/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $(".tweet-button").click(event => {
    event.preventDefault();
    const tweet = $("#tweet-text").val();
    if (!tweet.length > 0) {
      alert("Tweet cannot be empty!");
    } else if (tweet.length > 140) {
      alert("Maximum 140 characters allowed!!");
    } else {
      $.ajax({
        url: '/tweets',
        dataType: 'text',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: $("#tweet-text").serialize(),
      })
        .then(() => {
          $("#tweet-text").val('');
          loadTweets();
        });
    }
    /** create the ajax post request */

  });

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
          <p>${tweetBody}</p>
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

  // Test / driver code (temporary). Eventually will get this from the server.
  
  const renderTweets = function(database) {
    for (const record of database) {
      const $tweet = createTweetElement(record);
      $(".tweet-container").prepend($tweet);
    }
  };
  
  const loadTweets = function() {
    //ajax get the
    $.ajax("/tweets",{type: "GET"})
      .then(data => {
        renderTweets(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  loadTweets();
  // Test / driver code (temporary)
  // renderTweets();

});



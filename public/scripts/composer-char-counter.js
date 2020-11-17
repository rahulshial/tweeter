$(document).ready(function() {
  console.log('In the script file - composer-char-counter.js');

  $("textarea").keydown(function(event) {
    const inputLength = ($(this).val().length);
    let remainingCharacters = 140 - inputLength;
    const counter = $(this).parent().children().children().children(".counter");
    // const counter = $(".counter");
    counter.html(remainingCharacters);
    if (remainingCharacters < 0) {
      counter.addClass("red");
    } else {
      counter.removeClass("red");
    }
  });

});


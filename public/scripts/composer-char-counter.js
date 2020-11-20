$(document).ready(function() {
  $("textarea").keydown(function() {
    $(".error-line").slideUp();
    const $inputLength = ($(this).val().length);
    let $remainingCharacters = 140 - $inputLength;
    const $counter = $(this).parent().children().children().children(".counter");
    $counter.text($remainingCharacters);
    if ($remainingCharacters < 0) {
      $counter.addClass("red");
    } else {
      $counter.removeClass("red");
    }
  });
});


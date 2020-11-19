$(document).ready(function() {
  $("textarea").keydown(function(event) {
    $(".error-line").hide();
    const $inputLength = ($(this).val().length);
    let $remainingCharacters = 140 - $inputLength;
    // const $counter = $(this).parent().children().children().children(".counter");
    const $counter = $(".counter");
    $counter.text($remainingCharacters);
    if ($remainingCharacters < 0) {
      $counter.addClass("red");
    } else {
      $counter.removeClass("red");
    }
  });
});


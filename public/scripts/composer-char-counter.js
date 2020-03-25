const updateCounter = e => {
  const maxChars = 140;
  const textLength = $("#tweet-text").val().length;

  $("#new-tweet-counter").text(maxChars - textLength);

  if((maxChars - textLength) > 0 ){
    $('.error').html('')
  }

  if (maxChars - textLength <= 0) {
    $("#new-tweet-counter").css("color", "red");
  } else {
    $("#new-tweet-counter").css("color", "unset");
  }
  if (textLength === maxChars && e.key !== "Backspace") {
    e.preventDefault();
  }
};

$(document).ready(() => {
  $("#tweet-text").on("keyup", e => {
    $("#new-tweet-counter").css("transform", "scale(1)");
    updateCounter(e);
  });

  $("#tweet-text").on("keydown", e => {
    if(e.which === 13) {
      e.preventDefault();
      $('#tweet-form').submit()
    };
    $("#new-tweet-counter").css("transform", "scale(1.1)");
    updateCounter(e);
  });
});

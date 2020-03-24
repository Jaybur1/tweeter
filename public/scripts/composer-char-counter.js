const updateCounter = e => {
  const maxChars = 140;
  const textLength = $("#tweet-text").val().length;

  $("#new-tweet-counter").text(maxChars - textLength);

  if (textLength === 0) {
    $("#tweet-text").css("height", "0px");
  } else {
    $("#tweet-text").css("height", "50px");
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
    $("#new-tweet-counter").css("transform", "scale(1.1)");
    updateCounter(e);
  });
});

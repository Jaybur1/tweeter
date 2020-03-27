//hide errpr when condition met
const handleError = text => {
  if (text && 140 - text.length > 0) {
    $(".error").css("margin-top", "-50px");
    $(".error").text("");
  }
};

const updateCounter = () => {
  const maxChars = 140;
  const textLength = $("#tweet-text").val().length;

  $("#new-tweet-counter").text(maxChars - textLength);

  if (maxChars - textLength <= 0) {
    $("#new-tweet-counter").css("color", "red");
  } else {
    $("#new-tweet-counter").css("color", "unset");
  }
};

const keyPressHandler = (e, action) => {
  const text = $("#tweet-text").val();
  const maxChars = 140;
  handleError(text);
  if (text.length === maxChars && e.key !== "Backspace") {
    e.preventDefault();
  }
//handle submit on Enter 
  if (e.which === 13 && action === "up") {
    e.preventDefault();
  } else if (e.which === 13 && action === "down") {
    $("#tweet-form").submit();
    e.preventDefault();
  }
};

const mouseHandler = () => {
  //handle text focus
  $("#tweet-text").focus(() => {
    $("#tweet-text").css("height", "50px");
  });

  //handle to top button
  $("#to-the-top-btn").on("click", () => {
    $(window).scrollTop(0);
  });
  $(window).on("scroll", () => {
    if ($(window).scrollTop() >= 300) {
      $("#to-the-top-btn").css("display", "unset");
    } else {
      $("#to-the-top-btn").css("display", "none");
    }
  });
};

const keyHandler = () => {
  //handle text when keyup
  $("#tweet-text").on("keyup", e => {
    $("#new-tweet-counter").css("transform", "scale(1)");
    keyPressHandler(e, "up");
    updateCounter();
  });

  //handle text when keydown
  $("#tweet-text").on("keydown", e => {
    $("#new-tweet-counter").css("transform", "scale(1.1)");
    keyPressHandler(e, "down");
    updateCounter();
  });
};





$(document).ready(() => {
  mouseHandler();
  keyHandler();
});

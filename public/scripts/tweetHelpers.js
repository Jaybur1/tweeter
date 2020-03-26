const handleNewComposeButton = () => {
  const $compose = $("#nav-new-tweet");
  const $icon = $("#compose-icon");

  $compose.on("mouseover", () => {
    $icon.css("animation", "bouncy 2s linear infinite");
  });
  $compose.on("mouseout", () => {
    $icon.css("animation", "unset");
  });

  $compose.on("click", () => {
    $(".error").css("margin-top", "-50px");
    $("#tweet-text").focus();
  });

  $("#tweet-text").focus(()=>{
    $("#tweet-text").css('height','50px')
  });

  $('#to-the-top-btn').on("mouseover", () => {
    $("#to-the-top-icon").css("animation", "bounce 2s linear infinite");
  });
  $('#to-the-top-btn').on("mouseout", () => {
    $("#to-the-top-icon").css("animation", "unset");
  });

  $('#to-the-top-btn').on("click", () => {
    $(window).scrollTop(0);
  });

  $(window).on('scroll', ()=> {
    if($(window).scrollTop() >= 300) {
      $('#to-the-top-btn').css('display',"unset")
    }else{
      $('#to-the-top-btn').css('display',"none")
  
    }
  })
};

const handleError = (maxChars, textLength) => {
  if (maxChars - textLength > 0) {
    $(".error").css("margin-top", "-50px");
    $(".error").text("");
  }
};

const updateCounter = e => {
  const maxChars = 140;
  const textLength = $("#tweet-text").val().length;

  $("#new-tweet-counter").text(maxChars - textLength);

  handleError(maxChars, textLength);

  if (maxChars - textLength <= 0) {
    $("#new-tweet-counter").css("color", "red");
  } else {
    $("#new-tweet-counter").css("color", "unset");
  }
  if (textLength === maxChars && e.key !== "Backspace") {
    e.preventDefault();
  }
  if (e.which === 13) {
    e.preventDefault();
    $("#tweet-form").submit();
  }
};

$(document).ready(() => {
  handleNewComposeButton();
  $("#tweet-text").on("keyup", e => {
    $("#new-tweet-counter").css("transform", "scale(1)");
    updateCounter(e);
  });

  $("#tweet-text").on("keydown", e => {
    $("#new-tweet-counter").css("transform", "scale(1.1)");
    updateCounter(e);
  });
});

const handleNewComposeButton = () => {
  const $compose = $("#nav-new-tweet");
  
  $compose.on("click", () => {
    if($(".error").css("margin-top") === "-50px"){
      $(".error").css("margin-top", "-200px");
      $("#tweet-text").blur();
    } else {
      $(".error").css("margin-top", "-50px");
      $("#tweet-text").focus();
    }
  });
};

$(document).ready(()=> {
  handleNewComposeButton();
})
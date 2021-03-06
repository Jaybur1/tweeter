
const escapeXSS = str => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
//a function that appends the created tweet to the main feed
const createTweetElement = tweet => {
  //handle XSS
  const safeText = escapeXSS(tweet.content.text);
  const safeName = escapeXSS(tweet.user.name);
  const safeHandle = escapeXSS(tweet.user.handle);
  const safeAvatar = escapeXSS(tweet.user.avatars);

  //tweet container
  let $tweet = $("<artical>").addClass("tweet");
  $tweet.html(`
    <header>
      <div class="user">
        <img class="avatar" src=${safeAvatar} />
        <span>${safeName}</span>
      </div>
      <span class="handle">${safeHandle}</span>
    </header>
    <p class="tweet-content">${safeText}</p>
    <footer>
      <span class="time-posted">${
        jQuery.timeago((tweet.created_at / 1000) * 1000)
      }</span>
      <div class="social-collection">
        <i class="scl fas fa-flag"></i>
        <i class="scl fas fa-retweet"></i>
        <i class="scl fas fa-heart"></i>
      </div>
    </footer>
  `);
  return $tweet;
};

//a function that appends the created tweet to the main feed
const renderTweets = tweets => {
  $("#tweets-list").html("");
  tweets.forEach(tweet => $("#tweets-list").prepend(createTweetElement(tweet)));
};

//funciton that loads tweets from the DB
const loadTweets = () => {
  $.get("/tweets/", data => {
  }).done(data => {
      renderTweets(data);
    })
    .fail(() => {
      throw new Error("Faild to load Tweets");
    });
};

//on succesfull ajax call
const success = () => {
};
//handle update feed
const updateFeed = () => {
  $(".error").css("margin-top", "-200px");
  $("#tweet-text").css("height", "0px");
  $("#tweet-text").blur();
  $("#new-tweet-counter").html("140");
  $(".error").html("");

  loadTweets();
};


//handles the error messages before submiting
const tweetValidation = text => {
  if (!text) {
    $(".error").text("⚠️There's nothing to submit, write something and try again⚠️");
    $(".error").css("margin-top", "0");
    return false;
  }
  if (text.length > 140) {
    $(".error").text("⚠️You exceed the max number of characters allowed⚠️");
    $(".error").css("margin-top", "0");
    return false;
  }
  return true;
};




$(document).ready(() => {
  loadTweets();

  $("#tweet-form").on("submit", e => {
    e.preventDefault();
    const text = $("#tweet-text").val();

    if (tweetValidation(text)) {
      $.ajax({
        type: "POST",
        url: "/tweets/",
        data: $("#tweet-form").serialize(),
        success: success(),
        dataType: "text"
      }).then(() => {
        $("#tweet-text").val("");
        $('.counter').css('color','unset')
        updateFeed();
      });
    }
  });
});

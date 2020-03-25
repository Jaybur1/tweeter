// a function that creates all the elements for the tweet
const createTweetElement = tweet => {
  //main tweet container
  let $tweet = $("<artical>").addClass("tweet");
  $tweet.html(`
    <header>
      <div class="user">
        <img class="avatar" src=${tweet.user.avatars} />
        <span>${tweet.user.name}</span>
      </div>
      <span class="handle">${tweet.user.handle}</span>
    </header>
    <p class="tweet-content">${tweet.content.text}</p>
    <hr />
    <footer>
      <span class="time-posted">${jQuery.timeago(
        (tweet.created_at / 1000) * 1000
      )}</span>
      <div class="social-collection">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
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
    console.log("success");
  })
    .done(data => {
      renderTweets(data);
    })
    .fail(() => {
      console.log("fail");
    });
};

//on succesfull ajax call
const success = () => {
  console.log("tweet posted");
};
//handle update feed
const updateFeed = () => {
  $(".error").html("");
  $("#new-tweet-counter").html("140");
  loadTweets();
};

const tweetValidation = text => {
  if (!text) return false;
  if (text.length > 140) return false;

  return true;
};

const sendError = text => {
  if (!text){
    console.log(text)
    $(".error").html("Thers nothing to submit, write something and try again");
  }else if(text.length > 140){
    $(".error").html("You exceed the max number of characters allowed");
  }
  $('#tweet-text').focus()
};

$(document).ready(() => {
  loadTweets();

  $("#tweet-form").on("submit", e => {
    e.preventDefault();
    const text = $("#tweet-text").val();
    
    if (!tweetValidation(text)) {
      sendError(text)
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets/",
        data: $("#tweet-form").serialize(),
        success: success(),
        dataType: "text"
      }).then(() => {
        $("#tweet-text").val("");
        updateFeed();
      });
    }
    //reset textArea
  });
});

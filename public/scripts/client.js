////////////////////////////////////////////////////////////////////////////////////
// // a function that creates all the elements for the tweet and gluing all together
// const createTweetElement = tweet => {
//   //main tweet container
//   let $tweet = $("<artical>").addClass("tweet");
//   //header to containe the user info ,avatar and the hendler
//   let $header = $("<header>");
//   let $userInfo = $("<div>").addClass("user");
//   let $avatar = $("<img>")
//     .addClass("avatar")
//     .attr("src", tweet.user.avatars);
//   let $userName = $("<span>").text(tweet.user.name);
//   let $handle = $("<span>")
//     .addClass("handle")
//     .text(tweet.user.handle);

//   //container to contain the user content
//   let $content = $("<p>")
//     .addClass("tweet-content")
//     .text(tweet.content.text);

//   //under line to diveide the contetnt with the footer
//   let $hr = $("<hr />");

//   //footer to contain created_at and social-collection icons
//   let $footer = $("<footer>");
//   let $timePosted = $("<span>")
//     .addClass("time-posted")
//     .text(jQuery.timeago(tweet.created_at / 1000*1000));
//   let $socialCollection = $("<div>").addClass("social-collection").html(`
//   <i class="fas fa-flag"></i>
//   <i class="fas fa-retweet"></i>
//   <i class="fas fa-heart"></i>
//   `);

//   //glue everything
//   $tweet.append([
//     $header.append([$userInfo.append([$avatar, $userName]), $handle]),
//     $content,
//     $hr,
//     $footer.append([$timePosted, $socialCollection])
//   ]);

//   //return the glued whole glued element
//   return $tweet;
// };
/////////////////////////////////////////////////////////////////////////////

const escapeXSS = str => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
//a function that appends the created tweet to the main feed
const createTweetElement = tweet => {
  //main tweet container
  //handle XSS
  const safeText = escapeXSS(tweet.content.text);
  const safeName = escapeXSS(tweet.user.name);
  const safeHandle = escapeXSS(tweet.user.handle);
  const safeAvatar = escapeXSS(tweet.user.avatars);

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
      <span class="time-posted">${jQuery.timeago(
        (tweet.created_at / 1000) * 1000
      )}</span>
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
    console.log("success");
  })
    .done(data => {
      renderTweets(data);
    })
    .fail(() => {
      throw new Error("Faild to load Tweets");
    });
};

//on succesfull ajax call
const success = () => {
  console.log("tweet posted");
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

const tweetValidation = text => {
  if (!text) {
    $(".error").text(
      "⚠️There's nothing to submit, write something and try again⚠️"
    );
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

const sendError = text => {
  if (!text) {
  } else if (text.length > 140) {
  }
  $("#tweet-text").focus();
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
        updateFeed();
      });
    }
    //reset textArea
  });
});

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//a function that converts time stamp into how long ago .-level-1
// import TimeAgo from 'javascript-time-ago';
//////////////////////////////////////////////////////////////////////////////////
const testData = [
  {
    user: {
      name: "Bob",
      avatars:
        "https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Spongebob-512.png",
      handle: "@pants**2"
    },
    content: {
      text:
        "I'm ready, I'm ready, I'm ready, I'm ready, I'm ready, I'm ready, I'm ready, I'm ready, I'm ready, I'm ready, I'm ready, I'm ready!!!!!!!!!!"
    },
    created_at: 1584968238
  },
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1569416238
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1427288238
  }
];

////////////////////////////////////////////////////////////////////////////////
// a function that creates all the elements for the tweet and gluing all together
const createTweetElement = tweet => {
  //main tweet container
  let $tweet = $("<artical>").addClass("tweet");

  //header to containe the user info ,avatar and the hendler
  let $header = $("<header>");
  let $userInfo = $("<div>").addClass("user");
  let $avatar = $("<img>")
    .addClass("avatar")
    .attr("src", tweet.user.avatars);
  let $userName = $("<span>").text(tweet.user.name);
  let $handle = $("<span>")
    .addClass("handle")
    .text(tweet.user.handle);

  //container to contain the user content
  let $content = $("<p>")
    .addClass("tweet-content")
    .text(tweet.content.text);

  //under line to diveide the contetnt with the footer
  let $hr = $("<hr />");

  //footer to contain created_at and social-collection icons
  let $footer = $("<footer>");
  let $timePosted = $("<span>")
    .addClass("time-posted")
    .text(jQuery.timeago(tweet.created_at * 1000));
  let $socialCollection = $("<div>").addClass("social-collection").html(`
  <i class="fas fa-flag"></i>
  <i class="fas fa-retweet"></i>
  <i class="fas fa-heart"></i>
  `);

  //glue everything
  $tweet.append([
    $header.append([$userInfo.append([$avatar, $userName]), $handle]),
    $content,
    $hr,
    $footer.append([$timePosted, $socialCollection])
  ]);

  //return the glued whole glued element
  return $tweet;
};

//a function that appends the created tweet to the main feed
const renderTweets = tweets => {
  tweets.forEach(tweet =>
    $("#tweets-list").prepend(createTweetElement(tweet))
  );
};

//on succesfull ajax call
const success = (data) => {
  const newTweet = {
    user: {
      name: "Bob",
      avatars:
        "https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Spongebob-512.png",
      handle: "@pants**2"
    },
    content: {
      text: data
    },
    created_at: new Date(Date.now() / 1000)
  }
  testData.push(newTweet);
}
//handle update feed
const updateFeed = () => {
  $("#tweets-list").html("");
  $("#new-tweet-counter").html("140");
  renderTweets(testData);
}

$(document).ready(() => {
  renderTweets(testData);
  $('#tweet-form').on('submit', (e) => {

    e.preventDefault();
    $.ajax({
      type: "POST",
      url:'/tweets/',
      data: $('#tweet-form').serialize(),
      success: success($('#tweet-text').val()),
      dataType: 'text'
    }).then(()=>{
      $('#tweet-text').val("")
      updateFeed();
    })
    //reset textArea 
  })
  
});

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//a function that converts time stamp into how long ago .-level-1
// import TimeAgo from 'javascript-time-ago';


// a function that creates all the elements for the tweet and gluing all together
const createTweetElement = tweet => {
  let $tweet = $("<artical>").addClass("tweet");
  let $header = $("<header>");
  let $userInfo = $("<div>").addClass("user");
  let $avatar = $("<img>")
    .addClass("avatar")
    .attr("src", tweet.user.avatars);
  let $userName = $("<span>").text(tweet.user.name);
  let $handle = $("<span>")
    .addClass("handle")
    .text(tweet.user.handle);
  let $content = $("<p>")
    .addClass("tweet-content")
    .text(tweet.content.text);
  let $hr = $("<hr />");
  let $footer = $("<footer>");
  let $timePosted = $("<span>")
    .addClass("time-posted")
    .text(jQuery.timeago(tweet.created_at));
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

  return $tweet;
};


$(document).ready(() => {
  const testData = [{
    user: {
      name: "Bob",
      avatars: "https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Spongebob-512.png",
      handle: "@pants**2"
    },
    content: {
      text: "I'm ready, I'm ready, I'm ready, I'm ready, I'm ready, I'm ready, I'm ready, I'm ready, I'm ready, I'm ready, I'm ready, I'm ready!!!!!!!!!!"
    },
    created_at:1461116232227
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
      created_at: 1461116232227
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
      created_at: 1461113959088
    }
  ];

  
  const renderTweets = tweets => {
    tweets.forEach(tweet => $("#tweets-list").append(createTweetElement(tweet)));
  };
  


  renderTweets(testData); 
});

 
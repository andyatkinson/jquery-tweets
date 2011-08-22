function init(settings) {
  return $('#testing').tweets(settings);
}

$(function() {
  
  test("Defaults and options", function() {
    init();
    equal($.tweets._defaults.username, "ev", "placeholder username");
    equal($.tweets._defaults.cycle, false, "do not cycle by default");
    equal($.tweets._defaults.count, 5, "show 5 tweets by default");
    equal($.tweets._defaults.animateDuration, 6000, "cycle tweet every 6 seconds");
    equal($.tweets._defaults.singleRandomTweet, false, "should not show single random tweet by default");
    equal($.tweets._defaults.animate, true, "use animation by default");
    equal($.tweets._defaults.showTimestamps, true, "show timestamps by default");
    equal($.tweets.api_method, "http://twitter.com/statuses/user_timeline/", "should equal API method");
    equal($.tweets.requestUrl, "http://twitter.com/statuses/user_timeline/ev.json?count=5&callback=?", "should construct request URL");
  });
  
  test("hyperlinking tweet plain text", function() {
    init();
    equal($.tweets._autoLinkText("you should visit twitter to see updates"),
          "you should visit twitter to see updates", "do nothing if text contains no links");
    equal($.tweets._autoLinkText("you should visit http://twitter.com to see updates"),
          "you should visit <a href='http://twitter.com'>http://twitter.com</a> to see updates", 
          "replace links with hyperlinked text");
    equal($.tweets._autoLinkUsernames("tweeted by @webandy"),
          "tweeted by @<a href='http://twitter.com/webandy'>webandy</a>",
          "replace twitter usernames with hyperlinked text");
    equal($.tweets._autoLinkTimestamp('50733650609836033', '08/26/2010', 'webandy'),
          "<a href='http://twitter.com/webandy/status/50733650609836033'>8/26/2010</a>",
          "create formatted and hyperlinked text from timestamp");
  });
  
  test("twitter API response data", function() {
    init();
    ok($.tweets.responseData[0].id_str, "should have an id_str property");
    ok($.tweets.responseData[0].id_str.length === 18, "should be 18-chars in length");
  });
  
});
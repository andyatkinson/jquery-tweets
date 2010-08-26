module("Object initialization");

var plugin = new TweetsPlugin({username: 'webandy'});

test("init should create TweetsPlugin object", function() {
  ok(typeof plugin === 'object');
});
test("init should set the username on the returned object", function() {
  equals(plugin.settings.username, "webandy");
});

module("URL detection, replacement, auto-linking");
test("auto link should leave text without hyperlinks untouched", function() {
  equals(plugin.autoLinkText("you should visit twitter to see updates"),
    "you should visit twitter to see updates");
});
test("should replace links with hyperlinked text", function() {
  equals(plugin.autoLinkText("you should visit http://twitter.com to see updates"),
    "you should visit <a href='http://twitter.com'>http://twitter.com</a> to see updates");
});
test("detect twitter usernames and link them", function() {
  equals(plugin.autoLinkUsernames("tweeted by @webandy"),
    "tweeted by @<a href='http://twitter.com/webandy'>webandy</a>");
});
test("create formatted link from timestamp", function() {
  // link should go to tweet, link text should be U.S.-style formatted date MM/DD/YYYY
  status_id = 22204851106
  created_at = '08/26/2010'
  equals(plugin.autoLinkTimestamp(status_id, created_at),
    "<a href='http://twitter.com/webandy/statuses/22204851106'>8/26/2010</a>")
})
jquery-tweets
===
`jquery-tweets` is a jQuery plugin that fetches a user's tweets (must have public tweets enabled) for display on a website. URLs within tweets and twitter usernames are auto-linked. Configure the username and number of tweets. Tweets are displayed as a list by default or can be cycled one at a time by passing `{cycle: true}` as an option. The cycle option was developed for the [americas.org](http://americas.org/) website.

Install
===
  1. Download `jquery.tweets.js`
  2. Include the JavaScript file somewhere `<script type="text/javascript" src="/path/to/javascripts/jquery.tweets.js"></script>`. Ensure the jQuery javascript file is included before jquery-tweets.

Usage
===
  1. After the document is ready, select an element on your page and call the `tweets()` function. Add your username.

    <pre>
      $('#tweets').tweets({username: 'webandy'});
    </pre>
  
  2. That's it! To use other options include them in the options hash.
  
    <pre>
      $('#tweets').tweets({username: 'biz', count: 10, cycle: true, relativeTime: false, includeHeader: false});
    </pre>

Options
===
By default 5 tweets are displayed as list items without cycling, times are relative to the current time, and with a header that says "follow this user on twitter" (this can be disabled). Tweet times are displayed MM/DD/YYYY format or relative to now e.g. "About a minute ago".
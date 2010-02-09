jquery-tweets
===
`jquery-tweets` is an jQuery plugin that displays tweets for a given user on a website. URLs and usernames are auto-linked. Relative timestamps are displayed by default. The number of tweets displayed is configurable. Tweets are displayed as a list by default or can be cycled one at a time in a news ticker style (with a crossfade animation).

Install
===
  1. Download `jquery.tweets.js`
  2. Include the JavaScript file somewhere `<script type="text/javascript" src="/path/to/javascripts/jquery.tweets.js"></script>`. Ensure the jQuery javascript file is included before jquery-tweets.

Usage
===
  1. After the document is ready, select an element on your page and call `tweets()` on the selector. Add your username.

    <pre>
      $(function() {
        $('#tweets').tweets({username: 'webandy'});
      });
    </pre>
  
  2. That's it! To use other options include them in the options hash.
  
    <pre>
      $('#tweets').tweets({username: 'biz', count: 10, cycle: true, relativeTime: false, includeHeader: false});
    </pre>

Options
===
By default 5 tweets are displayed as list items without cycling, times are relative to the current time, and with a header that says "follow this user on twitter" (this can be disabled). Tweet times are displayed MM/DD/YYYY format or relative to now e.g. "About a minute ago".

Style
===
Style is up to you. A div with the id of "tweets" can be used to scope CSS selectors to the p and li elements inside it.

Where is this used?
===

 1. [americas.org](http://americas.org) (originally developed for this site)
 2. [my.trms.com](http://my.trms.com) (customer support website for Tightrope Media Systems)
 3. [trainbrainapp.com](http://trainbrainapp.com) (iPhone app website)
 
MIT License
===
Copyright (c) 2009 Andy Atkinson http://webandy.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
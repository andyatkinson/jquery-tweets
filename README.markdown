### UPDATE: July 2013

Twitter has deprecated the 1.0 API that this used in favor of the [1.1 REST API](https://dev.twitter.com/docs/api/1.1/get/statuses/user_timeline). Unfortunately this requires authentication via OAuth and I don't know how this can be done via client-side javascript.

[This thread on twitters developer page documents the issue](https://dev.twitter.com/discussions/11564)

[This fork of another twitter plugin generates a static file of an API response from a PHP script](https://github.com/StanScates/Tweet.js-Mod). Then the client side JS parts can still be used for presentation and style.

Finally, Twitter themselves offer [embedded timelines](https://dev.twitter.com/docs/embedded-timelines) now which duplicate the functionality of this plugin, and offer limited customization options. Part of this plugin's goal was to offer extensive customization options not limited to colors, but also including behavior.


jquery-tweets
===
`jquery-tweets` displays tweets for a user with a public twitter account. No server code is necessary. Test coverage with QUnit covers some of the functionality of the plugin.


Install
===
  
  1. Download the `jquery.tweets.js` file and include it on your page (use the minified version to save bandwidth). The rest of the files are only needed if you want to test the plugin. The jQuery framework must already be available on the page. Tested with 1.4.2.
  2. After the document is ready, select an element and call the `tweets()` function on it, passing in the options you want to set.
  
    Example:

    $(function() {
      $('#tweets').tweets({username: 'webandy'});
    });
  
  
  That's it! To use other options include them in the options hash. Example options are displayed below.
  
    $('#tweets').tweets({username: 'biz', count: 10, cycle: true});

Options
=====
  
    username: 'ev'  (twitter username)
    cycle: false  (cycles shows one at a time with animation)
    count: 5      (how many to show? leave blank for API max)
    animateDuration: 6000  (how long should between tweets when animating? 6s default)
    singleRandomTweet: false  (show a single random tweet?)
    animate: true   (use animation?)
    showTimestamps: true  (show the timestamps?)
    ....check the plugin source for the latest options available.


CSS
===
CSS is up to you. Check the examples below to see some ways the tweets are styled. Check the example page to see other style examples. Have you put this plugin on your site and styled it? Send me a link!
 
Testing
===
The QUnit framework is used to cover some of the functionality of the internal methods. Additionally, example usages of the plugin are included on the `index.html` page in the test directory. Load the `index.html` page in your browser to run the unit tests and see the example usages. View the page source to see the markup and script code for each example.

Thanks
===
This plugin follows the pattern outlined in this excellent blog post titled [A jQuery Plugin Framework](http://keith-wood.name/pluginFramework.html). 

This plugin had been added to the [jQuery plugins directory here](http://plugins.jquery.com/project/webandy-jquery-tweets).

 
MIT License
===
Copyright (c) 2009 Andy Atkinson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

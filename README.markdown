jquery-tweets
===
`jquery-tweets` displays tweets for a user with a public twitter account. No server code is necessary. Test coverage covers much of the code in this plugin.

Install
===
 1. Download the `jquery.tweets.js` file and include it on your page. The rest of the files are only needed if you want to test the plugin. The jQuery framework must already be available on the page.
 2. After the document is ready, select an element and call the `tweets()` function.

    $(function() {
      $('#tweets').tweets({username: 'webandy'});
    });
  
  
  That's it! To use other options include them in the options hash. Example options are displayed below.
  
    $('#tweets').tweets({username: 'biz', count: 10, cycle: true});

CSS
===
CSS is up to the user. Check the examples below to see various ways the tweets are styled to fit the website design. Check the example page to show one styled tweets area, feel free to use any or part of the CSS for your project.

Examples
===
This script is used on the following websites. The usages are each styled individually.

 1. [americas.org](http://americas.org) (originally developed for this site)
 2. [my.trms.com](http://my.trms.com) (customer support website for Tightrope Media Systems)
 3. [trainbrainapp.com](http://trainbrainapp.com) (iPhone app website)
 
Testing
===
The QUnit framework is used to unit tests that cover some of the functionality of the internal methods. Additionally, example usages of the plugin are included on the `index.html` page in the test directory that demonstrate the plugin being used in the browser. Load the `index.html` page in your browser to run the unit tests, and see example plugin usage. View the page source to see the markup and script code for each usage.

Thanks
===
This plugin follows the pattern outlined in this excellent blog post titled [A jQuery Plugin Framework](http://keith-wood.name/pluginFramework.html). 

This plugin had been added to the [jQuery plugins directory here](http://plugins.jquery.com/project/webandy-jquery-tweets).

 
MIT License
===
Copyright (c) 2009 Andy Atkinson http://webandy.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
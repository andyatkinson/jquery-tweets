/**
* 'jquery-tweets' Copyright (c) 2009 Andy Atkinson http://webandy.com
* jquery-tweets is a jquery plugin that fetches a user's tweets (must have public tweets enabled) 
* for display on a website.
* 
* MIT License, see LICENSE file
*/
(function($) { 
  
var PROP_NAME = 'tweets';

function TweetsPlugin() {
  this._defaults = {
    username: 'ev',
    cycle: false,
    count: 5,
    animateDuration: 6000,
    singleRandomTweet: false,
    animate: true,
    showTimestamps: true
  };
}

$.extend(TweetsPlugin.prototype, {
  
  markerClassName: 'hasTweetsPlugin',
  baseUrl: 'http://twitter.com',
  api_method: 'https://api.twitter.com/1/statuses/user_timeline.json',
  urlRegex: /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/,
  usernameRegex: /(@)(\w+)/g,
  requestUrl: "",
  responseData: null,
  
  setDefaults: function(settings) {
    $.extend(this._defaults, settings || {});
    return this;
  },
  
  /* Attach the tweets plugin functionality to an element.
    @param  target    (element) the html element on the page
    @param  settings  (object) the custom options for this instance */
  _attachTweetsPlugin: function(target, settings) {
    target = $(target);
    if (target.hasClass(this.markerClassName)) {
      // prevent attaching functionality to same element more than once
      return;
    }
    target.addClass(this.markerClassName);
    target.hide();
    var instance = {settings: $.extend({}, this._defaults)};
    $.data(target[0], PROP_NAME, instance);
    this._fetchTwitterData(target, settings);
  },
  
  /* Pull JSON from the twitter API for a user
	   @param  element    (element) the html element on the page
	   @param  settings  (object) the custom options for this instance */
  _fetchTwitterData: function(element, settings) {
    var instance = $.data(element[0], PROP_NAME);
    $.extend(instance.settings, settings);
    this.requestUrl = this.api_method + '?screen_name=' + instance.settings.username + '&count=' + instance.settings.count + '&callback=?';
    var self = this;
    $.getJSON(this.requestUrl, function(data) {
        self.responseData = data; /* used by tests */
        self._buildMarkupFromData(element, data);
      }
    );
  },
  
  /* Convert JSON data returned from twitter API into markup to insert 
     into page
	   @param  element    (element) the html element on the page
	   @param  settings  (object) the custom options for this instance */
  _buildMarkupFromData: function(element, data) {
    var instance = $.data(element[0], PROP_NAME);
    var self = this;
    var tweetsHTML = '';
    if (instance.settings.singleRandomTweet) {
      var item = data[Math.floor(Math.random() * data.length)];
      var tweetHtml = '<li>' + self._buildTweetText(item) + '<span class="created_at">' + self._buildTweetTimestamp(element, item) + '</span></li>';
      tweetsHTML += tweetHtml;
    } else {
      $.each(data, function(i,item) {
        var tweetHtml = '<li>' + self._buildTweetText(item) + '<span class="created_at">' + self._buildTweetTimestamp(element, item) + '</span></li>';
        tweetsHTML += tweetHtml;
      });
    }

    $('<ul/>').html( tweetsHTML ).appendTo( element );
    this._displayTweets(element);
  },
  
  _buildTweetText: function(item) {
    var text = item.text;
    var self = this;
    text = self._autoLinkText(text);
    text = self._autoLinkUsernames(text);
    return text;
  },
  
  _buildTweetTimestamp: function(element, item) {
    var instance = $.data(element[0], PROP_NAME);
    var self = this;
    var timestamp = "";
    if (instance.settings.showTimestamps) {
      timestamp = self._autoLinkTimestamp(item.id_str, item.created_at, item.user.screen_name);
    }
    return timestamp;
  },
  
  /* Convert links to hyperlinked text
	   @param  text  (string) original plain text */
  _autoLinkText: function(text) {
    if (this.urlRegex.test(text)) {
      return text.replace(this.urlRegex, "<a href='$1'>$1</a>");
    } else {
      return text;
    }
  },
  
  /* Convert twitter usernames to hyperlinked usernames
	   @param  text  (string) original plain text */
  _autoLinkUsernames: function(text) {
    if (this.usernameRegex.test(text)) {
      return text.replace(this.usernameRegex, "$1<a href='http://twitter.com/$2'>$2</a>");
    } else {
      return text;
    }
  },
  
  /* Build link back to tweet permalink from parts
    @param  id_str       (string) twitter status ID string
    @param  date         (date) date when tweet was made
    @param  screen_name  (string) twitter username */
  _autoLinkTimestamp: function(id_str, date, screen_name) {
    var d = new Date(date),
    dateString = [
              d.getMonth() + 1,
              d.getDate(),
              d.getFullYear()
            ].join('/');

    var timestampUrl = [
                        this.baseUrl,
                        screen_name,
                        'status',
                        id_str
                        ].join('/');

    return "<a href='" + timestampUrl + "'>" + dateString + "</a>";
  },
  
  /* Decide to either cycle or display tweets markup
    @param  element  (element) element containing tweets */
  _displayTweets: function(element) {
    var instance = $.data(element[0], PROP_NAME);
    var self = this;
    if (instance.settings.animate && instance.settings.cycle) {
      self._cycleTweets(element);
    } else if (instance.settings.animate) {
      element.fadeIn();
    } else {
      element.show();
    }
  },
  
  /* Show one tweet for the animateDurection, then replace it with another
    @param  element  (element) element containing tweets */
  _cycleTweets: function(element) {
    var instance = $.data(element[0], PROP_NAME);
    element.show();
    element.find('ul > li').hide();
    element.find('ul > li:first').fadeIn();
    var i = 1;
    setInterval(function() {
      var items = element.find('li');
      items.hide();
      items.eq(i).fadeIn();
      if(i == items.length) {
        element.find('ul > li:first').fadeIn();
        i = 1;
      } else { i++; }
    }, instance.settings.animateDuration);
  }

});

// The list of commands that return values and don't permit chaining
var getters = ['settings'];
  
$.fn.tweets = function(options) {
  var otherArgs = Array.prototype.slice.call(arguments, 1);
  if ($.inArray(options, getters) > -1) {
    return $.tweets['_' + options + 'TweetsPlugin'].
      apply($.tweets, [this[0]].concat(otherArgs));
  }
  return this.each(function() {
    if (typeof options == 'string') {
      $.tweets['_' + options + 'TweetsPlugin'].
        apply($.tweets, [this].concat(otherArgs));
    }
    else {
      $.tweets._attachTweetsPlugin(this, options || {});
    }
  });
};

/* Initialize the tweets plugin */
$.tweets = new TweetsPlugin(); // singleton instance

})(jQuery);
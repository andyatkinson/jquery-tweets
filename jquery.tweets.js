/*
  'jquery-tweets' Copyright (c) 2009 Andy Atkinson http://webandy.com
  MIT License, see LICENSE file
  jquery-tweets is a jquery plugin that fetches a user's tweets (must have public tweets enabled) for display on a website.
*/
(function($) { 
  
var PROP_NAME = 'tweets';

function TweetsPlugin() {
  this._defaults = {
    username: 'ev',
    cycle: false,
    count: 5,
    animateDuration: 6000
  };
}

$.extend(TweetsPlugin.prototype, {
  
  markerClassName: 'hasTweetsPlugin',
  
  /* settings that are not unique to an instance */
  baseUrl: 'http://twitter.com',
  urlRegex: /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/,
  usernameRegex: /(@)(\w+)/g,
  
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
  
  _fetchTwitterData: function(element, settings) {
    var instance = $.data(element[0], PROP_NAME);
    $.extend(instance.settings, settings);
    var self = this;
    $.getJSON('http://twitter.com/statuses/user_timeline/' + instance.settings.username + '.json?count=' + instance.settings.count + '&callback=?',
        function(data) {
          self._buildMarkupFromData(element, data);
        }
    );
  },
  
  /*
    Responds to custom event when data is ready
  */
  _buildMarkupFromData: function(element, data) {
    var self = this;
    var tweetsHTML = '';
    $.each(data, function(i,item) {
       var text = item.text,
           text = self._autoLinkText(text),
           text = self._autoLinkUsernames(text),
           timestamp = self._autoLinkTimestamp(item.id, item.created_at, item.user.screen_name);
   
       var created_at = $('<span />').addClass('created_at').text(timestamp);
       var tweetHtml = '<li>' + text + '<span class="created_at">' + timestamp + '</span></li>';

       tweetsHTML += tweetHtml;
    });

    // append the markup to the target
    $('<ul/>').html( tweetsHTML ).appendTo( element );
    
    // display the target
    this._displayTweets(element);
  },
  
  _autoLinkText: function(text) {
    if (this.urlRegex.test(text)) {
      return text.replace(this.urlRegex, "<a href='$1'>$1</a>");
    } else {
      return text;
    }
  },
  
  _autoLinkUsernames: function(text) {
    if (this.usernameRegex.test(text)) {
      return text.replace(this.usernameRegex, "$1<a href='http://twitter.com/$2'>$2</a>");
    } else {
      return text;
    }
  },
  
  _autoLinkTimestamp: function(status_id, date, screen_name) {
    var d = new Date(date),
    dateString = [
              d.getMonth() + 1,
              d.getDate(),
              d.getFullYear()
            ].join('/');

    var timestampUrl = [
                        this.baseUrl,
                        screen_name,
                        'statuses',
                        status_id
                       ].join('/');

    return "<a href='" + timestampUrl + "'>" + dateString + "</a>";
  },
  
  _displayTweets: function(element) {
    var instance = $.data(element[0], PROP_NAME);
    instance.settings.cycle ? this._cycleTweets(element) : element.fadeIn();
  },
  
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

}); // end $.extend()

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

/* Initialise the tweets plugin functionality. */
$.tweets = new TweetsPlugin(); // singleton instance

})(jQuery);
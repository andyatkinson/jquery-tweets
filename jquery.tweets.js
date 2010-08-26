//
// 'jquery-tweets' Copyright (c) 2009 Andy Atkinson http://webandy.com
// MIT License, see LICENSE file
// jquery-tweets is a jquery plugin that fetches a user's tweets (must have public tweets enabled) for display on a website.
//
function TweetsPlugin(options) {
  if ( !(this instanceof arguments.callee) ) {
    return new arguments.callee(arguments);
  }
  
  var self = this;
  
  self.settings = {
    username: options.username,
    baseUrl: 'http://twitter.com',
    urlRegex: /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/,
    usernameRegex: /(@)(\w+)/g
  };
  
  self.init();
};

TweetsPlugin.prototype.init = function() {
  var self = this;
};

TweetsPlugin.prototype.autoLinkText = function(text) {
  var self = this;
  
  if ( self.settings.urlRegex.test(text) ) {
    return text.replace(self.settings.urlRegex, "<a href='$1'>$1</a>");
  } else {
    return text;
  }
};

TweetsPlugin.prototype.autoLinkUsernames = function(text) {
  var self = this;

  if ( self.settings.usernameRegex.test(text) ) {
    return text.replace(self.settings.usernameRegex, "$1<a href='http://twitter.com/$2'>$2</a>");
  } else {
    return text;
  }
};

TweetsPlugin.prototype.autoLinkTimestamp = function(status_id, date) {
  var self = this;
  
  var date = new Date(date),
  dateToString = [
            date.getMonth() + 1,
            date.getDate(),
            date.getFullYear()
          ].join('/');
  
  var timestampUrl = [
                      self.settings.baseUrl,
                      self.settings.username,
                      'statuses',
                      status_id
                     ].join('/');
  
  return "<a href='" + timestampUrl + "'>" + dateToString + "</a>";
};

(function($) { 
  
  $.fn.tweets = function(opts) {
    var defaults = {
      username: 'ev',
      cycle: false,
      count: 5,
      animateDuration: 6000
    };
    
    var options = $.extend(defaults, opts);
    
    return this.each(function(i, container) {
      var $container = $(container).hide();
      
      var plugin = new TweetsPlugin(options);
      
      $.getJSON('http://twitter.com/statuses/user_timeline/' + options.username + '.json?count=' + options.count + '&callback=?',
          function(data) {
            buildMarkupForDisplay( data );
          }
      );
      
      displayTweets();
    
      // internal plugin functions for this container (inside container loop)
    
      function displayTweets() {
        options.cycle ? cycleTweets() : $container.fadeIn();
      }
    
      function buildMarkupForDisplay( data ) {
        var tweetsHtml = '';
        $.each(data, function(i,item) {
           var text = item.text,
               text = plugin.autoLinkText( text ),
               text = plugin.autoLinkUsernames( text ),
               timestamp = plugin.autoLinkTimestamp( item.id, item.created_at );
       
           var created_at = $('<span />').addClass('created_at').text(timestamp);
           var tweetHtml = $('<li/>').append(text).append(created_at);
         
           var tweetHtml = '<li>' + text + '<span class="created_at">' + timestamp + '</span></li>';

           tweetsHtml += tweetHtml;
         });
    
        $('<ul/>').html( tweetsHtml ).appendTo( $container );
      }
    
      function cycleTweets() {
        $container.show();
        $container.find('ul > li').hide();
        $container.find('ul > li:first').fadeIn();
        var i = 1;
        setInterval(function() {
          var items = $container.find('li');
          items.hide();
          items.eq(i).fadeIn();
          if(i == items.length) {
            $container.find('ul > li:first').fadeIn();
            i = 1;
          } else { i++; }
        }, options.animateDuration);
      }

    }); // End $.each() loop
  }; // End $.fn.tweets
  
  
})(jQuery);
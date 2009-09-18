//
// 'jquery-tweets' Copyright (c) 2009 Andy Atkinson http://webandy.com
// MIT License, see LICENSE file
// jquery-tweets is a jquery plugin that fetches a user's tweets (must have public tweets enabled) for display on a website.
//
(function($) {
  $.fn.tweets = function(options) {
    var defaults = {
        username: 'ev',
        cycle: false,
        count: 5,
        relativeTime: true,
        includeHeader: true
      };  
    var options = $.extend(defaults, options);
    
    function linkTimestamp(text, id) {
      return '<a href="http://twitter.com/'+options.username+'/statuses/'+id+'">'+text+'</a>';
    }
    // relative times function credit goes to John Reilly @johnreilly
    function relativeTime(time_value) {
      var values = time_value.split(' ');
      time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
      var parsed_date = Date.parse(time_value);
      var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
      var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
      delta = delta + (relative_to.getTimezoneOffset() * 60);

      var r = '';
      if (delta < 60) {
        r = 'a minute ago';
      } else if(delta < 120) {
        r = 'couple of minutes ago';
      } else if(delta < (45*60)) {
        r = (parseInt(delta / 60)).toString() + ' minutes ago';
      } else if(delta < (90*60)) {
        r = 'an hour ago';
      } else if(delta < (24*60*60)) {
        r = '' + (parseInt(delta / 3600)).toString() + ' hours ago';
      } else if(delta < (48*60*60)) {
        r = '1 day ago';
      } else {
        r = (parseInt(delta / 86400)).toString() + ' days ago';
      }
      return r;
    }
    
    return this.each(function() {
      $this = $(this).hide();
      if(options.includeHeader) {
        $('<p/>').html('Follow @<a href="http://twitter.com/'+options.username+'">'+options.username+'</a> on <a href="http://twitter.com">twitter</a>').appendTo($this); 
      }
      var tweets = '';
      $.getJSON('http://twitter.com/statuses/user_timeline/'+options.username+'.json?count='+options.count+'&callback=?',
       function(data){
         $.each(data, function(i,item){
           var tweet = item.text;
           if(tweet.search(/(https?:\/\/[-\w\.]+:?\/[\w\/_\.]*(\?\S+)?)/) > -1) {
             tweet = tweet.replace(/(https?:\/\/[-\w\.]+:?\/[\w\/_\.]*(\?\S+)?)/, "<a href='$1'>$1</a>");
           }
           if(tweet.search(/@\w+/) > -1) {
             tweet = tweet.replace(/(@)(\w+)/g, "$1<a href='http://twitter.com/$2'>$2</a>");
           }
           var date = new Date(item.created_at);
           date = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
           var href = 'http://twitter.com/'+options.username+'/statuses/'+item.id;
           
           var link = options.relativeTime ? linkTimestamp(relativeTime(item.created_at), item.id) : linkTimestamp(date, item.id);
           tweets += '<li>'+tweet+' '+'<span class="created_at">' +link+ '</span></li>';
        });
      $('<ul/>').html(tweets).appendTo($this);
      options.cycle ? cycle() : $this.fadeIn();
      });
      function cycle() {
        $this.show();
        $this.find('ul > li').hide();
        $this.find('ul > li:first').fadeIn();
        var i = 1;
        setInterval(function() {
          var items = $this.find('li');
          items.hide();
          items.eq(i).fadeIn();
          if(i == items.length) {
            $this.find('ul > li:first').fadeIn();
            i = 1;
          } else { i++; }
        }, 6000);        
      }
    });
  }  
})(jQuery);
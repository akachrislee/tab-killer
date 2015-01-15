var TabKiller = function(url){
  this.url = url;
}

TabKiller.prototype.get_url_counts = function(){
  var url = this.url;
  var query_info = {
    url:[
      'https://www.'+url+'/',
      'http://www.'+url+'/',
      'https://'+url+'/',
      'http://'+url+'/'
    ]
  }

  chrome.tabs.query(query_info, function(tabs){
    if (url === 'reddit.com'){
      $('#reddit-count').html(tabs.length);
    } else if (url === 'news.ycombinator.com'){
      $('#hn-count').html(tabs.length);
    } else {}
  });
}

TabKiller.prototype.kill = function(){
  var query_info = {
    url:[
      'https://www.'+this.url+'/',
      'http://www.'+this.url+'/',
      'https://'+this.url+'/',
      'http://'+this.url+'/'
    ]
  }

  chrome.tabs.query(query_info, function(tabs){
    var tab_ids = _.map(tabs, function(tab){ return tab.id; });
    chrome.tabs.remove(tab_ids);
  });
}

$(document).ready(function(){
  var reddit_tk = new TabKiller('reddit.com');
  var hackernews_tk = new TabKiller('news.ycombinator.com');

  reddit_tk.get_url_counts();
  hackernews_tk.get_url_counts();

  $('.kill-reddit-js').on('click', function(e){
    reddit_tk.kill();
  });

  $('.kill-hn-js').on('click', function(e){
    hackernews_tk.kill();
  });
});

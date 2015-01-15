var TabKiller = function(url){
  this.url = url;
}

TabKiller.prototype.get_url_counts = function(){
  var url = this.url;
  var query_info = {
    url: this.generate_urls()
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
    url: this.generate_urls()
  }

  chrome.tabs.query(query_info, function(tabs){
    var tab_ids = _.map(tabs, function(tab){ return tab.id; });
    chrome.tabs.remove(tab_ids);
  });
}

TabKiller.prototype.generate_urls = function() {
  return [
    'https://www.'+this.url+'/',
    'http://www.'+this.url+'/',
    'https://'+this.url+'/',
    'http://'+this.url+'/'
  ]
};

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

var TabKiller = function(url){
  this.url = url;
}

TabKiller.prototype.kill = function() {
  this.find_and_kill_tabs_with_url(this.url);
}


TabKiller.prototype.find_and_kill_tabs_with_url = function() {
  var query_info = {
    url:[
      'https://www.'+this.url+'/',
      'http://www.'+this.url+'/',
      'https://'+this.url+'/',
      'http://'+this.url+'/'
    ]
  }

  chrome.tabs.query(query_info, function(tabs){
    _.each(tabs, function(tab){
      chrome.tabs.remove(tab.id);
   });
  });
};

$(document).ready(function(){
  $('.kill-reddit-js').on('click', function(e){
    var tk = new TabKiller('reddit.com');
    tk.kill();
  });

  $('.kill-hn-js').on('click', function(e){
    var tk = new TabKiller('news.ycombinator.com');
    tk.kill();
  });
});

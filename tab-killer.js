var TabKiller = function(url){
  this.url = url;
}

TabKiller.prototype.find_all_tabs_with_url = function() {
  var query_info = {
    url:['http://www.reddit.com/', 'http://reddit.com/']
  }

  chrome.tabs.query(query_info, function(tabs){
    chrome.tabs.remove( _.map(tabs, function(tab){ return tab.id; }) );
  })
};


$('.kill-reddit-js').on('click', function(e){
  var tk = new TabKiller('reddit.com');
  tk.find_all_tabs_with_url();
});


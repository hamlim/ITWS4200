$(document).ready(function() {
	//All api calls are being called in the TwitterAPIExchange.php file 
	//this is needed because the twitter api can only be called through server side scripting to protect the api key and secret
	
	//for this initial test we will only search for tweets by me, @panteravaca
	//NOTE in the future we will allow users to search for tweets by usernames

	//we need to sanatise the links and make them clickable!
	function checkUrl(text) {
    var url1 = /(^|&lt;|\s)(www\..+?\..+?)(\s|&gt;|$)/g,
    	url2 = /(^|&lt;|\s)(((https?|ftp):\/\/|mailto:).+?)(\s|&gt;|$)/g;

    var html = $.trim(text);
    if (html) {
    	html = html
      	.replace(url1, '$1<a class="links" target="_blank"  href="http://$2">$2</a>$3')
        .replace(url2, '$1<a class="links" target="_blank"  href="$2">$2</a>$5');
    }
  	return html;
  };
	//resp;
	var twarr = new Array();
	//we must first break down resp into an array of strings
	for (i=0;i<resp["statuses"].length; i++){
		twarr.push(resp["statuses"][i]["text"]);
	}
  //time to interpret it in jquery
  function displayContent(tweetarr){
		var modalb = "<li><div class='large-12 columns tweetsize'><div class='card'><div class='tweet'>";
		var modale = "</div></div></div></li>";
		//first we create the links
		for( var i =0; i<tweetarr.length; i++){
			var temp_tweet = checkUrl(tweetarr[i]); //this will add the links
			$("div.row ul").append(modalb + temp_tweet + modale); //combine our entire li structure
		};
		//above for loop appends every tweet to the entire ul structure
		//below code segement cycles through the content
		window.setInterval(function(){
			$("div.row ul li:first-child").each(function(){
				$("div.row ul").append($("div.row ul li:first-child"));
			});
		}, 5000);
	};
	
	// media query event handler
	if (matchMedia) {
		var mq = window.matchMedia("(min-width: 600px)");
		mq.addListener(WidthChange);
		WidthChange(mq);
	}
	
	// media query change
	function WidthChange(mq) {
	
		if (mq.matches) {
			// window width is at least 600px
		}
		else {
			// window width is less than 600px
			var new_content = "<img src='pngs/Communication/twitter.png'/><a href='https://dev.twitter.com' class='links' data-role='none'>Twitter API</a>&<a href='https://twitter.com/panteravaca' class='links' data-role='none'>I Tweet</a>&<a href='about.html' class='links' data-role='none'>About This Page</a>.<img src='pngs/Communication/twitter.png'/>";
			$("footer h2").html(new_content);
		}

	}
  displayContent(twarr);
	
});
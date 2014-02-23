$(document).ready(function() {
	//All api calls are being called in the TwitterAPIExchange.php file 
	//this is needed because the twitter api can only be called through server side scripting to protect the api key and secret
	
	//for this initial test we will only search for tweets by me, @panteravaca
	//NOTE in the future we will allow users to search for tweets by usernames
	
	
	//tweetarr[i]["text"] is the actual tweet itself
	//we want to create a modal variable string for the beginning of the modal which is a design object in Foundation
	//we also want a ending modal string to close the modals
	function displayContent(){
		var modalb = "<li><div class='large-12 columns tweetsize panel radius'><div class='alert-box success radius'><div class='tweet'>";
		var modale = "</div></div></div></li>";
		for( var i =0; i<tweetarr.length; i++){
			$("div.row ul").append(modalb + tweetarr[i]["text"] + modale);
		};
		//above for loop appends every tweet to the entire ul structure
		//below code segement cycles through the content
		window.setInterval(function(){
			var loc = $("div.row ul li:first-child");
			$(loc).each(function(){
				$("div.row ul").append(loc);
			});
		}, 1500);
	};
});
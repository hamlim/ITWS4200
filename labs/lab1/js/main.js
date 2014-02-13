$(document).ready(function() {
	//tweetarr[i]["text"] is the actual tweet itself
	//now we iterate through the entire array and get all the tweets, we only want 5 at a time
	// and to update at 3 second intervals
	//create a small cache of 5 tweets
	//we want to create a modal variable string for the beginning of the modal which is a design object in Foundation
	//we also want a ending modal string to close the modals
	var modalb = "<li><div class='large-12 columns tweetsize'><div class='alert-box success radius'><div class='tweet'>";
	var modale = "</div></div></div></li>";
	for( var i =0; i<tweetarr.length; i++){
		$("div.row ul").append(modalb + tweetarr[i]["text"] + modale);
	};
	window.setInterval(function(){
		$("div.row ul li:first-child").each(function(){
			$("div.row ul").append($("div.row ul li:first-child"));
		});
	}, 1500);
});
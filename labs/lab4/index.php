<!-- encapsulating the php code in a script tag so that the php twets array can be used in javascript -->
<?php
	require_once('TwitterAPIExchange.php');
	/* above imports the twitter api functionality
			provided by j7mbo at https:\\github.com/J7mbo/twitter-api-php */
	$settings = array(
		'oauth_access_token' => "118285131-SPuBN9vASoUW8WGPcci9LQq42LTDiJgqVLf1po11",
		'oauth_access_token_secret' => "xOcMOh5wbIl8vZpbue8xlwhsWOXPqzUCYiSzXr3nLAgch",
		'consumer_key' => "zV4V7BI1TainNbCqcvNukQ" ,
		'consumer_secret' => "jsGEvqIZ95yBiBOTx84TpXTxuDUQiuLZvpvSzO87Lo"
	);
	$url = "https://api.twitter.com/1.1/statuses/user_timeline.json";
	$requestMethod = "GET";
	$getfield = '?screen_name=panteravaca&count=50';
	
	$twitter = new TwitterAPIExchange($settings);

	$string = json_decode($twitter->setGetfield($getfield)
													->buildOauth($url, $requestMethod)
													->performRequest(), $assoc = TRUE);
	$tweets = array();
	foreach($string as $items){
		$tweets[] = $items["text"];
	};

	$js_tweets = json_encode($tweets);

?>
<!DOCTYPE html>
<html class="no-js" lang="en">
  <head>
	  <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Twicker: The Tweet Ticker</title>
    
    <link rel="icon" type="image/png" href="pngs/Communication/twitter.png"/>
    
    <meta name="description" content="Twicker">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/foundation.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="https://code.jquery.com/mobile/1.4.1/jquery.mobile-1.4.1.min.css">

     
    <script src="js/vendor/modernizr.js"></script>

  </head>
  <body>
  	<article>
    	<header class="alert-box success ui-grid-a">
    		<h1 class="ui-block-a">Tweets:</h1>
    		<div class="social right ui-block-b">
    			<!-- the following is used to share the page on twitter, how fitting -->
    			<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://projects.campuslist.myrpi.org/TwickerMobile/" data-via="panteravaca" data-lang="en">Tweet</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
    		</div>
    	</header>
    	<section>
				<div class="row">
					<ul>
						
					</ul>
				</div>
    	</section>
    	<footer>
    		<h2><img src="pngs/Communication/twitter.png"/>Tweets provided by <a href="https://dev.twitter.com">Twitter API</a>. Made by <a href="http://twitter.com/panteravaca">@panteravaca</a>.<img src="pngs/Communication/twitter.png"/></h2>
    	</footer>
		</article>
    
    <!-- javascript content appended to the bottom of the document to force the script to run after the page loads -->
    <script src="js/vendor/jquery.js"></script>
    <script src="js/foundation.min.js"></script>
    <script src="https://code.jquery.com/mobile/1.4.1/jquery.mobile-1.4.1.min.js"></script>
    <script src="js/main.js"></script>
    <script>
     	$(document).foundation();
    </script>
    <script>
    	var twarr = <?php echo $js_tweets; ?>;
    	//time to interpret it in jquery
    	function displayContent(tweetarr){
				var modalb = "<li><div class='large-12 columns tweetsize'><div class='card'><div class='tweet'>";
				var modale = "</div></div></div></li>";
				for( var i =0; i<tweetarr.length; i++){
					$("div.row ul").append(modalb + tweetarr[i] + modale);
				};
				//above for loop appends every tweet to the entire ul structure
				//below code segement cycles through the content
				window.setInterval(function(){
					$("div.row ul li:first-child").each(function(){
						$("div.row ul").append($("div.row ul li:first-child"));
					});
				}, 5000);
			};
    	displayContent(twarr);
    </script>


  </body>
</html>
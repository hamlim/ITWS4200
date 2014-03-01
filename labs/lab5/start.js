var twitter = require('ntwitter');
var jf = require('jsonfile')



var twit = new twitter({
		consumer_key: "zV4V7BI1TainNbCqcvNukQ",
		consumer_secret: "jsGEvqIZ95yBiBOTx84TpXTxuDUQiuLZvpvSzO87Lo",
		access_token_key: "118285131-SPuBN9vASoUW8WGPcci9LQq42LTDiJgqVLf1po11",
		access_token_secret: "xOcMOh5wbIl8vZpbue8xlwhsWOXPqzUCYiSzXr3nLAgch"
});
var count = 0;
var file = "tweets.json"
//streaming api
twit.stream('statuses/sample', function(stream) {
	stream.on('data', function(data) {
		if(count < 10){
			count = count + 1;
			console.log(count);
			jf.writeFile("10tweets-tweets.json", data, function(err) {
  			console.log(err);
			});
		}
		else {
			stream.destroy;
		}
	});
});


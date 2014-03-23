var jf = require('jsonfile');
var fs = require('fs');

var twitter = require('ntwitter');

var twit = new twitter({
  consumer_key: "zV4V7BI1TainNbCqcvNukQ",
  consumer_secret: "jsGEvqIZ95yBiBOTx84TpXTxuDUQiuLZvpvSzO87Lo",
  access_token_key: "118285131-SPuBN9vASoUW8WGPcci9LQq42LTDiJgqVLf1po11",
  access_token_secret: "xOcMOh5wbIl8vZpbue8xlwhsWOXPqzUCYiSzXr3nLAgch"
});

var count = 0;
var log = fs.createWriteStream('nTwitter - tweets.json', {'flags': 'a'});

var sw='-73.68,42.72', ne='-73.67,42.73'; //  RPI
twit.stream('statuses/filter', {'locations':sw +','+ne},
function(stream) {
  stream.on('data', function (data) {
		if(count < 1000){
			log.write(JSON.stringify(data));
		};
		count = count + 1;
		console.log(count); //keep track of the count
  });
});

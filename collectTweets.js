var twitterAPI = require('twitter');
var twitter = new twitterAPI({
	consumer_key: "U9RL4b02ZiIBUr78DE7gA", 
	consumer_secret: "hqpjfYrUeW1rT5Qc24qSFdtVgFgOWJvwhT06tL32P4",
	access_token_key: "1430661354-cI9ayb1EgA47Vftv2o1aVNBfG3OphESHh1Qjyjl", 
	access_token_secret: "N014Hhl3wMA2d3fv9stIy8oyYilk2jvrP7pGvN13gBCIi"
});

twitter.stream("user", { track: ['AFC','AVFC','CARDIFFCITY','CFC','CPFC','EFC','FFC','HCAFC','LFC','MCFC','MUFC','NUFC','NCFC','SAINTSFC','SCFC','SUFC','SWANS','THFC','WBAFC','WHUFC']}, function(stream) {
	stream.on('data', function(data) {
		if (data.user) {
			console.log (new
				Date(data.created_at).getTime() + "; " + data.user['name'] + ": " +
				data.text);
		}
	});
});
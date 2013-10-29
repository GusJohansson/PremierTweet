var twitterAPI = require('ntwitter');
var credentials = require('./credentials.js');

var twitter = new twitterAPI({
  consumer_key: credentials.consumer_key, 
  consumer_secret: credentials.consumer_secret,
  access_token_key: credentials.access_token_key, 
  access_token_secret: credentials.access_token_secret
});
var nogeo = 0;
var tweetcount = 0;
var mongodb = require('mongodb')
  , MongoClient = mongodb.MongoClient;

MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
  if(err) {
    console.log("failed to connect to the database");
  } else {
    console.log("connected to database");
  }
  var collection = db.collection("tweet");
    // Insert a single document
  twitter.stream("user", { track: ['#AFC','#AVFC','#CARDIFFCITY','#CFC','#CPFC','#EFC','#FFC','#HCAFC','#LFC','#MCFC','#MUFC','#NUFC','#NCFC','#SAINTSFC','#SCFC','#SUFC','#SWANS','#THFC','#WBAFC','#WHUFC']}, function(stream) {
    stream.on('data', function(data) {
      if (data.user) {
        if(data.coordinates != null){
          collection.insert( {text : data.text, time : data.created_at, lat : data.coordinates['coordinates'][0],  long : data.coordinates['coordinates'][1]}, function(err, result) {
            if(err) {
                console.log("Somethin gone done fucked up");
            }
            else{
              tweetcount ++;
              console.log(tweetcount);
              console.log(result);
            }
          });
        } 
        else{
          nogeo ++;
          console.log("Tweet without geotag " + nogeo);
        }
      }
    });
  }); 
  //db.close();
  //console.log("disconnected to database");
  
});
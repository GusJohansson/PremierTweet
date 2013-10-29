var mongodb = require('mongodb')
  , MongoClient = mongodb.MongoClient;

MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
  if(err) {
    console.log("failed to connect to the database");
  } else {
    console.log("connected to database");
  }
var clubs = new Array("Arsenal", "Aston Villa", "Cardiff", "Chelsea", "Crystal Palace", "Everton", "Fulham", "Hull", "Liverpool", "Manchester City", "Manchester United", "Newcastle", "Norwich", "Southhampton",  "Stoke", "Sunderland", "Swansea", "Tottenham", "West Bromwich", "West Ham");
  //var collection = db.collection("tweet");
  
   // console.log(clubtags[i]);
  
    db.collection('tweet', function(err, collection) {
      collection.mapReduce(map, reduce, {
        out: { inline : 1},
        verbose: true
      }, function (error, results, stats) {
        //for (var i = 0; i < clubs.length; i++) { [1].value.count
          console.log(results);
        //}
        
        //console.log(stats);
        db.close();
      })
    });
  

function map() {

  var clubs = new Array("Arsenal", "Aston Villa", "Cardiff", "Chelsea", "Crystal Palace", "Everton", "Fulham", "Hull", "Liverpool", "Manchester City", "Manchester United", "Newcastle", "Norwich", "Southhampton",  "Stoke", "Sunderland", "Swansea", "Tottenham", "West Bromwich", "West Ham");
  var clubtags = new Array("#AFC", "#AVFC", "#CCFC", "#CFC", "#CPFC", "#EFC", "#FFC", "#HCAFC", "#LFC", "#MCFC", "#MUFC", "#NUFC", "#NCFC", "#SAINTSFC", "#SCFC", "#SAFC", "#SWANS", "#THFC", "#WBAFC", "#WHUFC");
  
  var locations = new Array("England", "TheNorth");
  
  var lat1 = new Array(49, 54);
  var lat2 = new Array(59, 71);
  var lon1 = new Array(-8, 5);
  var lon2 = new Array(2, 33);
  var latitude = parseInt(this.long);
  var longitude = parseInt(this.lat);
  
  for (var i = 0; i < clubs.length; i++) {
    if (this.text.indexOf(clubtags[i]) != -1) {
      for (var o = 0; o < locations.length; o++) {
        if(latitude > lat1[o] )
        {
          if(latitude < lat2[o])
          {
            if(longitude > lon1[o])
            {
              if(longitude < lon2[o])
              {
                emit(clubs[i] + locations[o], { "count": 1});
              }  
            }  
          }  
        }
      }
    } 
  }
}

function reduce(key, values) {
  var sum = 0;
  values.forEach(function(doc) {
        sum = sum + doc['count'];
    });
    return {count: sum};
}
  /*
  var item;
  var collection = db.collection("tweet");
  var items = collection.find();
  var count = 0;
  console.log(items);
  while(items.hasNext) {
    item = items.next();
    count ++;
    console.log(count);
  }
  */
});
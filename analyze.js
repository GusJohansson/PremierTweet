var mongodb = require('mongodb')
  , MongoClient = mongodb.MongoClient;

var mysql = require('mysql');

var dbvar = require('./dbvar.js');

var connection = mysql.createConnection({
  host     : dbvar.host,
  user     : dbvar.user,
  password : dbvar.password
});

connection.connect(function(err) {
  if(err) {
    console.log(err);
  }else {
    console.log("connected to mysql database");
  }
});

MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
  if(err) {
    console.log("failed to connect to the mongo database");
  } else {
    console.log("connected to mongo database");
  }

var clubs = new Array("Arsenal", "Aston Villa", "Cardiff", "Chelsea", "Crystal Palace", "Everton", "Fulham", "Hull", "Liverpool", "Manchester City", "Manchester United", "Newcastle", "Norwich", "Southhampton",  "Stoke", "Sunderland", "Swansea", "Tottenham", "West Bromwich", "West Ham");
var locations = new Array();
for (var i = 10; i <=90; i++) 
{
  locations.push(i);
}


    db.collection('tweet', function(err, collection) {
      collection.mapReduce(map, reduce, {
        out: { inline : 1},
        verbose: true
      }, function (error, results, stats) {
         console.log(results);
          
          var sql    = 'TRUNCATE TABLE gj222af.club_location ';
            connection.query(sql, function(err, results) {
              if(err) {
                console.log("failed to TRUNCATE :(");
              } 
            });
          
          for (var i = 0; i < results.length; i++) {

            var amount = results[i].value.count;

            for (var o = 0; o < clubs.length; o++) {
              if(results[i]._id.indexOf(clubs[o]) != -1){

                var club = o + 1; 

                for (var u = 0; u < locations.length; u++) {
                  if(results[i]._id.indexOf(locations[u]) != -1){

                    var location = u + 1;
                    console.log("Klubbens id: " + club + " - Locations id: " + location + " - Antal tweets: " + amount)
                    var post  = {club_name: clubs[o], l_id: locations[u], count: amount};
                    query = connection.query('INSERT INTO gj222af.club_location SET ?', post, function(err, result) {
                      if(err) {
                        console.log(err);
                      } 
                    });

                  }
                }
              }
            }       
          }
          db.close();
          connection.end();
      })
    });
  

function map() {

  var clubs = new Array("Arsenal", "Aston Villa", "Cardiff", "Chelsea", "Crystal Palace", "Everton", "Fulham", "Hull", "Liverpool", "Manchester City", "Manchester United", "Newcastle", "Norwich", "Southhampton",  "Stoke", "Sunderland", "Swansea", "Tottenham", "West Bromwich", "West Ham");
  var clubtags = new Array("#AFC", "#AVFC", "#CCFC", "#CFC", "#CPFC", "#EFC", "#FFC", "#HCAFC", "#LFC", "#MCFC", "#MUFC", "#NUFC", "#NCFC", "#SAINTSFC", "#SCFC", "#SAFC", "#SWANS", "#THFC", "#WBAFC", "#WHUFC");
  
  var locations = new Array("1", "2", "3", "4");
  
  var lat1 = new Array(59, 58, 57, 56, 55, 54, 53, 52, 51);
  var lat2 = new Array(58, 57, 56, 55, 54, 53, 52, 51, 50);
  var lon1 = new Array(-8, -7, -6, -5, -4, -3, -2, -1, 0, 1);
  var lon2 = new Array(-7, -6, -5, -4, -3, -2, -1, 0, 1, 2);
  var latitude = parseFloat(this.long);
  var longitude = parseFloat(this.lat);
  
  for (var i = 0; i < clubs.length; i++) {
    if (this.text.indexOf(clubtags[i]) != -1) {
      for (var o = 0; o < lat1.length; o++) {
        if(latitude < lat1[o])
        {
          if(latitude > lat2[o])
          {
            for(var u = 0; u < lat1.length; u++) {
              if(longitude > lon1[u])
              {
                if(longitude < lon2[u])
                {
                  o= o+1
                  emit(clubs[i] + o + u, { "count": 1});

                }  
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
});
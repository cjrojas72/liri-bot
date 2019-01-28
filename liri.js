require("dotenv").config();

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require('moment');

var action = process.argv[2];
var userObj = process.argv[3];

var queryUrl = "http://www.omdbapi.com/?t=" + userObj + "&y=&plot=short&apikey=trilogy";


console.log(queryUrl);


switch(action){
  case "concert-this":
    break;

  case "spotify-this-song":
    spotify.search({ type: 'track', query: userObj }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data.tracks.items[0].artists); 
    });
    break;
  
  case "movie-this":
    axios.get(queryUrl).then(
    function(response){
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("Rating: " + response.data.Rated);
      console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Rating: " + response.data.Rated);
      console.log("Actors: " + response.data.Actors);
    }
    )
    break;

  case "do-what-it-says":
    break;
}


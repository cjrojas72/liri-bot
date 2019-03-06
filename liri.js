require("dotenv").config();

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require('moment');

var action = process.argv[2];
var userObj = process.argv[3];


switch(action){
  case "concert-this":
  let queryUrl = `https://rest.bandsintown.com/artists/${userObj}/events?app_id=codingbootcamp`;
  axios.get(queryUrl).then(
    function(response) {
      const data = response.data[0];
      const time = data.datetime.replace("T", " ");
      const convertedTime = moment(time, "YYYY-MM-DD HH:mm:ss").format("MMM Do, YYYY hh:mmA");
      console.log(`Venue Name: ${data.venue.name}`);
      console.log(`Venue Location: ${data.venue.city}, ${data.venue.region}`);
      console.log(`Date: ${convertedTime}`);
    });

    break;

  case "spotify-this-song":
    spotify.search({ type: 'track', query: userObj }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("Artists: " + data.tracks.items[0].artists[0].name); 
    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("Album: " + data.tracks.items[0].album.name);
    });
    break;
  
  case "movie-this":
  let queryUrlm = `http://www.omdbapi.com/?t=${userObj}&y=&plot=short&apikey=trilogy`;
    axios.get(queryUrlm).then(
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


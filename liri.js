require("dotenv").config();


var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

spotify.search({
     type: 'track', 
     query: 'All the Small Things'
}, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
var songs = data.tracks.items;
 for (var i=0; 1<songs.length; i++) {
  console.log(songs[i].name);   
 }
    
});
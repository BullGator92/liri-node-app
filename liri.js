require("dotenv").config();


var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
console.log(process.argv);

spotify.search({
     type: 'track',
     query: process.argv[2]
}, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
var songs = data.tracks.items;
 for (var i=0; i<songs.length; i++) {
  console.log(songs[i].name); 
    
 }
    console.log(data);
});
require("dotenv").config();


var Spotify = require('node-spotify-api');
var bandsintown = require('bandsintown')(APP_ID);
var keys = require("./keys.js");


var spotify = new Spotify(keys.spotify);
console.log(process.argv);

var getArtistNames = function (artist) {
    return artist.name;
}

var getSpotifySongs = function (songName) {
    spotify.search({
        type: 'track',
        query: songName
    }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log('artist(s): ' + songs[i] artists map(getArtistNames));
            console.log('song name: ' + songs[i] name);
            console.log('preview song: ' + songs[i] preview_url);
            console.log('album: ' + songs[i] album name);
            console.log('-----------------------------------')

        }
        console.log(data);
    });
}

bandsintown.getArtistEventList('Skrillex')
    .then(function (events) {
        // return array of events
    });


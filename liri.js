require("dotenv").config();
var keys = require('./keys');
var Spotify = require('node-spotify-api');
//added to format table 
// var cTable = require('console.table');
var request = require('request');
var moment = require('moment');
var fs = require("fs");

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

if (process.argv[2] == 'concert-this') {

    var artist = process.argv.slice(3).join(" ")
    console.log(artist);

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(queryURL, function (error, response, body) {
        if (error) console.log(error);
        var result = JSON.parse(body);
        // console.log(response);
        // console.log(body);
        // console.log(result);
        for (var i = 0; i < result.length; i++) {

            console.log("Venue name " + result[i].venue.name);
            console.log("Venue location " + result[i].venue.city);
            console.log("Date of Event " + moment(result[i].datetime).format("MM/DD/YYYY"));
        }
    });

    // Name of the venue
    // Venue location
    // Date of the Event (use moment to format this as "MM/DD/YYYY")   
} else if (process.argv[2] == 'spotify-this-song') {

    var songName = process.argv.slice(3).join(" ");

    if (!songName) {
        songName = "The Sign";
    }

    spotify.search({ type: 'track', query: songName, limit: 10 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // console.log(data.tracks);
        for (var i = 0; i < data.tracks.items.length; i++) {
            // var result = {
            console.log('artist: ' + data.tracks.items[i].album.artists[0].name,
                'album_name: ' + data.tracks.items[i].album.name,
                'song_name: ' + data.tracks.items[i].name,
                'preview_url: ' + data.tracks.items[i].preview_url);
            // }
            // tableArray.push(result);
        }
    });

    // var tableArray = [];



    // var table = cTable.getTable(tableArray);

    // console.log(table);


    // If no song is provided then your program will default to "The Sign" by Ace of Base.
} else if (process.argv[2] == 'movie-this') {
    var movieName = process.argv.slice(3).join(" ");

    if (!movieName) {
        movieName = "Mr. Nobody";
    }

    request("https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {



        var result = JSON.parse(body);
        console.log("Title :" + result.Title);
        console.log("Year :" + result.Released);
        console.log("IMDB Rating :" + result.imdbRating);
        console.log("Rotten Tomatoes :" + result.Ratings[1].Value);
        console.log("Country :" + result.Country);
        console.log("Language :" + result.Language);
        console.log("Movie Plot :" + result.Plot);
        console.log("Actors :" + result.Actors);
    });

} else if (process.argv[2] == 'do-what-it-says') {

    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            pick(dataArr[0]);
        }

        // We will then re-display the content as an array for later use.
        // console.log(dataArr);

        // console.log('do what it says')
    });
  };

//  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }

//   console.log(data); 
//   });

'use strict';

let mongoose = require('mongoose');
let request = require('request');
let moment = require('moment');
let CronJob = require('cron').CronJob;

new CronJob('0 9 * * *', function() {
  dailyRankingsRequest();
}, null, true, 'America/New_York');

let dateAndTime = moment().format('MM-DD-YY hh:mm A');
let date = moment().format('MM-DD-YY');

let Schema = mongoose.Schema;

function loopEntries(entryArray) {
    for(let i =0;i<entryArray.length;i=i+1){
        // blank "clean" object to add data to
        let cleanObj = {};

        // Add data fields
        cleanObj.songName = entryArray[i]["im:name"]["label"];
        cleanObj.artist = entryArray[i]["im:artist"]["label"];
        cleanObj.genre = entryArray[i]["category"]["attributes"]["term"];
        cleanObj.rank = i;
        cleanObj.releaseDate = entryArray[i]["im:releaseDate"]["label"];
        cleanObj.dateAndTime = dateAndTime;
        cleanObj.date = date;
        
        // push each clean object to mongoose
        let SongModel = Song;
        SongModel.create(cleanObj, function(err, result){
            console.log("Updated Song with id of ", result._id);
        });
    }
}

function dailyRankingsRequest() {
    request('https://itunes.apple.com/us/rss/topsongs/limit=100/explicit=true/json', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    
    // this is not yet working. I think I need to make body an object
    let json = JSON.parse(body); // string to object
    let entries = json.feed.entry; // this part should be an array of objects
    loopEntries(entries);
    });
}

let songsRankingsSchema = new Schema({
    songName: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true
    },
    releaseDate: {
        type: String,
        required: true
    },
    artistImage: {
        type: String
    },
    songPreview: {
        type: String
    },
   songLink: {
        type: String
    },
    artistLink: {
        type: String
    },
    dateAndTime: {
        type: String
    },
    date: {
        type: String
    }
});

let Song = mongoose.model('Song', songsRankingsSchema);

mongoose.connect('mongodb://localhost/songsRankings', function(err){
   if (err){
       console.error(err);
   } else {
       console.log('connected to songs rankings database');
   }
});

let showSongs = function () {
    Song.find({}, function(err, result){
        if (err){
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
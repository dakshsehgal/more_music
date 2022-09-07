const Router = require('express').Router()
const axios = require('axios')
const config = require('../utils/config')
const baseUrl = 'https://api.spotify.com/v1'

var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    //redirectUri: 'http://www.example.com/callback'
});



//spotifyApi.setAccessToken(config.ACCESS_TOKEN)
spotifyApi.clientCredentialsGrant().then(
    function (data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
    },
    function (err) {
        console.log('Something went wrong when retrieving an access token', err);
    }
);

Router.get('/search/:query', (req, res) => {
    var query = req.params.query
    const ENTRIES_LIMIT = 2
    spotifyApi.searchTracks(query, { limit: ENTRIES_LIMIT })
        .then(function (data) {

            var toReturn = []
            for (var i = 0; i < ENTRIES_LIMIT; i++) {
                var artistList = []

                for (var j = 0; j < data.body.tracks.items[i].artists.length; j++) {
                    artistList[j] = data.body.tracks.items[i].artists[j].name
                }

                const newObj = {
                    "name": data.body.tracks.items[i].name,
                    "img_url": data.body.tracks.items[i].album.images[1].url,
                    "artists": artistList,
                    "id": data.body.tracks.items[i].id,
                    "preview": data.body.tracks.items[i].preview_url
                }
                toReturn[i] = newObj

            }


            res.json(toReturn)

        }, function (err) {
            console.error(err);
            if (err.name === "WebapiRegularError") {
                spotifyApi.clientCredentialsGrant().then(
                    function (data) {
                        console.log('The access token expires in ' + data.body['expires_in']);
                        console.log('The access token is ' + data.body['access_token']);
                
                        // Save the access token so that it's used in future calls
                        spotifyApi.setAccessToken(data.body['access_token']);
                    },
                    function (err) {
                        console.log('Something went wrong when retrieving an access token', err);
                    }
                );
            }
            
        });
    


})

Router.get('/features/:id', (req, res) => {
    const id = req.params.id
    spotifyApi.getAudioFeaturesForTrack(id)
        .then(data => {
            
            res.json(data.body)
        })
        .catch(err => console.log(err))
})

Router.post('/recommendations', (req, res) => {
    const seed = req.body
    console.log('the seed given is', seed)
   
    spotifyApi.getRecommendations(seed)
        .then(data => {
            res.json(data)
        })
        .catch(err => console.log(err))
})

module.exports = Router
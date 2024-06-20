var express = require('express');
var app = express();
let middleware = require('./middleware');
var Favourites = require('../model/favouritesModel.js');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({ extended: false });

// Endpoint to add an item to favourites
app.post('/api/addToFavourites', [middleware.checkToken, jsonParser], function (req, res) {
    var memberId = req.body.memberId;
    var itemId = req.body.itemId;
    Favourites.addFavourite(memberId, itemId)
        .then((result) => {
            res.json({ success: true, message: 'Added to favourites', result: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ success: false, message: "Failed to add to favourites" });
        });
});

// Endpoint to remove an item from favourites
app.delete('/api/removeFromFavourites', [middleware.checkToken, jsonParser], function (req, res) {
    var memberId = req.body.memberId;
    var itemId = req.body.itemId;
    Favourites.removeFavourite(memberId, itemId)
        .then((result) => {
            res.json({ success: true, message: 'Removed from favourites', result: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ success: false, message: "Failed to remove from favourites" });
        });
});

// Endpoint to get all favourites for a member
app.get('/api/getFavourites/:memberId', middleware.checkToken, function (req, res) {
    var memberId = req.params.memberId;
    Favourites.getFavourites(memberId)
        .then((result) => {
            res.json({ success: true, favourites: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ success: false, message: "Failed to get favourites" });
        });
});

module.exports = app;

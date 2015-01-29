/**
 * @module posts-route
 * @description This is the routes module for the posts - CRUD operations
 * */

var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts').PostModel;

// all the paths are relative to /posts

router.get('/', function (req, res) {
    res.render('posts');
});

router.get('/all', function (req, res) {

    // get a list of all the titles for all posts
    PostModel.find({}, { title: true, _id: true }, function (err, results) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(results);
        }
    });
    // send a response to the user to show it

});
router.get('/:id', function (req, res) {

    // get a list of all the titles for all posts
    PostModel.findById(req.params.id, function (err, results) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(results);
        }
    });
    // send a response to the user to show it

});

router.post('/', function(req, res) {
    var post = new PostModel(req.body);
    post.save(function (err, result) {
        if (err) sendErrorResponse(err, res);
        else res.status(200).json(result);
    });
});

function sendErrorResponse(err, res) {
    res.status(500).json(err);
}
// testPostCreation();

function testPostCreation() {
    // create a new post
    var post = new PostModel({
        title: 'Talin\'s awesome UI research',
        body: 'All about websockets'
    });

    // save the post
    post.save(function (err, result) {
        if (err) {
            console.log('something went wrong with mongoose ... ');
            console.log(err);
        } else {
            console.log('Created the post successfully.');
            console.log('The id of the post created is: ' + result._id);
        }
    });
}

module.exports = router;
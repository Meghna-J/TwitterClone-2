const mongoose = require('mongoose');
const querystring = require('querystring');

let num = 0;
const Tweet = require('../models/tweets');
const User = require('../models/users');

module.exports.getTweetDetails = (req, res, next) => {
    const {id} = req.params;
    console.log(id);
    // console.log(id);
    // const showTweet = Tweet.find((tweet)=>tweet.id==parseInt(id));
    // // console.log(showTweet[0]);
    // res.render('tweetDetails',showTweet[0]);
    Tweet.findById(id)
        .then((tweet) => {
            // console.log(tweetId)
            // console.log(tweet);
            res.render('tweetDetails', {
                tweet
            })
        })
}

module.exports.getReplyCard = (req,res,next) => {
    const {id} = req.params;
    // const showTweet = tweets.filter((tweet)=>tweet.id==parseInt(id));
    Tweet.findById(id)
        .then((tweet)=>{
            res.render('replyCard',tweet);
        })
}

module.exports.postReplyTweet = (req,res,next) => {
    const {replyContent} = req.body;
    // console.log(replyContent);
    const {id} = req.params;
    // let user = 
    // const tweet = tweets.filter((tweet)=>tweet.id==parseInt(id));
    Tweet.findById(id)
        .then((tweet)=>{
            // if(tweet.reply==undefined){
            //     tweet.reply = [];
            // }
            // res.render('replyCard',tweet);
            tweet.reply.push({
                replyContent: replyContent,
                // name: login[0].name1,
                // username: login[0].username1
            })
            console.log(tweet.liked);
            console.log(tweet.likes);
            tweet.save();
            res.redirect(`/tweet/${id}`);
        })
    // console.log(replyContent);
    // console.log(tweet[0].id);
    
    // res.redirect('/tweet/:id');
}

module.exports.getLikeCount = (req,res,next)=>{
    const {id} = req.params;
    Tweet.findById(id)
        .then((tweet)=>{
            if(tweet.liked==false){
                //Like the tweet
                tweet.liked=true;
                tweet.likes++;
            }
            else{
                //Unlike the tweet
                tweet.liked=false;
                tweet.likes--;
            }
            console.log(tweet.liked);
            console.log(tweet.likes);
            res.redirect(`/tweet/${id}`);
        })
    // const tweet = tweets.filter((tweet)=>tweet.id==parseInt(id));
    // if(tweet.liked==false){
    //     tweet.liked=true;
    //     tweet.likes++;
    // }
    // else{
    //     tweet.liked=false;
    //     tweet.likes--;
    // }
    // res.redirect(`/tweet/${id}`);
}
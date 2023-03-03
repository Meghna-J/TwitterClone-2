// without db use
let login=[
    {
        email:"mj@gmail.com",
        pwd:"abs",
        profileImg:"/pics/login_img.webp",
        username1:"@hello",
        name1:"Hello"
    }
]
const mongoose = require('mongoose');
// var querystring = require('querystring');
// let tweets=[
//     {
//         id:1,
//         name:"Lorem Ipsum",
//         username1:"@loremip",
//         date:"7 Jan",
//         time:"12:00:00",
//         tweetContent:"Bleh Bleh Bleh",
//         imgdp:"/pics/profiledp.jpg",
//         reply:[
//             {
//                 replyTweet:"Nice tweet",
//                 name:"Lorem Ipsum",
//                 username:"@Lorem"
//             },
//             {
//                 replyTweet:"Great post",
//                 name:"Lorem Ipsum",
//                 username:"@Lorem"
//             },
//             {
//                 replyTweet:"Omg",
//                 name:"Lorem Ipsum",
//                 username:"@Lorem"
//             }
//         ],
//         likes:7,
//         liked:true
//     },
//     {
//         id:2,
//         name:"Lorem Ipsum",
//         username:"@loremip",
//         date:"7 Jan",
//         time:"12:00:00",
//         tweetContent:"Bleh Bleh Bleh",
//         imgdp:"/pics/profiledp.jpg",
//         likes:0,
//         liked:false
//     },
//     {
//         id:3,
//         name:"Lorem Ipsum",
//         username:"@loremip",
//         date:"7 Jan",
//         time:"12:00:00",
//         tweetContent:"Bleh Bleh Bleh",
//         imgdp:"/pics/profiledp.jpg",
//         likes:8,
//         liked:false
//     },
//     {
//         id:4,
//         name:"Lorem Ipsum",
//         username:"@loremip",
//         date:"7 Jan",
//         time:"12:00:00",
//         tweetContent:"Bleh Bleh Bleh",
//         imgdp:"/pics/profiledp.jpg",
//         likes:5,
//         liked:false
//     },
//     {
//         id:5,
//         name:"Lorem Ipsum",
//         username:"@loremip",
//         date:"7 Jan",
//         time:"12:00:00",
//         tweetContent:"Bleh Bleh Bleh",
//         imgdp:"/pics/profiledp.jpg",
//         likes:3,
//         liked:false
//     }
// ]
const querystring = require('querystring');

let num = 0;
const Tweet = require('../models/tweets');
module.exports.getTweets = (req,res,next)=>{
    // res.render('home',{
    //     tweets
    // });
    // const {title,blogContent,imgUrl} = req.body;
    // let {userId} = req.params;
    // console.log(user._id);
    
    let userId = req.query.id;
    // console.log(userId);
    Tweet.find({}).then((tweets)=>{
        // console.log(tweets);
        res.render('home',{
            tweets:tweets,
            userId:userId
        })
    })

};

module.exports.getNewTweetCard = (req,res,next)=>{
    let userId = req.params;
    console.log(userId.id);
    res.render('newTweet',{
        userId:userId.id
    });
}

module.exports.postCreateTweets = (req, res, next) => {
    
    // //Generating date
    // var timestamp = Date.now();
    // var x = new Date(timestamp) +"";
    // //var md = x.toString;
    // var d = x.split("G")[0].split(' ');

    // const {tweetContent} = req.body;
    // let obj = login[0];
    // tweets.push({
    //     id:num,
    //     name: obj.name1,
    //     username: obj.username1,
    //     date: d[1]+' '+d[2]+' '+d[3]+' ',
    //     time:d[4],
    //     tweetContent,
    //     imgdp:obj.profileImg
    // })
    // // console.log(tweets[num-1]);
    // num++;
    // res.redirect('/home');
    {
        var timestamp = Date.now();
        var x = new Date(timestamp) +"";
        //var md = x.toString;
        var d = x.split("G")[0].split(' ');
        num++;
        // let obj = login[0];
        // console.log(obj.profileImg)
        
        let userId = req.params;
        // console.log(userId);
        
        const {tweetContent} = req.body;
        const newTweet = new Tweet({
            userId:mongoose.Types.ObjectId(userId),
            id:num,
            // name: obj.name1,
            // username: obj.username1,
            date: d[1]+' '+d[2]+' '+d[3]+' ',
            time:d[4],
            tweetContent,
            // imgdp:obj.profileImg, //mistake
            reply:[]
        });
        // console.log(newTweet);
        // console.log(userId.id);
        
        newTweet.save()
            .then(() => {
                res.redirect('/home?id=' + userId.id);
            }).catch(err => console.log(err));
    }
}

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
                username: login[0].username1
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
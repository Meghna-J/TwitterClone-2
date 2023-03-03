const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    replyContent:String,
    username:String
})

const tweetSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users', // Model name
        // required:true
    },
    id:{
        type:Number,
        required:true
    },
    // name:{
    //     type:String,
    //     required:true
    // },
    // username:{
    //     type:String,
    //     required:true
    // },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    tweetContent: {
        type:String,
        required:true
    },
    imagedp:{
        type:String,
        // required:true
    },
    // userId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'users' // Model name
    // }  
    reply:{type:[replySchema]},
    likes:{
        type:Number,
        // default:0
    },
    liked:{
        type:Boolean,
        // default:false
    }
});

module.exports = mongoose.model('tweet',tweetSchema);
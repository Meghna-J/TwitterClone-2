const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/tweets');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        requred:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('users',userSchema);

const express = require('express');
const session = require('express-session');
// const app = express();
const PORT = 4444;
const hbs = require('hbs');
const path = require('path');
const app = require('express')();
const mongoose = require('mongoose');
const User = require('./models/users');
const passport = require('./passport');
var querystring = require('querystring');


// const { mongoConnect } = require("./databases/database");

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'static')));
// app.use((req,res,next)=>{
//     // 63d26584826f6fc2800e3a2e
//     User.findById("63d26584826f6fc2800e3a2e")
//     .then((user)=>{
//         console.log("User",user);
//         req.user = user;
//         next();
//     }).catch(err=>console.log(err));
// })

app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}))

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));

hbs.registerPartials(__dirname + '/views/partials');

//HANDLING MAIN REQUESTS
const mainHandler = require('./routes/main');
app.use('/', mainHandler);

//Perform CRUD operations on tweets
const tweetsHandler = require('./routes/tweets').router;
app.use('/home',tweetsHandler);

const tweetDetailsHandler = require('./routes/tweetdetails').router;
app.use('/tweet',tweetDetailsHandler);

const accountHandler = require('./routes/account').router;
app.use('/account',accountHandler);

// AUTHENTICATION
app.get('/signup', (req, res) => {
    res.render('signup');
})

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    let newUser = new User({ username, password });
    newUser.save();
    res.redirect('/');
})

app.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// app.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/' }),
//   function(req, res) {
//     res.redirect('/home');
// });

// process the login form
app.post('/login', function(req, res, next) {
    passport.authenticate('local', {failureFlash:true}, function(err, user, info) {
     if (err) { return next(err); }
     if (!user) { return res.redirect('/'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
     return res.redirect('/home?id=' + user._id);
   });
  })(req, res, next);
  });


mongoose
    .connect('mongodb://127.0.0.1:27017/tweets')
    .then(()=>{
        console.log("DB Connection success");
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        })
    })
    .catch(err=>console.log(err))
  
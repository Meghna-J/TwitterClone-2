const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/users');
passport.use(new LocalStrategy(
    function (username, password, done) {
        // console.log(username,password);
        User.findOne(
            { username: username },
            function (err, user) {
                if (err) { 
                    // console.log(err);
                    return done(err); 
                }
                if (!user) { return done(null, false); }
                return done(null, user);
            });
    }
))

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

module.exports = passport;
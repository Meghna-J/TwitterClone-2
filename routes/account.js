//Galti h = Users not uniquely created and identified
const router = require('express').Router();

const accountHandler = require('../controllers/accountHandler');
const tweets = require('../controllers/tweetsHandler')
const { route } = require('./main');
router.get(`/${tweets.id}`,accountHandler.getAccount);
// console.log(tweets.id);

module.exports.router = router;
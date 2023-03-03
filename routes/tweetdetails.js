const router = require('express').Router();

const tweetDetailsHandler = require('../controllers/tweetDetailsHandler.js');
const { route } = require('./main');

router.get('/',tweetDetailsHandler.getTweetDetails);
router.get('/:id',tweetDetailsHandler.getTweetDetails);
router.get('/:id/reply',tweetDetailsHandler.getReplyCard);
router.post('/:id/reply',tweetDetailsHandler.postReplyTweet);
router.get('/:id/likes',tweetDetailsHandler.getLikeCount);


module.exports.router = router;
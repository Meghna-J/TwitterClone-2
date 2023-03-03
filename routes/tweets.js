const router = require('express').Router();

const tweetsHandler = require('../controllers/tweetsHandler');
const { route } = require('./main');

router.get('/',tweetsHandler.getTweets);
router.get('/:id',tweetsHandler.getTweets);
router.get('/:id/newTweet',tweetsHandler.getNewTweetCard);
router.post('/:id/create',tweetsHandler.postCreateTweets);

// !!!!!// router.get('/create',tweetsHandler.getCreateTweets);
router.get('/:id',tweetsHandler.getTweetDetails);
// router.get('/:id/reply',tweetsHandler.getReplyCard);
// router.post('/:id/reply',tweetsHandler.postReplyTweet);
// router.get('/:id/likes',tweetsHandler.getLikeCount);

module.exports.router = router;
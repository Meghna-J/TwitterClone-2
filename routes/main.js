const router = require('express').Router();

const mainHandler = require('../controllers/mainHandler');
router.get('/',mainHandler.getmain);

module.exports = router;
const { Router } = require('express');
const ping = require('./ping');
const copy = require('./copy');
const chatbox = require('./chatbox');
const errorCatch = require('../../utils/errorCatch');

const router = Router();
router.use('/ping', errorCatch(ping));
router.use('/copy', errorCatch(copy));
router.use('/chatbox', chatbox);

module.exports = router;
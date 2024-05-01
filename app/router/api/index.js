const { Router } = require('express');
const ping = require('./ping');
const copy = require('./copy');
const chatbox = require('./chatbox');

const router = Router();
router.use('/ping', ping);
router.use('/copy', copy);
router.use('/chatbox', chatbox);

module.exports = router;
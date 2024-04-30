const { Router } = require('express');
const ping = require('./ping');
const copy = require('./copy');

const router = Router();
router.use('/ping', ping);
router.use('/copy', copy);

module.exports = router;
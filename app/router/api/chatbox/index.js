const { Router } = require('express');
const input = require('./input');
const typing = require('./typing');
const errorCatch = require('../../../utils/errorCatch');

const router = Router();
router.use('/input', errorCatch(input));
router.use('/typing', errorCatch(typing));

module.exports = router;
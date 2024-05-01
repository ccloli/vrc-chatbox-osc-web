const { Router } = require('express');
const input = require('./input');
const typing = require('./typing');

const router = Router();
router.use('/input', input);
router.use('/typing', typing);

module.exports = router;
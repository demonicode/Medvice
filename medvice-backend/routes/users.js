const express = require('express');
const {authenticate} = require('../middlewares/auth');
const {profile, records} = require('../controllers/user');

const router = express.Router();

router.get('/profile', authenticate, profile);
router.get('/records', authenticate, records);

module.exports = router;

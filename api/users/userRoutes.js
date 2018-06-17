const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Helper = require('./userHelper')

router.post('/register', Helper.registerNewUser);
router.post('/login', Helper.userLogin);
router.get('/profile', passport.authenticate('jwt', { session: false }), Helper.getProfile)

module.exports = router;

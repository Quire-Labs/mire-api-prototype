const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const config = require('../../env/secretkeys/secret');
const User = require('./userModel');



function registerNewUser(req, res) {

 if (req.body.password !== req.body.passwordconfirm) {
   res.status(400).json({ success: false, msg: 'Passwords do not match.' });
   return;
  }

  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  newUser.save((err) => {

    if(err) {
      if (err.errors) {

        if (err.errors.name) {
          res.status(400).json({ success: false, msg: err.errors.name.message });
          return;
        }

        if (err.errors.email) {
          res.status(400).json({ success: false, msg: err.errors.email.message });
          return;
        }

        if (err.errors.username) {
          res.status(400).json({ success: false, msg: err.errors.username.message });
          return;
        }

        if (err.errors.password) {
          res.status(400).json({ success: false, msg: err.errors.password.message });
          return;
        }

        // Show failed if all else fails for some reasons
        res.status(400).json( { success: false, msg: 'Failed to register.'});
      }
    }

    else {
      res.json({ success: true, msg: 'User successfully registered.' });
    }
  });
}

function userLogin(req, res) {

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }, (err, user) => {

    if (err) throw err;

    if (!user) {
      return res.status(400).json({ success: false, msg: 'User not found.' });
    }

    bcrypt.compare(password, user.password, function(err, isMatch) {
      if (err) throw err;

      if (isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });

        return res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username
          }
        });
      }
      else {
        return res.status(400).json({ success: false, msg: 'Wrong password.' });
      }
    });
  });

}

function getProfile(req, res) {
  res.json({ user: req.user });
}


module.exports = {
  registerNewUser,
  userLogin,
  getProfile
}

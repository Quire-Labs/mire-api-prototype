const routes = require('express').Router();
const userRoutes = require('./helpers/userHelper.js')

routes.get('/', (req, res) => {
  res.status(200).json({ message: userRoutes.setmessage() });
});

module.exports = routes;

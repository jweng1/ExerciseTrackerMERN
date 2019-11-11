const router = require('express').Router();
let User = require('../models/user.model'); //mongoose model
//when we want to retrive incoming get requests
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//use post request when we want to add a new user to database
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const newUser = new User({username}); //initialize new user

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

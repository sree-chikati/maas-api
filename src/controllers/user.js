const express = require('express')
const router = express.Router()
const User = require('../models/user')

// GET route: Retreives all users
router.get('/', (req, res) => {
    User.find().then((users) => {
        return res.json({users})
    })
    .catch((err) => {
        throw err.message
    });
})

// GET route: Retreives specific user using user:id
router.get('/:userId', (req, res) => {
    User.findOne({_id: req.params.userId})
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        throw err.message
    })
})

// POST route: Creates a new user
router.post('/', (req, res) => {
    // POST localhost:3000/users/
    let user = new User(req.body)
    user
    .save()
    .then(userResult => {
        return res.json({user: userResult})
    })
    .catch((err) => {
        throw err.message
    })
})

// PUT route: updates user we created 
router.put('/:userId', (req, res) => {
    User.findByIdAndUpdate(req.params.userId, req.body)
    .then(() => {
        return User.findOne({_id: req.params.userId})
    })
    .then((user) => {
        return res.json({user})
    })
    .catch((err) => {
        throw err.message
    })
})

// DELELTE route: Should delete a user 
router.delete('/:userId', (req, res) => {
    User.findByIdAndDelete(req.params.userId)
    .then((result) => {
        if (result === null) {
            return res.json({message: 'User does not exist.'})
        }
        return res.json({
            'message': 'Successfully deleted.',
            '_id': req.params.userId
        })
    })
    .catch((err) => {
        throw err.message
    })
})


module.exports = router
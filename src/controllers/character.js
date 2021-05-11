const express = require('express')
const router = express.Router();

const User = require('../models/user')
const Character = require('../models/character')

// GET route: Retreives all characters
router.get('/', (req, res) => {
    Character.find().then((characters) => {
        return res.json({ characters })
    })
    .catch((err) => {
        throw err.message
    })
})

// GET route: Retreives specific character using character:id
router.get('/:characterId', (req, res) => {
    Character.findOne({ _id: req.params.characterId })
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        throw err.message
    })
})

// POST Route: Creates a new character
router.post('/', (req, res) => {
    let character = new Character(req.body)
    character.save()
    .then(character => {
        return User.findById(character.author)
    })
    .then(user => {
        // console.log(user)
        user.characters.unshift(character)
        return user.save()
    })
    .then(() => {
        return res.send(character)
    }).catch(err => {
        throw err.message
    })
})

// PUT route: updates character we created
router.put('/:characterId', (req, res) => {
    Character.findByIdAndUpdate(req.params.characterId, req.body)
    .then(() => {
        return Character.findById({ _id: req.params.characterId })
    })
    .then((character) => {
        return res.json({ character })
    })
    .catch((err) => {
        throw err.message
    })
})

// DELETE Route: Should delete a character
router.delete('/:characterId', (req, res) => {
    Character.findByIdAndDelete(req.params.characterId)
    .then((character) => {
        if (character === null) {
            return res.json({ character: 'Character does not exist. Check ID again.' })
        } else {
            return res.json({
                'character': 'Character was deleted from Database'
            })
        }
    })
    .catch((err) => {
        throw err.message
    })
})


module.exports = router
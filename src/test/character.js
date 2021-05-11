require('dotenv').config()
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server.js')
const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)

// Assert
const assert = chai.assert

// Model Imports
const Character = require('../models/character.js');
const User = require("../models/user.js");

// Required
after((done) => {
    // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
    mongoose.models = {}
    mongoose.modelSchemas = {}
    mongoose.connection.close()
    done()
})

// CODE STARTS HERE
describe('character API endpoints', () => {

    // Creates newCharater and user before tests
    beforeEach((done) => {
        const newCharacter = new Character({
            name: 'Mel',
            book: 'Throne of Glass',
            age: '21',
            species: 'Human',
            powers: 'Animal Taming',
            summary: 'Character that does not exist in the book'
        })
    
        const user = new User({
            username: 'usertest',
            password: 'passtest'
        })

        sampleUser.save()
        .then( () => {
            newCharacter.author = user
            return newCharacter.save()
        })
        .then(() => {
            user.characters.unshift(newCharacter)
            return user.save()
        })
        .then( () => {
            done()
        })
    })

    // After will delete user and character
    afterEach((done) => {
        User.deleteMany({ username: ['usertest'] })
        Character.deleteMany({ name: ['Mel', 'Kat', 'Kaltain'] })
        .then(() => {
            done()
        })  
    })

    // GET route: Retreives all characters
    it('should retreive all characters', (done) => {
        chai.request(app)
        .get('/characters')
        .end( (err, res) => {
            if (err) {
                done(err)
            } 
            else {
                expect(res).to.have.status(200)
                expect(res.body.characters).to.be.an('array')
                done()
            }
        })
    })

    // GET route: Retreives specific character using character:id
    it('should retreive spcified character', (done) => {
        Character.findOne({name: 'Mel'})
        .then(character => {
            chai.request(app)
            .get(`/character/${character._id}`)
            .end( (err, res) => {
                if (err) {
                    done(err)
                } 
                else {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.be.deep.equal('Name')
                    expect(res.body.book).to.be.deep.equal('Throne of Glass')
                    done()
                }
            })
        })
    })

    // POST Route: Creates a new character
    it('should create/post a new character', (done) => {
        User.findOne({username: 'usertest'})
        .then( user => {
            chai.request(app)
            .post(`/characters`)
            .send({
                name: 'Kat',
                book: 'Throne of Glass',
                age: '18',
                species: 'Human',
                powers: 'Shadowfire',
                summary: 'Blew up the Valg Base and helped Elide'
            })
            .end( (err, res) => {
                if (err) {
                    done(err)
                } 
                else {
                    expect(res.body.name).to.be.deep.equal('Kat')
                    expect(res.body.book).to.be.deep.equal('Throne of Glass')
                    expect(res.body.summary).to.be.deep.equal('Blew up the Valg Base and helped Elide')
                    expect(res.body.author).to.be.equal(`${user._id}`)

                    Character.findOne({name: 'Mel'})
                    .then( (character) => {
                        expect(character).to.be.an('object')
                        done()
                    })
                }
            })
        })
    })

    // PUT route: updates character we created
    it('should update a created character', (done) => {
        Character.findOne({name: 'Kat'})
        .then( character => {
            chai.request(app)
            .put(`/characters/${character._id}`)
            .send({
                name: 'Kaltain'
            })
            .end( (err, res) => {
                if (err) { 
                    done(err) 
                }
                expect(res.body.character.name).to.be.deep.equal('Kaltain')
                expect(res.body.character).to.have.property('name', 'Kaltain')

                character.findOne({name: 'Kaltain'})
                .then( (character) => {
                    expect(character.name).to.be.deep.equal('Kaltain')
                    done()
                })
            })
        })
    })

    // DELETE Route: Should delete a character
    it('should delete a character', (done) => {
        Character.findOne({name: 'Mel'})
        .then(character => {
            chai.request(app)
            .delete(`/characters/${character._id}`)
            .end( (err, res) => {
                if (err) {
                    done(err)
                }
                expect(res.body.character).to.be.deep.equal('Character was deleted from db.')
                done()
            })
        })
    })

})
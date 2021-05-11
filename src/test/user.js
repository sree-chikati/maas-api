require('dotenv').config()
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server.js')
const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)

chai.config.includeStack = true

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
describe('User API endpoints', () => {

    // Creates user before tests
    beforeEach((done) => {
        const user = new User({
            username: 'usertest',
            password: 'passtest'
        })
        user.save()
        .then(() => {
            done()
        })
    })

    // After will delete user
    afterEach((done) => {
        User.deleteMany({ username: ['usertest', 'user1', 'anotheruser'] })
        .then(() => {
            done()
        })
    })

    // GET route: Retreives all users
    it('should retreive all users', (done) => {
        chai.request(app)
        .get('/users')
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            expect(res.body.users).to.be.an("array")
            done()
        })
    })

    // GET route: Retreives specific user using user:id
    it('should retreive spcified user', (done) => {
        User.findOne({username: 'usertest'})
        .then(user => {
            chai.request(app)
            .get(`/users/${user._id}`)
            .end((err, res) => {
                if (err) { done(err) }
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body.username).to.equal('usertest')
                expect(res.body.password).to.equal(undefined)
                done()
            })
        })
    })

    // POST route: Creates a new user
    it('should create/post a new user', (done) => {
        chai.request(app)
        .post('/users')
        .send({username: 'user1', password: 'mypassword'})
        .end((err, res) => {
            if (err) {
                done(err) 
            }
            expect(res.body.user).to.be.an('object')
            expect(res.body.user).to.have.property('username', 'user1')

            // check that user is actually inserted into database
            User.findOne({username: 'user1'}).then(user => {
                expect(user).to.be.an('object')
                done()
            })
        })
    })

    // PUT route: updates user we created
    it('should update a created user', (done) => {
        User.findOne({username: 'usertest'})
        .then( user => {
            chai.request(app)
            .put(`/users/${user._id}`)
            .send({username: 'anotheruser'})
            .end((err, res) => {
                if (err) { done(err) }
                expect(res.body.user).to.be.an('object')
                expect(res.body.user).to.have.property('username', 'anotheruser')
    
                // check that user is actually inserted into database
                User.findOne({username: 'anotheruser'}).then(user => {
                    expect(user).to.be.an('object')
                    done()
                })
            })
        })
    })

    // DELELTE route: Should delete a user
    it('should delete a user', (done) => {
        User.findOne({username: 'usertest'})
        .then( user => {
            chai.request(app)
            .delete(`/users/${user._id}`)
            .end((err, res) => {
                if (err) { done(err) }
                expect(res.body.message).to.equal('Successfully deleted.')

                // check that user is actually deleted from database
                User.findOne({username: 'myuser'}).then(user => {
                    expect(user).to.equal(null)
                    done()
                })
            })
        })
    })

})

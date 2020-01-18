const chai = require('chai')
const chaihttp = require('chai-http')
const app = require('../app')
const Tag = require('../models/tag')

chai.use(chaihttp)
const expect = chai.expect
let tagId

after(function(done){
  if(process.env.NODE_ENV === 'testing') {
    Tag.deleteMany({})
      .then(result => {
        console.log('reset data testing')
        done()
      })
      .catch(console.log)
  }
})

describe("Tag testing", function() {
  describe('POST /tag', function() {
    describe('Success Test', function() {
      it('should send an object (name) with 201 status code', function(done) {
        chai.request(app)
          .post('/tag')
          .send({
            name: "2019"
          })
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object').to.have.any.keys('name')
            tagId = res.body._id
            done()
          })
      })
    })
    describe('Error Test', function() {
      it('should send an error with 400 status code because missing name value', function(done) {
        chai.request(app)
          .post('/tag')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Name is required')
            done()
          })
      })
    })
  })
  describe('GET /tag', function() {
    describe('Success Test', function() {
      it('should send an array of object (name) with 200 status code', function(done) {
        chai.request(app)
          .get('/tag')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
            expect(res.body[0]).to.be.an('object').to.have.any.keys('name')
            done()
          })
      })
    })
  })
  describe('GET /tag/:id', function() {
    describe('Success Test', function() {
      it('should send an object (name) with 200 status code', function(done) {
        chai.request(app)
          .get(`/tag/${tagId}`)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('name')
            done()
          })
      })
    })
    describe('Error Test', function() {
      it('should send an error with 404 status code because tag not found', function(done) {
        chai.request(app)
          .get(`/tag/5e21f4097d56fc1c628db63c`)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Invalid Input')
            expect(res.body.errors).to.be.an('array').that.includes('Tag Not Found')
            done()
          })
      })
    })
  })
  describe('PATCH /tag/:id', function() {
    describe('Success Test', function() {
      it('should send an object (name) with 200 status code', function(done) {
        chai.request(app)
          .patch(`/tag/${tagId}`)
          .send({
            name: "2020"
          })
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('name')
            done()
          })
      })
    })
    describe('Error Test', function() {
      it('should send an error with 400 status code because missing name value', function(done) {
        chai.request(app)
          .patch(`/tag/${tagId}`)
          .send({
            name: ""
          })
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Name is required')
            done()
          })
      })
      it('should send an error with 404 status code because tag not found', function(done) {
        chai.request(app)
          .patch(`/tag/5e21f4097d56fc1c628db63c`)
          .send({
            name: "2020"
          })
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Invalid Input')
            expect(res.body.errors).to.be.an('array').that.includes('Tag Not Found')
            done()
          })
      })
    })
  })
  describe('DELETE /tag/:id', function() {
    describe('Success Test', function() {
      it('should send an object (name) with 200 status code', function(done) {
        chai.request(app)
          .delete(`/tag/${tagId}`)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('name')
            done()
          })
      })
    })
    describe('Error Test', function() {
      it('should send an error with 404 status code because tag not found', function(done) {
        chai.request(app)
          .delete(`/tag/5e21f4097d56fc1c628db63c`)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Invalid Input')
            expect(res.body.errors).to.be.an('array').that.includes('Tag Not Found')
            done()
          })
      })
    })
  })
})
const chai = require('chai')
const chaihttp = require('chai-http')
const app = require('../app')
const Tag = require('../models/tag')
const News = require('../models/news')

chai.use(chaihttp)
const expect = chai.expect
let tagId
let newsId

after(function(done){
  if(process.env.NODE_ENV === 'testing') {
    News.deleteMany({})
      .then(result => {
        console.log('reset data testing')
        done()
      })
      .catch(console.log)
  }
})

before(function (done){
  if(process.env.NODE_ENV === 'testing') {
    Tag.create({
      name: "testing"
    })
      .then(result => {
        tagId = result._id
        done()
      })
      .catch(console.log)
  }
})

describe("News testing", function() {
  describe('POST /news', function() {
    describe('Success Test', function() {
      it('should send an object (title, topic, status, tagId) with 201 status code', function(done) {
        chai.request(app)
          .post('/news')
          .send({
            title: "banjir jakarta",
            topic: "bencana alam",
            status: "draft",
            tagId
          })
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object').to.have.any.keys('title', 'topic', 'status', 'tagId')
            newsId = res.body._id
            done()
          })
      })
    })
    describe('Error Test', function() {
      it('should send an error with 400 status code because missing title value', function(done) {
        chai.request(app)
          .post('/news')
          .send({
            topic: "bencana alam",
            status: "draft",
            tagId
          })
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Title is required')
            done()
          })
      })
      it('should send an error with 400 status code because missing topic value', function(done) {
        chai.request(app)
          .post('/news')
          .send({
            title: "banjir jakarta",
            status: "draft",
            tagId
          })
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Topic is required')
            done()
          })
      })
      it('should send an error with 400 status code because missing status value', function(done) {
        chai.request(app)
          .post('/news')
          .send({
            title: "banjir jakarta",
            topic: "bencana alam",
            tagId
          })
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Status is required')
            done()
          })
      })
    })
  })
  describe('GET /news', function() {
    describe('Success Test', function() {
      it('should send an array of object (title, topic, status, tagId) with 200 status code', function(done) {
        chai.request(app)
          .get('/news')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
            expect(res.body[0]).to.be.an('object').to.have.any.keys('title', 'topic', 'status', 'tagId')
            done()
          })
      })
    })
  })
  describe('GET /news/:id', function() {
    describe('Success Test', function() {
      it('should send an object (title, topic, status, tagId) with 200 status code', function(done) {
        chai.request(app)
          .get(`/news/${newsId}`)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('title', 'topic', 'status', 'tagId')
            done()
          })
      })
    })
    describe('Error Test', function() {
      it('should send an error with 404 status code because news not found', function(done) {
        chai.request(app)
          .get(`/news/5e21f63a7d56fc1c628db63e`)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Invalid Input')
            expect(res.body.errors).to.be.an('array').that.includes('News Not Found')
            done()
          })
      })
    })
  })
  describe('PUT /news/:id', function() {
    describe('Success Test', function() {
      it('should send an object (title, topic, status, tagId) with 200 status code', function(done) {
        chai.request(app)
          .put(`/news/${newsId}`)
          .send({
            title: "jakarta tenggelam",
            topic: "disaster",
            status: "deleted",
            tagId
          })
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('title', 'topic', 'status', 'tagId')
            done()
          })
      })
    })
    describe('Error Test', function() {
      it('should send an error with 400 status code because missing title value', function(done) {
        chai.request(app)
          .put(`/news/${newsId}`)
          .send({
            title: "",
            topic: "disaster",
            status: "deleted",
            tagId
          })
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Title is required')
            done()
          })
      })
      it('should send an error with 400 status code because missing topic value', function(done) {
        chai.request(app)
          .put(`/news/${newsId}`)
          .send({
            title: "jakarta tenggelam",
            topic: "",
            status: "deleted",
            tagId
          })
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Topic is required')
            done()
          })
      })
      it('should send an error with 400 status code because missing status value', function(done) {
        chai.request(app)
          .put(`/news/${newsId}`)
          .send({
            title: "jakarta tenggelam",
            topic: "disaster",
            status: "",
            tagId
          })
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Status is required')
            done()
          })
      })
      it('should send an error with 404 status code because news not found', function(done) {
        chai.request(app)
          .put(`/news/5e21f63a7d56fc1c628db63e`)
          .send({
            title: "jakarta tenggelam",
            topic: "disaster",
            status: "deleted",
            tagId
          })
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Invalid Input')
            expect(res.body.errors).to.be.an('array').that.includes('News Not Found')
            done()
          })
      })
    })
  })
  describe('PATCH /news/:id', function() {
    describe('Success Test', function() {
      it('should send an object (status) with 200 status code', function(done) {
        chai.request(app)
          .patch(`/news/${newsId}`)
          .send({
            status: "publish"
          })
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('title', 'topic', 'status', 'tagId')
            done()
          })
      })
    })
    describe('Error Test', function() {
      it('should send an error with 400 status code because missing status value', function(done) {
        chai.request(app)
          .patch(`/news/${newsId}`)
          .send({
            status: ""
          })
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Status is required')
            done()
          })
      })
      it('should send an error with 404 status code because news not found', function(done) {
        chai.request(app)
          .patch(`/news/5e21f63a7d56fc1c628db63e`)
          .send({
            status: "publish"
          })
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Invalid Input')
            expect(res.body.errors).to.be.an('array').that.includes('News Not Found')
            done()
          })
      })
    })
  })
  describe('DELETE /news/:id', function() {
    describe('Success Test', function() {
      it('should send an object (title, topic, status, tagId) with 200 status code', function(done) {
        chai.request(app)
          .delete(`/news/${newsId}`)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('title', 'topic', 'status', 'tagId')
            done()
          })
      })
    })
    describe('Error Test', function() {
      it('should send an error with 404 status code because news not found', function(done) {
        chai.request(app)
          .delete(`/news/5e21f63a7d56fc1c628db63e`)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Invalid Input')
            expect(res.body.errors).to.be.an('array').that.includes('News Not Found')
            done()
          })
      })
    })
  })
})
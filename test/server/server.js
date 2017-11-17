'use strict'
const chai = require('chai')
const request = require('supertest')
chai.expect()

describe('remote', () => {
  let server
  beforeEach(() => {
    delete require.cache[require.resolve('../../src/remote/remote')]
    server = require('../../src/server/server')
  })
  afterEach(done => {
    server.close(done)
  })
  it('should respond to /', done => {
    request(server).get('/').expect(302).end(done)
  })
  it('should respond to /home', done => {
    request(server).get('/home').expect(200).end(done)
  })
  it('should respond to /game', done => {
    request(server).get('/game').expect(200).end(done)
  })
  it('should respond to /about', done => {
    request(server).get('/about').expect(200).end(done)
  })
  it('should respond to /controls', done => {
    request(server).get('/controls').expect(200).end(done)
  })
  it('should respond to /levels', done => {
    request(server).get('/levels').expect(200).end(done)
  })
  it('should send 404 for everything else', done => {
    request(server).get('/blabla').expect(404).end(done)
  })

})

import * as chai from 'chai'
import * as request from 'supertest'
import { Server } from '../../src/server/server'
import { Http2Server } from 'http2'

chai.should()

describe('server', () => {
  let server: Http2Server
  beforeEach(() => {
    delete require.cache[require.resolve('../../src/server/server')]
    server = Server.bootstrap().httpServer
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

const chai = require('chai')
const chaiHttp = require('chai-http')
// const server = require('../server')
const should = chai.should()
const request = require('supertest')

chai.use(chaiHttp)
const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('should return App object', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200)
      })
    })
  })
})
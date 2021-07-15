const { expect, assert } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
// const server = require('../server')
const should = chai.should()
const request = require('supertest')
const nock = require('nock')
chai.use(chaiHttp)
const server = 'http://localhost:3000/api';

describe('Route integration', () => {
  let mockAPI;
  beforeAll( () => {
    // mock endpoint /location-search
    mockAPI = nock(server)
  })
  
  describe('/', () => {
    it('should return App object', () => {
      return request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200)
    })
  })

  describe('POST /location-search', () => {
     const searchResults = [
       {
         description: 'Mountain View, CA 94043, USA',
         matched_substrings: [ [Object] ],
         place_id: 'ChIJoQmen1G3j4ARbhoe7nVBEoQ',
         reference: 'ChIJoQmen1G3j4ARbhoe7nVBEoQ',
         structured_formatting: {
           main_text: '94043',
           main_text_matched_substrings: [Array],
           secondary_text: 'Mountain View, CA, USA'
         },
         terms: [ [Object], [Object], [Object], [Object] ],
         types: [ 'postal_code', 'geocode' ]
       }
     ]

    it('responds with location address', (done) => {

      // define the method to be intercepted
      mockAPI.post('/location-search')
      // respond with ok and specified json response
      .reply(200, {
        "message": 'mountain view'
      });
      
      request(server)
        .post('/location-search')
        .send('95814')
        .then(res => {
          // console.log(res)
          assert(res.statusCode, 200)
          done()

        })
        .catch(err => done(err))
    })
  })
  afterAll( () => {
    nock.cleanAll()
  })
})
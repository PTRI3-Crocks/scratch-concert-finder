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

  const searchResults = [
    {
      description: 'Mountain View, CA 94043, USA',
      matched_substrings: [ [null] ],
      place_id: 'ChIJoQmen1G3j4ARbhoe7nVBEoQ',
      reference: 'ChIJoQmen1G3j4ARbhoe7nVBEoQ',
      structured_formatting: {
        main_text: '94043',
        main_text_matched_substrings: [null],
        secondary_text: 'Mountain View, CA, USA'
      },
      terms: [ [null], [null], [null], [null] ],
      types: [ 'postal_code', 'geocode' ]
    }
  ]

  beforeAll( () => {
    // mock endpoint http://localhost:3000/api
    mockAPI = nock(server)
  })
  
  describe('POST /location-search', () => {
    it('should return an array of searchResults', (done) => {
      // define the method to be intercepted
      mockAPI.post('/location-search')
      // respond with ok and specified json response
      .reply(200, {
        "searchResults": searchResults
      });

      request(server)
        .post('/location-search')
        .send('95814')
        .then(res => {
          const result = JSON.parse(res.text)
          assert(res.statusCode, 200)
          expect(result.searchResults).to.be.an('array')
          done()
        })
        .catch(err => done(err))
    })
  })

  describe('POST /location-search', () => {
    it('responds with location potential address in zip code', (done) => {
      // define the method to be intercepted
      mockAPI.post('/location-search')
      // respond with ok and specified json response
      .reply(200, {
        "searchResults": searchResults
      });
      
      request(server)
        .post('/location-search')
        .send('95814')
        .then(res => {
          const result = JSON.parse(res.text)
          // console.log(result)
          assert(res.statusCode, 200)
          expect(searchResults[0]).to.have.all.keys("description", "matched_substrings", "place_id", "reference", "structured_formatting", "terms", "types")
          done()

        })
        .catch(err => done(err))
    })
  })
  afterAll( () => {
    nock.cleanAll()
  })
})
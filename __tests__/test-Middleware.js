const { expect, assert } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
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

  const playlist = [
    {
      track: {
        id: "6ncr2S7sj7MNadE7xl8S10",
        name: "Cheong Don",
        uri: "spotify:track:6ncr2S7sj7MNadE7xl8S10",
        href: "https://api.spotify.com/v1/tracks/6ncr2S7sj7MNadE7xl8S10",
        external_urls: {
          spotify: "https://open.spotify.com/track/6ncr2S7sj7MNadE7xl8S10",
        },
      },
      album: {
        id: "4wiDz2KU0Dw10Qh5ATiGKE",
        name: "Korean Traditional Music",
        uri: "spotify:album:4wiDz2KU0Dw10Qh5ATiGKE",
        images: [
          {
            height: 640,
            url: "https://i.scdn.co/image/ab67616d0000b273b40d908d2be578d70fdb8404",
            width: 640,
          },
          {
            height: 300,
            url: "https://i.scdn.co/image/ab67616d00001e02b40d908d2be578d70fdb8404",
            width: 300,
          },
          {
            height: 64,
            url: "https://i.scdn.co/image/ab67616d00004851b40d908d2be578d70fdb8404",
            width: 64,
          },
        ],
        href: "https://api.spotify.com/v1/albums/4wiDz2KU0Dw10Qh5ATiGKE",
        external_urls: {
          spotify: "https://open.spotify.com/album/4wiDz2KU0Dw10Qh5ATiGKE",
        },
      },
      artist: {
        id: "1C0oLQ6iM80jyWQLQhoOYU",
        name: "Seoul Music Ensemble",
        href: "https://api.spotify.com/v1/artists/1C0oLQ6iM80jyWQLQhoOYU",
        uri: "spotify:artist:1C0oLQ6iM80jyWQLQhoOYU",
        external_urls: {
          spotify: "https://open.spotify.com/artist/1C0oLQ6iM80jyWQLQhoOYU",
        },
      },
      venue: "On The Y",
      address: "670 Fulton Avenue\nSacramento, 95825\nUnited States of America",
      location: [
        -121.494,
        38.5816,
      ],
      start: "2020-06-27T03:00:00Z",
      end: "2020-06-27T03:00:00Z",
      distance: "9.9 mi",
      spotifyToken: "BQDo0Pc6LvYTKKRiW1gjqibOPxmDTYz8gTmi9j8hhTSCcRT3oX43mW8GSw0ga_cZhcKf93yCD8r5AbyFxadpS5N0AOBGXwwHkMSGVQlzP6XT",
      ticketPriceRange: [
      ],
      ticketsLink: "https://www.google.com/search?q=Seoul (Seoul Music)+tickets",
    },
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
  describe('POST /playlist', () => {
    it('respond with playlist data', (done) => {
      mockAPI.post('/playlist')
      .reply(200, {
        "playlist": playlist
      })

      request(server)
        .post('/playlist')
        .send({ placeId: 'ChIJoQmen1G3j4ARbhoe7nVBEoQ'})
        .then(res => {
          const result = JSON.parse(res.text)
          assert(res.statusCode, 200)
          expect(result.playlist[0]).to.have.all.keys('track','address','album', 'artist', 'distance', 'end', 'location', 'spotifyToken', 'start', 'ticketPriceRange', 'ticketsLink', 'venue')
          done()
        })
        .catch(err => done(err))
    })
  })
  afterAll( () => {
    nock.cleanAll()
  })
})
const puppeteer = require('puppeteer')

const APP = 'http://localhost:8080'

describe('Front-end Integration/Features', () => {
  let browser;
  let page;

  beforeAll( async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    jest.setTimeout(10000) 
    page = await browser.newPage()
  })

  afterAll( () => {
    browser.close()
  })

  describe('Initial display', () => {
    it('page loads successfully', async () => {
      await page.goto(APP)
      await expect(page.title()).resolves.toMatch('In The Loop')
    })
  })
})
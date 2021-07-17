const puppeteer = require('puppeteer')

const APP = 'http://localhost:8080'

describe('Front-end Integration/Features', () => {
  let browser;
  let page;

  beforeAll( async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: false
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
  describe('User can search concerts via zip code', () => {
    it('it should display a list of concerts', async () => {
      await page.goto(APP)
      page.waitForSelector('div.title svg', {visible: true})
      const svg = await page.$$('div.title svg')
      if(svg) {
        await svg.click()
      }
      console.log('span ', spans)
      await expect("hello").resolves.toMatch(spans)
    })
  })
})
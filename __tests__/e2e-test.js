const puppeteer = require('puppeteer')

const APP = 'http://localhost:8080'

describe('Front-end Integration/Features', () => {
  let browser;
  let page;

  beforeAll( async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    page = await browser.newPage()
  })

  afterAll( () => {
    browser.close()
  })

  describe('Initial Page loads', () => {
    await page.goto(APP)
    await page.waitForSelection('#root')
    
    await expect(page.title()).resolves.toMatch('In The Loop')
  })
})
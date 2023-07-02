const {assert} = require('chai')

const BUG_ID = process.env.BUG_ID

describe('burgerMenu', () => {
	it('Should be in 575px width', async ({browser}) => {
		const puppeteer = await browser.getPuppeteer()
		const [page] = await puppeteer.pages()
		await browser.setWindowSize(575, 500)

		await page.goto(`http://localhost:3000/hw/store?bug_id=${BUG_ID}`)
		await page.waitForSelector('.navbar-toggler', {timeout: 5000})
		await browser.assertView('plain', '.navbar-toggler')
	})

	it('Should not be in 576px width', async ({browser}) => {
		const puppeteer = await browser.getPuppeteer()
		const [page] = await puppeteer.pages()
		await browser.setWindowSize(576, 500)

		await page.goto(`http://localhost:3000/hw/store?bug_id=${BUG_ID}`)
		await page.waitForSelector('.navbar', {timeout: 5000})
		await browser.assertView('plain', '.navbar')
	})

	it('Should toggle in 575px', async ({browser}) => {
		const puppeteer = await browser.getPuppeteer()
		const [page] = await puppeteer.pages()
		await browser.setWindowSize(575, 500)
		await page.goto(`http://localhost:3000/hw/store?bug_id=${BUG_ID}`)

		await page.waitForSelector('.navbar-toggler', {timeout: 5000})
		await browser.$('.navbar-toggler').click()

		await page.waitForSelector('.navbar-collapse', {timeout: 5000})

		await page.waitForSelector('.nav-link', {timeout: 5000})

		await browser.$$('.nav-link')[0].click()

		await page.waitForSelector('.navbar-collapse', {timeout: 5000})

		const collapseClasses = await browser
			.$('.navbar-collapse')
			.getProperty('className')

		console.log('yaaaa', collapseClasses.split(' '))
		assert.include(collapseClasses.split(' '), 'collapse')
	})
})

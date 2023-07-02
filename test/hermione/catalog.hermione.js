const {assert} = require('chai')

const BUG_ID = process.env.BUG_ID

describe('Каталог', () => {
	it('имеет правильные стили', async ({browser}) => {
		const puppeteer = await browser.getPuppeteer()
		const [page] = await puppeteer.pages()
		await page.goto(`http://localhost:3000/hw/store/catalog`)

		await page.waitForSelector('body', {timeout: 5000})
		await page.waitForSelector('.ProductItem-Name', {timeout: 5000})

		const names = await browser
			.$$('.ProductItem-Name')
			.map((element) => element.getProperty('textContent'))

		console.log('----------names----------', names)

		assert.isOk(names[0])
	})
})

//ProductItem-Name

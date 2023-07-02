const {assert} = require('chai')

const BUG_ID = process.env.BUG_ID

describe('Карточка продукта', () => {
	it('имеет правильные стили', async ({browser}) => {
		const puppeteer = await browser.getPuppeteer()
		const [page] = await puppeteer.pages()
		await page.goto(`http://localhost:3000/hw/store/catalog/1?bug_id=${BUG_ID}`)

		await page.waitForSelector('body', {timeout: 5000})

		const productContent = await browser
			.$('.Product')
			.getProperty('textContent')

		assert.notEqual(productContent, 'LOADING')

		await browser.assertView('page', '.ProductDetails-AddToCart', {
			compositeImage: true,
		})
	})
})

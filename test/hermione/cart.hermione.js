const {assert} = require('chai')

const BUG_ID = process.env.BUG_ID

describe('Корзина', () => {
	it('заказ продукта', async ({browser}) => {
		const puppeteer = await browser.getPuppeteer()
		const [page] = await puppeteer.pages()
		await page.goto(`http://localhost:3000/hw/store/catalog/0?bug_id=${BUG_ID}`)

		await page.waitForSelector('body', {timeout: 5000})

		const productName = await browser
			.$('.ProductDetails-Name')
			.getProperty('textContent')

		await browser.$('.ProductDetails-AddToCart').click()

		await page.goto(`http://localhost:3000/hw/store/cart?bug_id=${BUG_ID}`)

		await page.waitForSelector('body', {timeout: 5000})

		const CartNames = await browser
			.$$('.Cart-Name')
			.map((element) => element.getProperty('textContent'))

		assert.include(CartNames, productName)

		const nameForm = await browser.$('.Form-Field_type_name')
		const phoneForm = await browser.$('.Form-Field_type_phone')
		const addressForm = await browser.$('.Form-Field_type_address')

		await nameForm.setValue('Test')
		await phoneForm.setValue('+79780000000')
		await addressForm.setValue('Test')

		await browser.$('.Form-Submit').click()

		await page.waitForSelector('body', {timeout: 5000})

		await browser.assertView('page', '.Cart-SuccessMessage')

		// const cartNumber = await browser
		// 	.$('.Cart-Number')
		// 	.getProperty('textContent')

		// assert.equal(cartNumber, '1')
	})
})

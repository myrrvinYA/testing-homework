import React from 'react'
import {expect, jest, test} from '@jest/globals'

import {render, screen} from '@testing-library/react'

import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import {Application} from '../../src/client/Application'
import {ExampleApi, CartApi} from '../../src/client/api'
import {initStore} from '../../src/client/store'

const basename = '/hw/store'

const api = new ExampleApi(basename)
const cart = new CartApi()
const store = initStore(api, cart)

describe('Simple Test Case', () => {
	test('Should return 4', () => {
		const app = (
			<BrowserRouter basename={basename}>
				<Provider store={store}>
					<Application />
				</Provider>
			</BrowserRouter>
		)

		const {container} = render(app)

		// screen.logTestingPlaygroundURL()

		expect(document.querySelector('.Application-Brand').textContent).toBe(
			'Example store'
		)
	})
})

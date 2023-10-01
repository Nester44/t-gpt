import { jest } from '@jest/globals'
import { replyMiddleware } from '../middleware/replyMiddleware.js'

describe('replyMiddleware', () => {
	it('should call next if there is reply to message', () => {
		const ctx = {
			message: {
				// eslint-disable-next-line camelcase
				reply_to_message: {
					from: {
						id: 1,
					},
				},
			},
			botInfo: {
				id: 1,
			},
			state: {},
		}
		const next = jest.fn()

		replyMiddleware(ctx, next)

		expect(next).toHaveBeenCalled()
	})

	it('should not call next if there is no reply to message', () => {
		const ctx = {
			message: {},
			state: {},
		}
		const next = jest.fn()

		replyMiddleware(ctx, next)

		expect(next).not.toHaveBeenCalled()
	})

	it('should not call next if reply to message is not from bot', () => {
		const ctx = {
			message: {
				// eslint-disable-next-line camelcase
				reply_to_message: {
					from: {
						id: 1,
					},
				},
			},
			botInfo: {
				id: 2,
			},
			state: {},
		}
		const next = jest.fn()

		replyMiddleware(ctx, next)

		expect(next).not.toHaveBeenCalled()
	})
})

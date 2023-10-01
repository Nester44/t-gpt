import { jest } from '@jest/globals'
import extractInput from '../middleware/extractInputMiddleware.js'

describe('extractInput', () => {
	it('should extract input from a command', () => {
		const ctx = {
			message: {
				text: '/sho test',
			},
			state: {},
		}

		extractInput(ctx, () => {})

		expect(ctx.state.input).toEqual('test')
	})

	it('should extract input from a command with spaces', () => {
		const ctx = {
			message: {
				text: '/sho test test',
			},
			state: {},
		}

		extractInput(ctx, () => {})

		expect(ctx.state.input).toEqual('test test')
	})

	it('should throw error on empty input', () => {
		const ctx = {
			message: {
				text: '/sho',
			},
			state: {},
		}

		expect(() => extractInput(ctx, () => {})).toThrow(
			'Напиши текст, трясця',
		)
	})

	it('should not call next on wrong command', () => {
		const ctx = {
			message: {
				text: '/wrongcommand test',
			},
			state: {},
		}
		const next = jest.fn()

		extractInput(ctx, next)
	})
})

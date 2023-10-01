import { initialMessages } from './constants/initialMessages.js'
import GptController from './controller/gptController.js'
import GptService from './service/gptService.js'
import MessageStorageService from './service/messageStorage.js'

class DependencyContainer {
	constructor() {
		this.dependencies = {}
	}

	register(name, dependency) {
		this.dependencies[name] = dependency
	}

	get(name) {
		// there is no way dependencies will have hasOwnProperty
		// eslint-disable-next-line no-prototype-builtins
		if (this.dependencies.hasOwnProperty(name)) {
			return this.dependencies[name]
		} else {
			throw new Error(`Dependency ${name} not found`)
		}
	}
}

const container = new DependencyContainer()

container.register(
	'messageStorage',
	new MessageStorageService(initialMessages.useful),
)

container.register(
	'gptService',
	new GptService(container.get('messageStorage')),
)

container.register(
	'gptController',
	new GptController(container.get('gptService')),
)

export default container

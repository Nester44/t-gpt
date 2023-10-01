/* eslint-disable camelcase */
// Imports the Google Cloud client library
import textToSpeech from '@google-cloud/text-to-speech'
import { franc } from 'franc'
import { Input } from 'telegraf'

// Creates a client
const client = new textToSpeech.TextToSpeechClient({
	projectId: process.env.GOOGLE_PROJECT_ID,
	credentials: {
		client_email: process.env.GOOGLE_CLIENT_EMAIL,
		private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
		type: 'service_account',
		universe_domain: 'googleapis.com',
		client_id: process.env.GOOGLE_CLIENT_ID,
	},
})

const mapLanguageToConfig = (language) => {
	switch (language) {
		case 'rus':
			return {
				languageCode: 'ru-RU',
				ssmlGender: 'MALE',
				name: 'ru-RU-Wavenet-D',
			}
		case 'eng':
			return {
				languageCode: 'en-US',
				name: 'en-US-Neural2-A',
				ssmlGender: 'MALE',
			}
		case 'ukr':
			return {
				languageCode: 'uk-UA',
				name: 'uk-UA-Standard-A',
				ssmlGender: 'FEMALE',
			}
		default:
			return {
				languageCode: 'en-US',
				name: 'en-US-Neural2-A',
				ssmlGender: 'MALE',
			}
	}
}

async function synthesizeVoice(text) {
	// The text to synthesize
	const language = franc(text, { only: ['rus', 'ukr', 'eng'] })
	// Construct the request
	const request = {
		input: { text },
		voice: mapLanguageToConfig(language),
		// select the type of audio encoding
		audioConfig: { audioEncoding: 'MP3', pitch: -4, speed: 1.2 },
	}

	// Performs the text-to-speech request
	const [response] = await client.synthesizeSpeech(request)
	const voice = Input.fromBuffer(response.audioContent)
	return voice
}

export default synthesizeVoice

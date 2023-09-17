// Imports the Google Cloud client library
import textToSpeech from '@google-cloud/text-to-speech'
import { franc } from 'franc'

// Creates a client
const client = new textToSpeech.TextToSpeechClient()

const mapLanguageToConfig = {
  rus: {
    languageCode: 'ru-RU',
    ssmlGender: 'MALE',
    name: 'ru-RU-Wavenet-D',
  },
  eng: {
    languageCode: 'en-US',
    name: 'en-US-Neural2-A',
    ssmlGender: 'MALE',
  },
  ukr: {
    languageCode: 'uk-UA',
    name: 'uk-UA-Standard-A',
    ssmlGender: 'FEMALE',
  },
}

async function synthesizeVoice(text) {
  // The text to synthesize
  const language = franc(text, { only: ['rus', 'ukr', 'eng'] })
  // Construct the request
  const request = {
    input: { text },
    voice: mapLanguageToConfig[language],
    // select the type of audio encoding
    audioConfig: { audioEncoding: 'MP3', pitch: -4, speed: 1.2 },
  }

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request)
  return response.audioContent
}

export default synthesizeVoice

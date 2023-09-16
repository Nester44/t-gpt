// Imports the Google Cloud client library
import textToSpeech from '@google-cloud/text-to-speech'

// Creates a client
const client = new textToSpeech.TextToSpeechClient()

async function synthesizeVoice(text) {
  // The text to synthesize

  // Construct the request
  const request = {
    input: { text },
    // Select the language and SSML voice gender (optional)
    voice: {
      languageCode: 'ru-RU',
      ssmlGender: 'MALE',
      name: 'ru-RU-Wavenet-D',
    },
    // select the type of audio encoding
    audioConfig: { audioEncoding: 'MP3', pitch: -4, speed: 1.2 },
  }

  // Performs the text-to-speech request
  const [response] = client.synthesizeSpeech(request)
  return response.audioContent
}

export default synthesizeVoice

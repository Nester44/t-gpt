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
      ssmlGender: 'FEMALE',
      name: 'ru-RU-Wavenet-C',
    },
    // select the type of audio encoding
    audioConfig: { audioEncoding: 'MP3', pitch: -2 },
  }

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request)
  return response.audioContent
}

export default synthesizeVoice

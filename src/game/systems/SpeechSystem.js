/**
 * SpeechSystem handles the Web Speech API integration.
 */
export default class SpeechSystem {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.supported = false;

        this.init();
    }

    init() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US'; // Primary language is English for pronunciation
            this.supported = true;
        } else {
            console.warn("Web Speech API not supported in this browser.");
        }
    }

    listen() {
        if (!this.supported) {
            return Promise.reject("Speech recognition not supported");
        }

        if (this.isListening) {
            this.recognition.stop();
        }

        return new Promise((resolve, reject) => {
            this.isListening = true;

            this.recognition.onresult = (event) => {
                const result = event.results[0][0].transcript.toLowerCase();
                this.isListening = false;
                resolve(result);
            };

            this.recognition.onerror = (event) => {
                this.isListening = false;
                reject(event.error);
            };

            this.recognition.onend = () => {
                this.isListening = false;
            };

            try {
                this.recognition.start();
            } catch (err) {
                this.isListening = false;
                reject(err);
            }
        });
    }

    /**
     * Simple comparison. For MVP we check if the expected word is contained in the result.
     * Future versions could use Levenshtein distance or specialized phonetic APIs.
     */
    compare(expected, actual) {
        if (!actual) return false;

        const cleanExpected = expected.toLowerCase().trim();
        const cleanActual = actual.toLowerCase().trim();

        return cleanActual.includes(cleanExpected) || cleanExpected.includes(cleanActual);
    }
}

import BilingualText from './BilingualText.js';

export default class SpeechPanel extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene, 400, 500);
        scene.add.existing(this);
        this.setScrollFactor(0);
        this.setVisible(false);

        this.bg = scene.add.rectangle(0, 0, 600, 150, 0x000000, 0.7);
        this.bg.setStrokeStyle(2, 0xffffff);

        this.instruction = new BilingualText(scene, -280, -60, 'Say the word:', 'Di la palabra:');
        this.targetWord = scene.add.text(0, -5, '', { fontSize: '32px', fill: '#ffff00', fontWeight: 'bold' }).setOrigin(0.5);
        this.statusText = new BilingualText(scene, -280, 30, 'Waiting...', 'Esperando...');

        // Microphone "Button" placeholder
        this.micIcon = scene.add.circle(250, 0, 30, 0xff0000);
        this.micText = scene.add.text(250, 0, '🎤', { fontSize: '30px' }).setOrigin(0.5);

        this.add([this.bg, this.instruction, this.targetWord, this.statusText, this.micIcon, this.micText]);
    }

    show(word, translation) {
        this.setVisible(true);
        this.targetWord.setText(`${word} / ${translation}`);
        this.statusText.setText('Click the mic to speak', 'Haz clic en el micro para hablar');
        this.micIcon.setFillStyle(0xff0000);
    }

    setListening() {
        this.statusText.setText('Listening...', 'Escuchando...');
        this.micIcon.setFillStyle(0x00ff00);
    }

    setResult(text, isCorrect) {
        const resultPrefixEn = isCorrect ? 'Great!' : 'Try again:';
        const resultPrefixEs = isCorrect ? '¡Genial!' : 'Inténtalo de nuevo:';
        this.statusText.setText(`${resultPrefixEn} You said: ${text}`, `${resultPrefixEs} Dijiste: ${text}`);
        this.micIcon.setFillStyle(isCorrect ? 0x00ff00 : 0xff0000);
    }

    hide() {
        this.setVisible(false);
    }
}

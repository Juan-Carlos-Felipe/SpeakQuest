export default class BilingualText extends Phaser.GameObjects.Container {
    constructor(scene, x, y, textEn, textEs, styleEn = {}, styleEs = {}) {
        super(scene, x, y);
        scene.add.existing(this);

        const defaultStyleEn = { fontSize: '24px', fill: '#fff', fontWeight: 'bold' };
        const defaultStyleEs = { fontSize: '18px', fill: '#ccc' };

        this.textEn = scene.add.text(0, 0, textEn, { ...defaultStyleEn, ...styleEn });
        this.textEs = scene.add.text(0, 30, textEs, { ...defaultStyleEs, ...styleEs });

        this.add([this.textEn, this.textEs]);
    }

    setText(en, es) {
        this.textEn.setText(en);
        this.textEs.setText(es);
    }
}

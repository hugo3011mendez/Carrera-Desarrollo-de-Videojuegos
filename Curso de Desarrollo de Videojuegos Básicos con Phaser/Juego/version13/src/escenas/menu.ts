export default class Menu extends Phaser.Scene {
    private width: number;
    private height: number;
    
    /**
     * Cuando se pulse sobre el texto, nos llevará a la escena indicada
     * @param jugarTxt Objeto de texto en el que debemos pulsar
     * @param nombreEscena Nombre de la escena a la que vamos a ir
     */
    cambiarEscena(jugarTxt: Phaser.GameObjects.Text, nombreEscena: string) {
        jugarTxt.on('pointerdown', ()=>{ // Cuando pulsemos sobre el objeto...
            this.scene.start(nombreEscena); // Carga la escena con el nombre igual al del parámetro
        });
    }


    constructor(){
        super('Menu');
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    // Comenzar a pintar en la escena
    create(){
        const logo = this.add.image(this.width / 2, 70, 'logo1');

        const jugarTxt: Phaser.GameObjects.Text = this.add.text(50, this.height / 2, 'JUGAR', {fontSize:'32px', color:'#ffffff'}).setInteractive();

        this.cambiarEscena(jugarTxt, 'Nivel1');
    }
}

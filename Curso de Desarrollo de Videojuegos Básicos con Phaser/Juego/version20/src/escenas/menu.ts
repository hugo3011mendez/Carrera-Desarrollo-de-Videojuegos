import Constante from "../constantes";

export default class Menu extends Phaser.Scene {
    private width: number;
    private height: number;
    
    /**
     * Cuando se pulse sobre el texto, nos llevará a la escena indicada
     * @param jugarTxt Objeto de texto en el que debemos pulsar
     * @param nombreEscena Nombre de la escena a la que vamos a ir
     */
    cambiarEscena(jugarTxt: Phaser.GameObjects.BitmapText, nombreEscena: string) {
        jugarTxt.on('pointerdown', ()=>{ // Cuando pulsemos sobre el objeto...
            this.scene.start(nombreEscena); // Carga la escena con el nombre igual al del parámetro

            // También muestro la escena del HUD y la llevo hacia la capa más arriba y que se vea junto al nivel
            this.scene.start('HUD');
            this.scene.bringToTop();
        });
    }


    constructor(){
        super('Menu');
    }

    // Inicializo las variables de ancho y alto
    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    // Comenzar a pintar en la escena
    create(){
        // Defino el logo a mostrar y su posición en la escena
        const logo = this.add.image(this.width / 2, 70, 'logo1');

        // Defino el texto a mostrar, su posición en la escena y su tipo de fuente.
        const jugarTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(50, this.height / 2, Constante.FUENTES.BITMAP, Constante.MENU.JUGAR, 25).setInteractive();

        this.cambiarEscena(jugarTxt, 'Nivel1'); // Cambio a la escena de Nivel 1 si se pulsa el texto indicado
    }
}

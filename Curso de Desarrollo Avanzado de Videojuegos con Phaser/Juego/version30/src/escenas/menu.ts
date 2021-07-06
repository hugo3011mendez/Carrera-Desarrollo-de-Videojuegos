import Constante from "../constantes";

export default class Menu extends Phaser.Scene {
    private width: number;
    private height: number;
    
    private bandasonoraMenu: Phaser.Sound.BaseSound; // Para la banda sonora

    /**
     * Cuando se pulse sobre el texto, nos va a lleva a la escena indicada
     * 
     * @param jugarTxt Texto que se debe pulsar
     * @param escena Escena a la que nos va a llevar
     */
     cambiarEscena(jugarTxt: Phaser.GameObjects.BitmapText, escena: string) {
        jugarTxt.on('pointerdown', ()=>{ // Cuando se pulse en el texto
            this.cameras.main.fade(700, 0, 0, 0); // Hago un Fade-Out de las cámaras
            this.cameras.main.on('camerafadeoutcomplete', () => { // Cuando acabe el Fade-Out
                this.sound.stopAll(); // Paro todos los sonidos
                this.scene.start(escena); // Inicio la escena indicada
                this.scene.start(Constante.ESCENAS.HUD); // Inicio el HUD
                this.scene.bringToTop(Constante.ESCENAS.HUD); // LLevo el HUD al frente
            });

        });
    }


    constructor(){
        super('Menu');
    }

    
    init(){
        // Inicializo las variables de ancho y alto
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        this.sound.stopAll(); // Paro los sonidos
    }

    preload(): void{
        // Cargo los sonidos 
        this.bandasonoraMenu = this.sound.add(Constante.SONIDOS.BANDASONORA + 0 , {loop:true}); // Añado el sonido correspondiente con Loop
        this.bandasonoraMenu.play(); // Reproduzco el sonido
    }    

    // Comenzar a pintar en la escena
    create(){
        // Defino el logo a mostrar y su posición en la escena
        const logo = this.add.image(this.width / 2, 70, 'logo1');

        // Defino el texto a mostrar, su posición en la escena y su tipo de fuente.
        const jugarTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(50, this.height / 2, Constante.FUENTES.BITMAP, Constante.MENU.JUGAR, 25).setInteractive();

        this.cambiarEscena(jugarTxt, Constante.ESCENAS.NIVEL1); // Cambio a la escena de Nivel 1 si se pulsa el texto indicado
    }
}

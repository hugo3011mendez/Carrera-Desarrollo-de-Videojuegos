import Constante from '../constantes';

export default class Nivel1 extends Phaser.Scene
{
    // Variables para el ancho y el alto de la escena
    private width: number;
    private height: number;
    
    private vidas: number; // Para el número de vidas del personaje
    private puntuacion: number; // Para el Nº de puntuación

    constructor ()
    {
        super(Constante.ESCENAS.NIVEL1);
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.vidas = 3;
        this.puntuacion = 0;
    }

    preload ()
    {
        this.load.image('logo', 'assets/phaser3-logo.png');
    }

    create ()
    {
        const logo = this.add.image(420, 70, 'logo1');

        const jugarTxt: Phaser.GameObjects.Text = this.add.text(50, this.height / 2, 'NIVEL 1', {fontSize:'32px', color:'#ffffff'});

        const vidasTxt: Phaser.GameObjects.Text = this.add.text(this.width / 2, this.height / 2, 'VIDAS -', {fontSize:'32px', color:'#ffffff'}).setInteractive();

        vidasTxt.on('pointerdown', ()=>{ // Cuando pulsemos sobre el texto...
            this.vidas --;
            this.registry.set(Constante.REGISTRO.VIDAS, this.vidas);
            this.events.emit(Constante.EVENTOS.VIDAS);
        });


        const puntuacionTxt: Phaser.GameObjects.Text = this.add.text(this.width / 4, this.height / 1.5, 'PUNTUACION +', {fontSize:'32px', color:'#ffffff'}).setInteractive();

        puntuacionTxt.on('pointerdown', ()=>{ // Cuando pulsemos sobre el texto...
            this.puntuacion ++;
            this.registry.set(Constante.REGISTRO.PUNTUACION, this.puntuacion);
            this.events.emit(Constante.EVENTOS.PUNTUACION);
        });
    }
}
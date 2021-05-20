import Constante from '../constantes';

export default class HUD extends Phaser.Scene{
    private VidasTxt: Phaser.GameObjects.BitmapText;
    private PuntuacionTxt: Phaser.GameObjects.BitmapText;
    private relojTxt: Phaser.GameObjects.BitmapText;

    private width: number;
    private height: number;

    constructor(){
        super(Constante.ESCENAS.HUD);
    }

    // Inicializo las variables de ancho y alto
    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }


    private actualizaVidas(): void{
        this.VidasTxt.text = Constante.HUD.VIDAS + this.registry.get(Constante.REGISTRO.VIDAS);
    }

    private actualizaPuntuacion(): void{
        this.PuntuacionTxt.text = Phaser.Utils.String.Pad(this.registry.get(Constante.REGISTRO.PUNTUACION), 3, '0', 1);
    }

    private actualizaReloj(): void{
        this.relojTxt.text = this.registry.get(Constante.REGISTRO.RELOJ);
    }


    create(): void{
        const nivel1: Phaser.Scene = this.scene.get(Constante.ESCENAS.NIVEL1);
        nivel1.events.on(Constante.EVENTOS.VIDAS, this.actualizaVidas, this);
        nivel1.events.on(Constante.EVENTOS.PUNTUACION, this.actualizaPuntuacion, this);
        nivel1.events.on(Constante.EVENTOS.RELOJ, this.actualizaReloj, this);

        // Ahora le doy su tamaño y su fuente Bitmap
        this.VidasTxt = this.add.bitmapText(20, 20, Constante.FUENTES.BITMAP, Constante.HUD.VIDAS + this.registry.get(Constante.REGISTRO.VIDAS), 20);

        this.PuntuacionTxt = this.add.bitmapText(this.width - 70, 20,  Constante.FUENTES.BITMAP, '000', 20);

        this.relojTxt = this.add.bitmapText(this.width / 2, 20, Constante.FUENTES.BITMAP, '05.00', 20);
    }
}

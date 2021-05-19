import Constante from '../constantes';

export default class HUD extends Phaser.Scene{
    private VidasTxt: Phaser.GameObjects.Text;
    private PuntuacionTxt: Phaser.GameObjects.Text;
    private relojTxt: Phaser.GameObjects.Text;

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
        this.VidasTxt.text = Constante.HUD.VIDAS + ' : ' + this.registry.get(Constante.REGISTRO.VIDAS);
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

        this.VidasTxt = this.add.text(20, 20, Constante.HUD.VIDAS + ' 3', {fontSize:'32px', color:'#ffffff'});

        this.PuntuacionTxt = this.add.text(this.cameras.main.width - 100, 20, '0', {fontSize:'32px', color:'#ffffff'});

        this.relojTxt = this.add.text(this.width / 2, 20, '05.00', {fontSize:'20px', color:'#ffffff'});
    }
}

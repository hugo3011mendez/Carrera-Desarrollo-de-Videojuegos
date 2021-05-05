import Constante from '../constantes';

export default class HUD extends Phaser.Scene{
    private VidasTxt: Phaser.GameObjects.Text;
    private PuntuacionTxt: Phaser.GameObjects.Text;

    constructor(){
        super(Constante.ESCENAS.HUD);
    }

    private actualizaVidas(): void{
        this.VidasTxt.text = Constante.HUD.VIDAS + ' : ' + this.registry.get(Constante.REGISTRO.VIDAS);
    }

    private actualizaPuntuacion(): void{
        this.PuntuacionTxt.text = Phaser.Utils.String.Pad(this.registry.get(Constante.REGISTRO.PUNTUACION), 3, '0', 1);
    }

    create(): void{
        const nivel1: Phaser.Scene = this.scene.get(Constante.ESCENAS.NIVEL1);
        nivel1.events.on(Constante.EVENTOS.VIDAS, this.actualizaVidas, this);
        nivel1.events.on(Constante.EVENTOS.PUNTUACION, this.actualizaPuntuacion, this);

        this.VidasTxt = this.add.text(20, 20, Constante.HUD.VIDAS + ' 3', {fontSize:'32px', color:'#ffffff'});

        this.PuntuacionTxt = this.add.text(this.cameras.main.width - 100, 20, '0', {fontSize:'32px', color:'#ffffff'});
    }
}

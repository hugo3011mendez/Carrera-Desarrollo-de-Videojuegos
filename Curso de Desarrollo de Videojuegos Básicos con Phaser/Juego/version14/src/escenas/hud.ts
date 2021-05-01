export default class HUD extends Phaser.Scene{
    private VidasTxt: Phaser.GameObjects.Text;
    private PuntuacionTxt: Phaser.GameObjects.Text;

    constructor(){
        super('HUD');
    }

    private actualizaVidas(): void{
        this.VidasTxt.text = 'Vidas : ' + this.registry.get('vidas');
    }

    private actualizaPuntuacion(): void{
        this.PuntuacionTxt.text = Phaser.Utils.String.Pad(this.registry.get('puntuacion'), 3, '0', 1);
    }

    create(): void{
        const nivel1: Phaser.Scene = this.scene.get('Nivel1');
        nivel1.events.on('cambiarvidas', this.actualizaVidas, this);
        nivel1.events.on('cambiarpuntuacion', this.actualizaPuntuacion, this);

        this.VidasTxt = this.add.text(20, 20, 'Vidas : 3', {fontSize:'32px', color:'#ffffff'});

        this.PuntuacionTxt = this.add.text(this.cameras.main.width - 250, 110, '0', {fontSize:'32px', color:'#ffffff'});
    }
}

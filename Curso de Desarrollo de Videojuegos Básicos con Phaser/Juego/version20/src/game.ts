import 'phaser';
import Configuracion from './configuracion';

export class Juego extends Phaser.Game{
    constructor(Configuracion: Phaser.Types.Core.GameConfig){
        super(Configuracion);
    }
}

window.addEventListener('load', ()=>{
    const juego = new Juego(Configuracion);
});
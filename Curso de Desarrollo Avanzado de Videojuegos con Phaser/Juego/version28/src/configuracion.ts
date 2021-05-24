import Nivel1 from "./escenas/nivel1";
import Carga from './escenas/carga';
import Menu from './escenas/menu';
import HUD from './escenas/hud';

// Variable de configuración del proyecto que indica el color de fondo, las dimensiones de las escenas y la matriz de escenas que componen el juego
const Configuracion = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: [Carga, Menu, Nivel1, HUD],
    pixelArt: true,
    physics:{
        default: 'arcade',
        arcade:{
            gravity:{ y: 600 },
            debug: true
        }
    }
};

export default Configuracion;
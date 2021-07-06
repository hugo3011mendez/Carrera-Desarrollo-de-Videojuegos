import Constante from '../constantes';
import ManejadorNivel from '../escenas/manejadornivel';

export default class Nivel1 extends ManejadorNivel
{
    constructor () {
        super(Constante.ESCENAS.NIVEL1);              
    }

    create (): void {               
        this.creaEscenarioNivel(Constante.MAPAS.NIVEL1.TILEDMAP, Constante.FONDOS.NIVEL1);

        this.creaEnemigos([Constante.ENEMIGOS.BUNNY, Constante.ENEMIGOS.RADISH]);

        this.creaRecolectables([Constante.RECOLECTABLES.PLATANO, Constante.RECOLECTABLES.PINA, Constante.RECOLECTABLES.CEREZA]);
    }
}
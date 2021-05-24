import Constante from '../constantes';
import Nivel1 from '../escenas/nivel1';

export default class PlataformasMoviles extends Phaser.Physics.Arcade.Group {

    private escena: Nivel1 ;
    private velocidad: number;

    private horizontal: boolean; // Para comprobar si es horizontal el objeto o no

    // Constructor con parámetros necesarios
    constructor(escena: Nivel1, nombreObjeto: string, idObjeto: string, velocidad: number, horizontal: boolean) {
        super(escena.physics.world, escena);

        // Asigno los parámetros tal y como vienen
        this.escena = escena;
        this.velocidad = 60; 
        this.horizontal = horizontal;

        // If comprobando si es horizontal o vertical para establecer propiedades según su orientación
        let nombreObjetoPlataforma: string = (this.horizontal)? Constante.MAPAS.PLATAFORMAHORIZONTAL : Constante.MAPAS.PLATAFORMAVERTICAL;

        // Añado los objetos de los enemigos desde el array de sprites obtenidos del TiledMap       
        this.addMultiple(this.escena.mapaNivel.createFromObjects(nombreObjeto, {name: nombreObjetoPlataforma, key:idObjeto}));

        // Recorro todas las plataformas
        this.children.entries.map((plataforma: any) => {            
            plataforma.setTexture(idObjeto); // Imagen
            plataforma.body.setCollideWorldBounds(true); // Colisiones
            plataforma.body.setAllowGravity(false); // Gravedad
            plataforma.body.setImmovable(true); // No puede ser movido por otra fuerza

            if (this.horizontal){ // Si es horizontal
                plataforma.body.setFrictionX(1);
                plataforma.body.setVelocityX(this.velocidad);                         
                this.muevePlataformaHorizontal((Phaser.Math.Between(0, 1) ? 'izda' : 'dcha'), plataforma);
            }else{ // Si es vertical
                plataforma.body.setFrictionY(1);
                plataforma.body.setVelocityY(this.velocidad);                         
                this.muevePlataformaVertical((Phaser.Math.Between(0, 1) ? 'arriba' : 'abajo'), plataforma);            
            }
        })
    }

    // Velocidad cuando es horizontal
    muevePlataformaHorizontal(direccion: string, enemigo: any): void {        
        (direccion === 'izda')? enemigo.body.setVelocityX(this.velocidad*-1):enemigo.body.setVelocityX(this.velocidad);                    
    }

    // Velocidad cuando es vertical
    muevePlataformaVertical(direccion: string, enemigo: any): void{        
        (direccion === 'arriba')? enemigo.body.setVelocityY(this.velocidad*-1):enemigo.body.setVelocityY(this.velocidad);            
    }


    // Actualizar las plataformas
    public update(): void{
        this.children.entries.map((enemigo: any) => { // Recorro todas las plataformas
            if (this.horizontal){ // Si es horizontal
                if(enemigo.body.velocity.x === 0) { // Si el enemigo está parado
                    this.muevePlataformaHorizontal((Phaser.Math.Between(0, 1) ? 'izda' : 'dcha'), enemigo); // Se mueve izquierda o derecha
                }
                if (enemigo.body.blocked.right) { // Si está bloqueado por la derecha
                    this.muevePlataformaHorizontal('izda', enemigo); // Cambia su dirección hacia la izquierda
                } else if (enemigo.body.blocked.left) {
                    this.muevePlataformaHorizontal('dcha', enemigo); // Cambia su dirección hacia la derecha
                }
            }else{ // Si es vertical
                if(enemigo.body.velocity.y === 0) { // Si el enemigo está parado
                    this.muevePlataformaVertical((Phaser.Math.Between(0, 1) ? 'arriba' : 'abajo'), enemigo); // Se mueve izquierda o derecha
                }
                if (enemigo.body.blocked.top) { // Si está bloqueado por arriba
                    this.muevePlataformaVertical('arriba', enemigo); // Cambia su dirección 
                } else if (enemigo.body.blocked.bottom) { // Si está bloqueado por abajo
                    this.muevePlataformaVertical('abajo', enemigo); // Cambia su dirección 
                }
            }
        });
    }
}
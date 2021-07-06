import ManejadorNivel from '../escenas/manejadornivel';

export default class Enemigos extends Phaser.Physics.Arcade.Group { // Hereda de Arcade Group : Un grupo de spritesheets con físicas
    private escena : ManejadorNivel; // La escena en la que se van a aplicar
    private velocidad : number; // Velocidad de los enemigos

    // Le paso al constructor todas estas variables para el enemigo que se debe crear
    constructor(escena: ManejadorNivel, nombreObjeto:string, idObjeto:string, animacionObjeto:string, velocidad:number){
        super(escena.physics.world, escena); // Llamo al super con el mundo de la escena y las escena en sí

        // Actualizo las variables privadas con los parámetros
        this.escena = escena;
        this.velocidad = velocidad;

        // Añado el objeto de los enemigos desde el array de sprites obtenidos del Arcade Group
        this.addMultiple(this.escena.mapaNivel.createFromObjects(nombreObjeto, {name:idObjeto}));

        // Añado físicas a todos los enemigos
        this.escena.physics.world.enable(this.children.entries);

        // Crea animaciones de los enemigos :
        this.escena.anims.create({
            key: animacionObjeto, // Clave
            frames: idObjeto, // Nombre de los frames
            frameRate: 20, // FPS
            repeat: -1 // Loop
        });

        // Le aplico la función de poder moverse a todos los enemigos de la matriz
        this.children.entries.map((enemigo:any)=>{
            enemigo.body.setCollideWorldBounds(true); // Colliders
            enemigo.play(animacionObjeto); // Animación correspondiente
            this.mueveEnemigo((Phaser.Math.Between(0,1) ? 'izda' : 'dcha'), enemigo); // Para moverse, decidiendo aleatoriamente la dirección
        })
    }


    /**
     * Indica la dirección, la velocidad y orientación de imagen a la que se debe mover el enemigo
     * @param direccion Izquierda o Derecha
     * @param enemigo Enemigo a moverse
     */
    mueveEnemigo(direccion:string, enemigo: any){
        if(direccion == 'izda'){
            enemigo.body.setVelocityX(this.velocidad*-1);
            enemigo.flipX = false;
        }
        else if (direccion == 'dcha'){
            enemigo.body.setVelocityX(this.velocidad);
            enemigo.flipX = true;
        }
    }

    /**
     * Actualiza el comportamiento del enemigo
     */
    public update(): void {
        this.children.entries.map((enemigo: any) => {
            // Compruebo si está parado
            if (enemigo.body.velocity.x === 0) {
                this.mueveEnemigo((Phaser.Math.Between(0, 1) ? 'izda' : 'dcha'), enemigo);
            }

            // Compruebo si está bloqueado
            if (enemigo.body.blocked.right) {
                this.mueveEnemigo('izda', enemigo);                              
            }
            else if (enemigo.body.blocked.left) {
                this.mueveEnemigo('dcha', enemigo);                
            }
        }); 
    }
}

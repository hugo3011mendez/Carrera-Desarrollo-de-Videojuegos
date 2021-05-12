import Constante from '../constantes';

export default class Jugador extends Phaser.Physics.Arcade.Sprite{
    // Control de entrada
    private cursores: Phaser.Types.Input.Keyboard.CursorKeys; // Teclas de cursor
    private teclasWASD: any; // Comodín de TypeScript para poder ser de cualquier tipo
    private teclaEspacio: Phaser.Input.Keyboard.Key; // Tecla de Phaser
    
    private escena: Phaser.Scene; // Escena donde se encuentra

    constructor(config:any){
        super(config.escena, config.x, config.y, config.textura);

        this.escena = config.escena;
        this.escena.physics.world.enable(this); // Habilito el juego en la escena
        this.escena.add.existing(this); // El objeto entrará en la escena

        this.body.setSize(20,30); // Tamaño de su caja de colisiones
        this.setCollideWorldBounds(true); // Para colisionar con los límites del juego

        // Control de entrada
        this.cursores = this.escena.input.keyboard.createCursorKeys();
        this.teclasWASD = this.escena.input.keyboard.addKeys('W,A,S,D');
        this.teclaEspacio = this.escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);        

        this.play(Constante.JUGADOR.ANIMACION.ESPERA, true); // Animación inicial
    }


    update(){
                // Control de movimiento :
        // Si se está especificando la dirección del movimiento horizontal...
        if(((this.teclasWASD.A.isDown || this.cursores.left.isDown) || (this.teclasWASD.D.isDown || this.cursores.right.isDown))){
            this.anims.play(Constante.JUGADOR.ANIMACION.CORRER, true); // Establezco su animación

            if(this.teclasWASD.A.isDown || this.cursores.left.isDown){ // Izquierda
                this.setVelocityX(-200);
                this.flipX = true;
            }
            else if(this.teclasWASD.D.isDown || this.cursores.right.isDown){ // Derecha
                this.setVelocityX(200);
                this.flipX = false;
            }
        } // Si se pulsa la tecla correspondiente al salto y el jugador está en el suelo
        else if((this.teclaEspacio.isDown || this.teclasWASD.W.isDown || this.cursores.up.isDown) && this.body.blocked.down){ 
            this.setVelocityY(-300);
            this.anims.stop(); // Cancelo las animaciones que se están mostrando
            this.setTexture(Constante.JUGADOR.ID, Constante.JUGADOR.ANIMACION.SALTO); // Le doy la textura de salto
        }
        else{ // Si no se está especificando dirección del movimiento horizontal
            this.setVelocityX(0);
            this.flipX = false;
            this.anims.play(Constante.JUGADOR.ANIMACION.ESPERA, true);        
        }
    }
}
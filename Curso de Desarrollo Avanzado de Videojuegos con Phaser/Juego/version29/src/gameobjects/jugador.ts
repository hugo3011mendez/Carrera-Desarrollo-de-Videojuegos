import Constante from '../constantes';
import Nivel1 from '../escenas/nivel1';

export default class Jugador extends Phaser.Physics.Arcade.Sprite{
    // Control de entrada
    private cursores: Phaser.Types.Input.Keyboard.CursorKeys; // Teclas de cursor
    private teclasWASD: any; // Comodín de TypeScript para poder ser de cualquier tipo
    private teclaEspacio: Phaser.Input.Keyboard.Key; // Tecla de Phaser
    
    private escena: Nivel1; // Escena donde se encuentra

    private tiempoEsperaColisionActivo: boolean; // Para cuando colisiona con el enemigo y ajustar las animaciones y los FPS
    private recolectando: boolean; // Indica si el jugador está recolectando un objeto recolectable

    // Efectos de sonido
    private saltarAudio: Phaser.Sound.BaseSound;
    private caerSobreAudio: Phaser.Sound.BaseSound;
    private recolectarAudio: Phaser.Sound.BaseSound;
    private vidaAudio: Phaser.Sound.BaseSound;

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

        
        this.tiempoEsperaColisionActivo = false; // Tiempo de espera para colisiones

        this.recolectando = false; // Si está recolectando

        // Efectos de sonido                
        this.saltarAudio = this.escena.sound.add(Constante.SONIDOS.EFECTOS.SALTAR);
        this.caerSobreAudio = this.escena.sound.add(Constante.SONIDOS.EFECTOS.CAERSOBREENEMIGO);
        this.recolectarAudio = this.escena.sound.add(Constante.SONIDOS.EFECTOS.RECOLECTAR);
        this.vidaAudio = this.escena.sound.add(Constante.SONIDOS.EFECTOS.QUITARVIDA);
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
            this.saltarAudio.play(); // Reproduzco el audio de salto
        }
        else{ // Si no se está especificando dirección del movimiento horizontal
            this.setVelocityX(0);
            this.flipX = false;
            this.anims.play(Constante.JUGADOR.ANIMACION.ESPERA, true);        
        }
    }


    /**
    * Método que maneja la colisión entre el jugador y un objeto enemigo
    * Se quita vida al jugador si enemigo toca al jugador
    * Si jugador toca al enemigo desde arriba elimina enemigo e incrementa puntos
    * El contexto this es desde dónde se llama por eso hay que usar jugador en lugar de this
    * @param jugador 
    * @param enemigo 
    */
    public enemigoToca(jugador: Jugador, enemigo: Phaser.Physics.Arcade.Sprite): void{

        // Hace desaparecer al enemigo si salta sobre él
        if (jugador.body.velocity.y>100 && 
            enemigo.body.touching.up && jugador.body.touching.down ){                                                             
            if (!jugador.tiempoEsperaColisionActivo){ // Si no están colisionando
                jugador.caerSobreAudio.play(); // Reproduzco el efecto de sonido cuando el jugador cae sobre el enemigo
                let posX = enemigo.x;
                let posY = enemigo.y;
                enemigo.destroy();
                    
                // Incrementa marcador 100 puntos
                jugador.escena.puntuacion += 100;
                jugador.escena.registry.set(Constante.REGISTRO.PUNTUACION, jugador.escena.puntuacion);
                jugador.escena.events.emit(Constante.EVENTOS.PUNTUACION);
        
                // Añade efecto explosion con una animación que cuando se completa desaparece
                let explosion: Phaser.GameObjects.Sprite = jugador.escena.add.sprite(posX, posY , Constante.ENEMIGOS.EXPLOSION.ID);                                          
                explosion.play(Constante.ENEMIGOS.EXPLOSION.ANIM); // Reproduzco la animación de la explosión
                explosion.once('animationcomplete', () => { // Cuando se haya completado la animación, se destruirá el objeto                                
                    explosion.destroy();                            
                });
            }
        }
        else if (!jugador.tiempoEsperaColisionActivo){  // Si nos toca el enemigo        
            // Quita vidas y actualizo HUD
            jugador.vidaAudio.play(); // Reproduzco el efecto de sonido cuando le quitan vidas al jugador
            jugador.escena.vidas--;            
            jugador.escena.registry.set(Constante.REGISTRO.VIDAS, jugador.escena.vidas);
            jugador.escena.events.emit(Constante.EVENTOS.VIDAS);
            
                
            // Activa tiempoEspera ya que al ser un overlap está colisionando constantemente
            jugador.tiempoEsperaColisionActivo = true;

            // Tiñe de rojo al jugador
            jugador.tint = 0xff0000; 
    
            // Añado un evento de espera para volver a la normalidad
            jugador.escena.time.addEvent({
                delay: 600,
                callback: () => {
                    jugador.tiempoEsperaColisionActivo = false;
                    jugador.tint = 0xffffff; 
                }
            });
        }
    
    }

    /**
     * Acciones a realizar cuando el jugador recolecta un objeto recolectable
     * @param jugador Jugador que recolecta los objetos
     * @param objeto Objeto que es recolectado por el jugador
     */
    public recolecta(jugador: Jugador, objeto: Phaser.Physics.Arcade.Sprite): void{   
        if (!jugador.recolectando){ // Si no está recolectando ya
            jugador.recolectarAudio.play(); // Reproduzco el efecto de sonido cuando el jugador recolecta un objeto recolectable
            jugador.recolectando = true; // Establezco a true la booleana que indica si está recolectando
            
            // Incrementa marcador 50 puntos
            jugador.escena.puntuacion += 50;
            // Actualizo el registro y emito el evento
            jugador.escena.registry.set(Constante.REGISTRO.PUNTUACION, jugador.escena.puntuacion);
            jugador.escena.events.emit(Constante.EVENTOS.PUNTUACION);

            // El objeto realiza una animación para desaparecer
            jugador.escena.tweens.add({
                targets: objeto,
                y: objeto.y - 100, // Cuando llegue a esa posición
                alpha: 0, // Deja el alpha a 0
                duration: 800, // en 0,8 segundos
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function(){                
                    jugador.recolectando = false;
                    objeto.destroy();                                 
                }
            });
        }        
    }
}
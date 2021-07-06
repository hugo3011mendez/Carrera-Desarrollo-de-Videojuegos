import Constante from '../constantes';
import Jugador from '../gameobjects/jugador';
import Enemigos from '../gameobjects/enemigos';
import PlataformasMoviles from '../gameobjects/plataformasmoviles';
import Recolectables from '../gameobjects/recolectables';

export default class ManejadorNivel extends Phaser.Scene {
    protected nombreNivel: string;

    // Vidas y Puntuación
    public vidas: number;
    public puntuacion: number;

    // Mapa
    public mapaNivel : Phaser.Tilemaps.Tilemap;
    protected conjuntoPatrones: Phaser.Tilemaps.Tileset;
    protected capaPlataformasMapaNivel: Phaser.Tilemaps.TilemapLayer;
    protected imagenFondo: Phaser.GameObjects.TileSprite;    

    // Jugador
    protected jugador: Jugador;  

    // Tiempo nivel
    protected segundos: number;        
    protected tiempoRestante: number; 
    protected tiempoAgotado: boolean;

    // Enemigos
    protected grupoEnemigos: Enemigos[];

    // Plataformas móviles
    protected plataformasMovilesH: PlataformasMoviles;
    protected plataformasMovilesV: PlataformasMoviles;

    // Sonido
    protected bandasonoraNivel: Phaser.Sound.BaseSound;

    // Recolectables
    protected platanosGroup: Recolectables;
    protected pinasGroup: Recolectables;
    protected cerezasGroup: Recolectables;

    // Constructor
    /**
     * Creo la escena del nivel cuyo nombre se pasa como parámetro
     * 
     * @param nivel Nombre del nivel que se va a crear
     */
    constructor(nivel: string){
        super(nivel);
        this.nombreNivel = nivel;              
    }    

    /**
     * Inicialización de las variables de la escena
     */
    init(): void{
        this.vidas = 3;
        this.puntuacion = 0;

        this.segundos = 1;
        this.tiempoRestante = 300;
        this.tiempoAgotado = false;

        // Con el sistema de registro global de variables inicializamos las del juego
        this.registry.set(Constante.REGISTRO.VIDAS, this.vidas);        
        this.registry.set(Constante.REGISTRO.PUNTUACION, this.puntuacion);                

        this.grupoEnemigos = []; // Array para los enemigos del nivel
    }


    /**
     * Método que crea todo lo relacionado con el escenario y jugador
     * 
     * @param jsonMapa Nombre del TiledMap del nivel en versión JSON
     * @param imagenScrolable Imagen para el fondo scrollable del nivel
     */
    creaEscenarioNivel(jsonMapa: string, imagenScrolable: string): void {

        this.creaBandaSonora(); // Para crear la música del nivel
                
        this.creaMapaNivel(Constante.MAPAS.NIVEL1.TILEDMAP); // Creo el mapa del nivel

        this.crearFondoScrolable(Constante.FONDOS.NIVEL1); // Creo el fondo del nivel

        this.creaAnimaciones(); // Creo las animaciones

        this.creaJugador(); // Creo el sprite del jugador

        this.creaObjetoFinal(); // Creo el objeto final en su posición

        this.creaPlataformasMoviles(); // Creo las plataformas móviles
    }


    creaBandaSonora(): void{
        // Carga sonido y lo ejecuta en loop
        this.bandasonoraNivel = this.sound.add(Constante.SONIDOS.BANDASONORA+1 , {loop:true, volume:0}); // Banda sonora en Loop con volumen 0
        this.bandasonoraNivel.play();

        /*
        // Fade in
        this.tweens.add({
            tagets: this.bandasonoraNivel,
            volume: 1,
            duration: 2000
        });
        */
    }


    /**
     * Método que crea el mapa en la escena con una capa de plataformas colisionable
     * 
     * @param jsonMapa Fichero json del tilemap
     * @param imagenMapa Imagen tileset del mapa
     */
    creaMapaNivel(jsonMapa: string, imagenMapa: string = Constante.MAPAS.TILESET): void {
        // Crear Mapa Nivel
        this.mapaNivel = this.make.tilemap({ key: jsonMapa});

        // Los bordes del juego  las dimensiones del mapa creado
        this.physics.world.bounds.setTo(0, 0, this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels);

        // Imagen de conjunto de patrones asociada al mapa
        this.conjuntoPatrones = this.mapaNivel.addTilesetImage(imagenMapa);

        // Capa de plataformas
        this.capaPlataformasMapaNivel = this.mapaNivel.createLayer(Constante.MAPAS.NIVEL1.CAPAPLATAFORMAS, this.conjuntoPatrones);

        // Hacer que la capa que sea collisionable
        this.capaPlataformasMapaNivel.setCollisionByExclusion([-1]);
    }


    /**
     * Método que crea el fondo con una imagen de tipo scrollable vertical
     * 
     * @param imagenScrolable Imagen del fondo
     */
    crearFondoScrolable(imagenScrolable: string): void {
        // Creo el Fondo
        this.imagenFondo = this.add.tileSprite(0,0, this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels,imagenScrolable).setOrigin(0,0).setDepth(-1);

    }


    /**
     * Crea todas las posibles animaciones producidas en el nivel
     * Son globales al juego, una vez creadas no se vuelven a crear y se pueden usar en cualquier nivel
     */
    creaAnimaciones(){        
        this.anims.create({ // Crea la animacion de idle 
            key: Constante.JUGADOR.ANIMACION.ESPERA, 
            frames: this.anims.generateFrameNames(Constante.JUGADOR.ID,{
                prefix:Constante.JUGADOR.ANIMACION.ESPERA + '-',
                end:10 }),
            frameRate:20, 
            repeat: -1
        });
        this.anims.create({ // Crea la animacion de movimiento 
            key: Constante.JUGADOR.ANIMACION.CORRER, 
            frames: this.anims.generateFrameNames(Constante.JUGADOR.ID,{
                prefix:Constante.JUGADOR.ANIMACION.CORRER + '-',
                end:11 
            }), 
            frameRate:20, 
            repeat: -1
        });
        // Crea la animacion de explosión        
        this.anims.create({
            key: Constante.ENEMIGOS.EXPLOSION.ANIM,
            frames: Constante.ENEMIGOS.EXPLOSION.ID,
            frameRate: 15,
            repeat: 0
        });

    }


    /**
     * Crea el objeto Jugador y lo posiciona en el mapa
     */
    creaJugador(): void{
        // Obtiene posición del jugador del mapa y crea jugador con esa posición
        this.mapaNivel.findObject(Constante.JUGADOR.ID, (d: any) => {           
            this.jugador = new Jugador({
                escena: this, 
                x:d.x,
                y:d.y, 
                textura: Constante.JUGADOR.ID
            });            
        });        
        
        // Las cámaras siguen al jugador
        this.cameras.main.setBounds(0, 0, this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels);
        this.cameras.main.startFollow(this.jugador);

        // Se crea colisión entre el jugador y la capa de plataformas
        this.physics.add.collider(this.jugador, this.capaPlataformasMapaNivel);        
    }

    /**
     * Crea objeto para el final del mapa
     */
    creaObjetoFinal(){
        // Crea un sprite con posición final 
        let objetofinal: any = this.mapaNivel.createFromObjects(Constante.MAPAS.POSICIONFINAL, {name: Constante.MAPAS.POSICIONFINAL})[0];                
        this.physics.world.enable(objetofinal);
        objetofinal.body.setAllowGravity(false);
        objetofinal.setTexture(Constante.OBJETOS.FINAL);
        objetofinal.body.setImmovable(true); 

        objetofinal.body.setSize(40,50);
        objetofinal.body.setOffset(10,15);

        // Collisión para final del nivel
        this.physics.add.collider(this.jugador, objetofinal, () =>this.volverAMenu());

}

    /**
     * Vuelve a Menu haciendo un fadeout de la cámara
     * parando música, y las dos escenas HUD y la del Nivel
     */
    volverAMenu(): void{        
        this.cameras.main.fade(700, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', () => {            
            this.sound.stopAll();
            this.scene.stop(this.nombreNivel);
            this.scene.stop(Constante.ESCENAS.HUD);
            this.scene.start(Constante.ESCENAS.MENU);
        });
    }

    /**
     * Crea grupos de enemigos y los configura para que colisionen con el mapa y con el jugador
     */
    creaEnemigos(enemigosConfig: any[]): void{
        enemigosConfig.forEach(enemigosConfig => {
            let enemigos: Enemigos = new Enemigos(this, Constante.MAPAS.ENEMIGOS, enemigosConfig.ID, enemigosConfig.ANIM, enemigosConfig.VELOCIDAD);
        
            this.physics.add.collider(enemigos, this.capaPlataformasMapaNivel);    
            this.physics.add.overlap(this.jugador, enemigos, this.jugador.enemigoToca, null, this);
            
            // Añade los enemigos al array
            this.grupoEnemigos.push(enemigos);

        });
    }

    /**
     * Crea plataformas móviles en movimiento vertiles y horizontales
     */
    creaPlataformasMoviles(): void{
        this.plataformasMovilesH = new PlataformasMoviles(this, Constante.MAPAS.PLATAFORMASMOVILES, Constante.PLATAFORMAMOVIL.ID, Constante.PLATAFORMAMOVIL.VELOCIDAD, true);

        this.plataformasMovilesV = new PlataformasMoviles(this, Constante.MAPAS.PLATAFORMASMOVILES, Constante.PLATAFORMAMOVIL.ID, Constante.PLATAFORMAMOVIL.VELOCIDAD, false);

        this.physics.add.collider(this.jugador, [this.plataformasMovilesH,this.plataformasMovilesV] );
        this.physics.add.collider(this.capaPlataformasMapaNivel, [this.plataformasMovilesH,this.plataformasMovilesV]);    

    }


    /**
    * Crea grupos de recolectables y los configura para que colisionen con el jugador
    * El nombre de la capa del mapa se tiene que llamar 'recolectables'
    */
    creaRecolectables(recolectablesConfig: any[]): void{
        recolectablesConfig.forEach(enemigosConfig => {
        let recolectables  = new Recolectables(this,Constante.MAPAS.RECOLECTABLES, enemigosConfig.ID, enemigosConfig.ANIM);
        this.physics.add.overlap(this.jugador, recolectables, this.jugador.recolecta, null, this);

        });
    }

    /**
     * Para actualizar todo lo referente a la escena en tiempo real
     * @param time 
     * @param delta 
     */
    update(time: number, delta: number): void{
        
        // Movimiento scroll del fondo 
        this.imagenFondo.tilePositionY -= 0.4 ;

        // Actualiza Manejador del jugador
        this.jugador.update();
        this.grupoEnemigos.forEach(enemigos => {
            enemigos.update();
        });
        this.plataformasMovilesH.update();
        this.plataformasMovilesV.update();

        // Gestión del tiempo
        // Resta segundos empleados por Player en cada Level  
        if ((this.segundos != Math.floor(Math.abs(time / 1000)) ) && !this.tiempoAgotado ) {
            this.segundos = Math.floor(Math.abs(time / 1000));
            this.tiempoRestante--;                     

            let minutos: number = Math.floor(this.tiempoRestante / 60);                
            let segundos: number = Math.floor(this.tiempoRestante - (minutos * 60));                

            let textoReloj: string = Phaser.Utils.String.Pad(minutos,2,'0',1) + ":" + Phaser.Utils.String.Pad(segundos,2,'0',1);
            this.registry.set(Constante.REGISTRO.RELOJ, textoReloj);
            this.events.emit(Constante.EVENTOS.RELOJ);

            
            if (this.tiempoRestante == 0){ // Si ya no queda tiempo, game over                    
                this.tiempoAgotado = true;                                  
            }            
        }

        // Volver al menú
        if (this.vidas === 0 || this.tiempoAgotado ) this.volverAMenu();

    }
}
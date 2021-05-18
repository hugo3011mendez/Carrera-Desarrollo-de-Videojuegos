import Constante from '../constantes';

export default class Carga extends Phaser.Scene 
{
    //Barras de Carga
    private barraCarga: Phaser.GameObjects.Graphics;
    private barraProgreso: Phaser.GameObjects.Graphics;

    // Constructor llamando a su padre con el título de la escena
    constructor () {
        super(Constante.ESCENAS.CARGA);
    }

    /**
     * Método que crea las barras de progreso
     */
     private creaBarras(): void {
        this.barraCarga = this.add.graphics(); // Defino la barra de carga

        this.barraCarga.fillStyle(0xffffff, 1); // Establezco su color

        this.barraCarga.fillRect( // Dibujo un rectángulo
          this.cameras.main.width / 4 - 2, // Pos X
          this.cameras.main.height / 2 - 18, // Pos Y
          this.cameras.main.width / 2 + 4, // Ancho
          20 // Alto
        );

        this.barraProgreso = this.add.graphics(); // Defino la barra de progreso
    }


    preload (): void {
        this.cameras.main.setBackgroundColor(0x000000); // Establezco el color de fondo de la cámara
        this.creaBarras(); // Llamo a la función
        
        //Listener mientras se cargan los assets
        this.load.on(
            'progress', // A medida que progresa la carga
            function (value: number) {
              this.barraProgreso.clear(); // Limpio la barra de progreso
              this.barraProgreso.fillStyle(0x125555, 1); // Le doy un color

              this.barraProgreso.fillRect( // Dibujo un rectángulo
                this.cameras.main.width / 4,
                this.cameras.main.height / 2 - 16,
                (this.cameras.main.width / 2) * value,
                16
              );
            },
            this
        );


        // Listener cuando se hayan cargado todos los Assets  
        this.load.on('complete', () => {
            const fuenteJSON = this.cache.json.get(Constante.FUENTES.JSON);
            this.cache.bitmapFont.add(Constante.FUENTES.BITMAP, Phaser.GameObjects.RetroFont.Parse(this, fuenteJSON));

                // Carga Menú
                this.scene.start(Constante.ESCENAS.MENU); // Cargo la 1a escena del juego
            },
            this
        );

        // Simplifico el path de carga para no escribir siempre assets/
        this.load.path = 'assets/';

        // Carga los assets del juego
        // Para pruebas cargar 1000 veces la misma imagen con diferentes keys
        this.load.image('logo1', 'phaser3-logo.png');
         
        // TiledMaps y TileSets     
        this.load.tilemapTiledJSON(Constante.MAPAS.NIVEL1.TILEDMAP, 'niveles/nivel1.json');
        this.load.image(Constante.MAPAS.TILESET, 'niveles/tileset.png');

        // Fondo
        this.load.image(Constante.FONDOS.NIVEL1, 'imagenes/fondos/' + Constante.FONDOS.NIVEL1 + '.png');

        //Fuentes                
        this.load.json(Constante.FUENTES.JSON, 'fuentes/fuente.json');
        this.load.image(Constante.FUENTES.IMAGEN, 'fuentes/imagenFuente.png');

        // Jugador
        // Cargo la spritesheet del jugador indicando su nombre, su imagen y su JSON
        this.load.atlas(Constante.JUGADOR.ID, 'imagenes/jugador/ninjafrog.png', 'imagenes/jugador/ninjafrog.json');

        // Carga del Objeto Final
        this.load.image(Constante.OBJETOS.FINAL, 'imagenes/objetos/final.png');

        // Enemigos
        // Cargo su spritesheet indicando su nombre(ID), localización de imagen y dimensiones de sus frames
        this.load.spritesheet(Constante.ENEMIGOS.BUNNY.ID, 'imagenes/enemigos/bunny.png', {frameWidth:34, frameHeight:44});
        this.load.spritesheet(Constante.ENEMIGOS.CHICKEN.ID, 'imagenes/enemigos/chicken.png', {frameWidth:32, frameHeight:44});
        this.load.spritesheet(Constante.ENEMIGOS.MUSHROOM.ID, 'imagenes/enemigos/mushroom.png', {frameWidth:32, frameHeight:44});
        this.load.spritesheet(Constante.ENEMIGOS.RADISH.ID, 'imagenes/enemigos/radish.png', {frameWidth:30, frameHeight:44});

        //Explosión
        this.load.spritesheet(Constante.ENEMIGOS.EXPLOSION.ID, 'imagenes/enemigos/explosion.png', {frameWidth: 38, frameHeight: 38});
    }
}
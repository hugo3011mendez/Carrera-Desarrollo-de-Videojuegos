import Constante from '../constantes';

export default class Nivel1 extends Phaser.Scene
{
    // Variables para el ancho y el alto de la escena
    private width: number;
    private height: number;
    
    private vidas: number; // Para el número de vidas del personaje
    private puntuacion: number; // Para el Nº de puntuación

    private mapaNivel: Phaser.Tilemaps.Tilemap;
    private conjuntoPatrones: Phaser.Tilemaps.Tileset;
    private capaTerreno: Phaser.Tilemaps.TilemapLayer;
    private imagenFondo: Phaser.GameObjects.TileSprite;

    private jugador: Phaser.Physics.Arcade.Sprite; // Sprite del jugador    


    constructor ()
    {
        super(Constante.ESCENAS.NIVEL1);
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.vidas = 3;
        this.puntuacion = 0;
    }

    preload ()
    {
        this.load.image('logo', 'assets/phaser3-logo.png');
    }

    create ()
    {
        const logo = this.add.image(420, 70, 'logo1');

        const jugarTxt: Phaser.GameObjects.Text = this.add.text(50, this.height / 2, 'NIVEL 1', {fontSize:'32px', color:'#ffffff'});

        const vidasTxt: Phaser.GameObjects.Text = this.add.text(this.width / 2, this.height / 2, 'VIDAS -', {fontSize:'32px', color:'#ffffff'}).setInteractive();

        vidasTxt.on('pointerdown', ()=>{ // Cuando pulsemos sobre el texto...
            this.vidas --;
            this.registry.set(Constante.REGISTRO.VIDAS, this.vidas);
            this.events.emit(Constante.EVENTOS.VIDAS);
        });


        const puntuacionTxt: Phaser.GameObjects.Text = this.add.text(this.width / 4, this.height / 1.5, 'PUNTUACION +', {fontSize:'32px', color:'#ffffff'}).setInteractive();

        puntuacionTxt.on('pointerdown', ()=>{ // Cuando pulsemos sobre el texto...
            this.puntuacion ++;
            this.registry.set(Constante.REGISTRO.PUNTUACION, this.puntuacion);
            this.events.emit(Constante.EVENTOS.PUNTUACION);
        });
        
        // Cargo el TileMap, TileSet y capa del Nivel
        this.mapaNivel = this.make.tilemap({key: Constante.MAPAS.NIVEL1.TILEDMAP, tileWidth: 16, tileHeight: 16}); // Con palabra clave y dimensiones de celda
        this.conjuntoPatrones = this.mapaNivel.addTilesetImage(Constante.MAPAS.TILESET); // Con nombre para el Tileset
        this.capaTerreno = this.mapaNivel.createLayer(Constante.MAPAS.NIVEL1.CAPAPLATAFORMAS, this.conjuntoPatrones); // Con el nombre de la capa y el tileset
        this.capaTerreno.setCollisionByExclusion([-1]); // Indico que la capa sea colisionable

        // Fondo
        // Añado el TileSprite en la posición (0,0) con el ancho y el alto de la escena y su nombre
        // Con setOrigin establezco que su localización esté en el (0,0)
        // Con setDepth establezco la capa donde va a aparecer
        this.imagenFondo = this.add.tileSprite(0,0, this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels, Constante.FONDOS.NIVEL1).setOrigin(0,0).setDepth(-1);

        // Animaciones
        this.anims.create({ // Para crear una animación :
            key: Constante.JUGADOR.ANIMACION.ESPERA, // Nombre o clave de la animación
            // Indico las imágenes de la animación pasando la clave del jugador, el nombre común de la animación, el Nº total de frames, los FPS y el modo de repetición (bucle) 
            frames: this.anims.generateFrameNames(Constante.JUGADOR.ID, {prefix: Constante.JUGADOR.ANIMACION.ESPERA + '-', end: 11}), frameRate: 20, repeat: -1
        });

        // Crear jugador
        this.jugador = this.physics.add.sprite(200, 80, Constante.JUGADOR.ID).play(Constante.JUGADOR.ANIMACION.ESPERA);

        // Colliders
        this.physics.add.collider(this.jugador, this.capaTerreno);
    }


    update(){
        // Muevo el fondo
        this.imagenFondo.tilePositionY -= 0.4;
        
        // Controlar las vidas restantes :
        if (parseInt(this.registry.get(Constante.REGISTRO.VIDAS)) === 0) {
            this.scene.stop(Constante.ESCENAS.NIVEL1);
            this.scene.stop(Constante.ESCENAS.HUD);
            this.scene.start(Constante.ESCENAS.MENU);
        }
    }
}
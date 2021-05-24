import Constante from '../constantes';
import Jugador from '../gameobjects/jugador';
import Enemigos from '../gameobjects/enemigos';
import PlataformasMoviles from '../gameobjects/plataformasmoviles';
import Recolectables from '../gameobjects/recolectables';

export default class Nivel1 extends Phaser.Scene
{
    // Variables para el ancho y el alto de la escena
    private width: number;
    private height: number;
    
    public vidas: number; // Para el número de vidas del personaje
    public puntuacion: number; // Para el Nº de puntuación

    public mapaNivel: Phaser.Tilemaps.Tilemap;
    private conjuntoPatrones: Phaser.Tilemaps.Tileset;
    private capaTerreno: Phaser.Tilemaps.TilemapLayer;
    private imagenFondo: Phaser.GameObjects.TileSprite;

    private jugador: Jugador; // Jugador

    // Variables de Control de Tiempo
    private segundos: number; // Para controlar cuando llega a 1 segundo
    private tiempoRestante: number; // Nº de tiempo restante
    private tiempoAgotado: boolean; // Para controlar si el tiempo se ha agotado

    // Enemigos
    private bunnyGroup: Enemigos;
    private radishGroup: Enemigos;

    // Plataformas móviles
    private plataformasMovilesH: PlataformasMoviles;
    private plataformasMovilesV: PlataformasMoviles;    

    // Sonido
    private bandasonoraNivel: Phaser.Sound.BaseSound;

    // Recolectables
    private platanosGroup: Recolectables;
    private pinasGroup: Recolectables;
    private cerezasGroup: Recolectables;        

    constructor ()
    {
        super(Constante.ESCENAS.NIVEL1);
    }

    init(){
        this.sound.stopAll(); // Paro todo el sonido cuando se inicie la escena

        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        this.vidas = 3;
        this.puntuacion = 0;

        this.segundos = 1;
        this.tiempoRestante = 30;
        this.tiempoAgotado = false;
    }

    preload ()
    {
        // Cargo el sonido y lo ejecuto con loop, indicando el nº del nivel
        this.bandasonoraNivel = this.sound.add(Constante.SONIDOS.BANDASONORA + 1 , {loop:true});
        this.bandasonoraNivel.play();
    }

    create ()
    {
        // Cargo el TileMap
        this.mapaNivel = this.make.tilemap({key: Constante.MAPAS.NIVEL1.TILEDMAP, tileWidth: 16, tileHeight: 16}); // Con palabra clave y dimensiones de celda
        this.physics.world.bounds.setTo(0,0,this.mapaNivel.widthInPixels,this.mapaNivel.heightInPixels); // Defino los bordes de la escena, la zona por la que se puede interactuar


        // Creo el jugador buscando el su objeto de posición inicial y llamando al constructor de su clase :
        this.mapaNivel.findObject(Constante.JUGADOR.ID, (d: any) => { // Busco el objeto creado en el TileMap y si lo encuentra
            // Llamo al constructor del Jugador para crearlo en su posición correspondiente     
            this.jugador = new Jugador({
                escena: this, 
                x:d.x,
                y:d.y, 
                textura: Constante.JUGADOR.ID
            });            
        });                

        // Las cámaras siguen al jugador
        this.cameras.main.setBounds(0,0,this.mapaNivel.widthInPixels,this.mapaNivel.heightInPixels);
        this.cameras.main.startFollow(this.jugador);

        // TileSet
        this.conjuntoPatrones = this.mapaNivel.addTilesetImage(Constante.MAPAS.TILESET); // Con nombre para el Tileset

        // Capa del Nivel
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

        this.anims.create({ // Animación de correr
            key: Constante.JUGADOR.ANIMACION.CORRER, // Nombre o clave de la animación
            // Indico las imágenes de la animación pasando la clave del jugador, el nombre común de la animación, el Nº total de frames, los FPS y el modo de repetición (bucle) 
            frames: this.anims.generateFrameNames(Constante.JUGADOR.ID, {prefix: Constante.JUGADOR.ANIMACION.CORRER + '-', end: 11}), frameRate: 20, repeat: -1
        });

        // Colliders
        this.physics.add.collider(this.jugador, this.capaTerreno);


        // Objeto final 
        // Lo defino a partir del objeto creado en el TileMap
        let objetofinal: any = this.mapaNivel.createFromObjects(Constante.MAPAS.POSICIONFINAL, {name: Constante.MAPAS.POSICIONFINAL})[0];               
        this.physics.world.enable(objetofinal); // Lo activo
        objetofinal.body.setAllowGravity(false); // Le doy gravedad 0 para que sea fijo
        objetofinal.setTexture(Constante.OBJETOS.FINAL); // Defino su textura
        objetofinal.body.setSize(40,50); // Defino su tamaño
        objetofinal.body.setOffset(10,15); // Muevo un poco su cuadrado de colisión
        

        // Collider del objeto final
        this.physics.add.collider(this.jugador, objetofinal, this.volverAMenu); // Ahora cuando colisionen llamo a volverAMenu


        // Enemigos 
        // Los obtengo de la capa de objetos del mapa
        this.bunnyGroup  = new Enemigos(this, Constante.MAPAS.ENEMIGOS, Constante.ENEMIGOS.BUNNY.ID, Constante.ENEMIGOS.BUNNY.ANIM,Constante.ENEMIGOS.BUNNY.VELOCIDAD, {size:{x:30,y:30}, offset:{x:0,y:10}});
        this.physics.add.collider(this.bunnyGroup, this.capaTerreno); // Collider de los enemigos Bunny con la plataforma
        this.physics.add.overlap(this.jugador, this.bunnyGroup, this.jugador.enemigoToca, null, this); // Collider entre el jugador y los enemigos Bunny

        this.radishGroup  = new Enemigos(this, Constante.MAPAS.ENEMIGOS, Constante.ENEMIGOS.RADISH.ID, Constante.ENEMIGOS.RADISH.ANIM, Constante.ENEMIGOS.RADISH.VELOCIDAD, {size:{x:30,y:30}, offset:{x:0,y:0}});
        this.physics.add.collider(this.radishGroup, this.capaTerreno); // Collider de los enemigos Radish con la plataforma
        this.physics.add.overlap(this.jugador, this.radishGroup, this.jugador.enemigoToca, null, this); // Collider entre el jugador y los enemigos Radish

        // Plataformas móviles
        this.plataformasMovilesH = new PlataformasMoviles(this, Constante.MAPAS.PLATAFORMASMOVILES, Constante.PLATAFORMAMOVIL.ID, Constante.PLATAFORMAMOVIL.VELOCIDAD, true);
        this.plataformasMovilesV = new PlataformasMoviles(this, Constante.MAPAS.PLATAFORMASMOVILES, Constante.PLATAFORMAMOVIL.ID, Constante.PLATAFORMAMOVIL.VELOCIDAD, false);
        
        this.physics.add.collider(this.jugador, [this.plataformasMovilesH,this.plataformasMovilesV] ); // Collider con el jugador
        this.physics.add.collider(this.capaTerreno, [this.plataformasMovilesH,this.plataformasMovilesV]); // Collider con el terreno

        // Añado plátanos recolectables
        this.platanosGroup = new Recolectables(this,Constante.MAPAS.RECOLECTABLES, Constante.RECOLECTABLES.PLATANO.ID, Constante.RECOLECTABLES.PLATANO.ANIM);
        this.physics.add.overlap(this.jugador, this.platanosGroup, this.jugador.recolecta, null, this); // Cuando haya overlap con el jugador, se ejecuta recolecta()
        
        // Añado piñas recolectables
        this.pinasGroup = new Recolectables(this,Constante.MAPAS.RECOLECTABLES, Constante.RECOLECTABLES.PINA.ID, Constante.RECOLECTABLES.PINA.ANIM);
        this.physics.add.overlap(this.jugador, this.pinasGroup, this.jugador.recolecta, null, this); // Cuando haya overlap con el jugador, se ejecuta recolecta()
        
        // Añado cerezas recolectables
        this.cerezasGroup = new Recolectables(this,Constante.MAPAS.RECOLECTABLES, Constante.RECOLECTABLES.CEREZA.ID, Constante.RECOLECTABLES.CEREZA.ANIM);
        this.physics.add.overlap(this.jugador, this.cerezasGroup, this.jugador.recolecta, null, this); // Cuando haya overlap con el jugador, se ejecuta recolecta()      
    }


    update(time): void {
        // Muevo el fondo
        this.imagenFondo.tilePositionY -= 0.4;
        
        this.jugador.update(); // Lanzo el update del jugador para que se actualice junto con el nivel

        // Actualizo el comportamiento de los enemigos
        this.bunnyGroup.update();
        this.radishGroup.update();

        // Actualizo el comportamiento de las plataformas móviles
        this.plataformasMovilesH.update();
        this.plataformasMovilesV.update();

        // Gestión del Tiempo
        if(this.segundos != Math.floor(Math.abs(time / 1000)) && !this.tiempoAgotado){ // Mientras no llegue a 1 segundo y no haya acabado el tiempo
            this.segundos = Math.floor(Math.abs(time/1000));
            this.tiempoRestante --; // Actualizo el tiempo restante

            // Obtengo minutos y segundos
            let minutos: number = Math.floor(this.tiempoRestante / 60);
            let segundos: number = Math.floor(this.tiempoRestante - (minutos * 60));

            let textoReloj: string = Phaser.Utils.String.Pad(minutos, 2, '0', 1) + ':' + Phaser.Utils.String.Pad(segundos, 2, '0', 1);
            // Cambio el registro
            this.registry.set(Constante.REGISTRO.RELOJ, textoReloj);
            // Envío al HUD
            this.events.emit(Constante.EVENTOS.RELOJ);

            // Cuando el tiempo termine, GAME OVER
            if(this.tiempoRestante == 0){
                this.tiempoAgotado = true;
            }

            // Cuando se hayan acabado las vidas o el tiempo, vuelvo al menú
            if (this.vidas == 0 || this.tiempoAgotado) this.volverAMenu(); // Ahora llamo a la función en vez de cambiar directamente de escenas
        }
    }

    /**
     * Efecto de la cámara al volver a la escena del menú
     */
    private volverAMenu(): void{
        this.cameras.main.fade(700,0,0,0); // Fade-Out de cámaras
        this.cameras.main.on('camerafadeoutcomplete', () =>{ // Cuando acabe el Fade-Out 
            this.sound.stopAll(); // Al volver al Menú, paro el sonido
            this.scene.stop(Constante.ESCENAS.NIVEL1); // Paro la escena
            this.scene.stop(Constante.ESCENAS.HUD); // Paro la escena
            this.scene.start(Constante.ESCENAS.MENU); // Inicio la escena
        })
    }
}
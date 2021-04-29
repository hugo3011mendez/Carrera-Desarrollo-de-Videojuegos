export default class Carga extends Phaser.Scene 
{
    //Barras de Carga
    private barraCarga: Phaser.GameObjects.Graphics;
    private barraProgreso: Phaser.GameObjects.Graphics;

    // Constructor llamando a su padre con el título de la escena
    constructor () {
        super('Carga');
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


        //Listener cuando se hayan cargado todos los Assets  
        this.load.on(
            'complete',
            function () {
                this.scene.start('Nivel1'); // Cargo la 1a escena del juego
            },
            this
        );


        //Carga los assets del juego
        //Para pruebas cargar 1000 veces la misma imagen con diferentes keys
        for (let i=1;i<=1000;i++) this.load.image('logo' + i, 'assets/phaser3-logo.png');      
    }
}
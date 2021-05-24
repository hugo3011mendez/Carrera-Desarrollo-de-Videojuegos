import Nivel1 from '../escenas/nivel1'; // Importo el nivel 1



export default class Recolectables extends Phaser.Physics.Arcade.Group { // Clase para los objetos recolectables
    private escena: Nivel1 ; // Variable tipo Nivel 1
    
    // Constructor con sus parámetros
    constructor(escena: Nivel1, nombreObjeto: string, idObjeto: string, animObjeto: string) {
        super(escena.physics.world, escena); // Llamo a su clase padre       

        this.escena = escena; // Establezco la variable escena
                
        // Añado los objetos de los recolectables desde el array de sprites obtenidos del mapa al grupo        
        this.addMultiple(this.escena.mapaNivel.createFromObjects(nombreObjeto, {name: idObjeto, key:idObjeto}));
        
        // Añado física a todos los objetos del grupo
        this.escena.physics.world.enable(this.children.entries);
        
        // Creo animaciones para los recolectables
        this.escena.anims.create({
            key: animObjeto,
            frames: idObjeto,
            frameRate: 20,
            repeat: -1
        });

        // Físicas de los recolectables
        this.children.entries.map((recolectable: any) => {            
            recolectable.body.setAllowGravity(false);
            recolectable.body.setImmovable(true); 
            recolectable.play(animObjeto);           
        });
    }

}

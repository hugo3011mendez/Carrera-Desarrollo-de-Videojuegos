const Constante = {
    EVENTOS:{
        VIDAS:'cambiaVidas',
        PUNTUACION: 'cambiaPuntuacion',
        RELOJ:'reloj'
    },
    MENU:{
        JUGAR: 'JUGAR'
    },
    HUD:{
        VIDAS: 'VIDAS:'
    },    
    ESCENAS:{
        MENU: 'Menu',
        NIVEL1: 'Nivel1',
        HUD: 'HUD',
        CARGA:'Carga'
    },
    REGISTRO:{
        VIDAS: 'vidas',
        PUNTUACION: 'puntuacion',
        RELOJ:'reloj'
    },
    MAPAS:{
        NIVEL1:{
            TILEDMAP:'nivel1',
            CAPAPLATAFORMAS:'Plataformas'
        },
        TILESET:'nivelestileset',
        POSICIONFINAL:'posicionfinal',
        ENEMIGOS:'enemigos',
        PLATAFORMASMOVILES: 'plataformasmoviles',
        PLATAFORMAVERTICAL: 'vertical',
        PLATAFORMAHORIZONTAL: 'horizontal',
        RECOLECTABLES: 'recolectables'
    },
    FONDOS:{
        NIVEL1:'Brown'
    },
    FUENTES:{
        JSON:'fuenteJSON',
        IMAGEN:'imagenFuente',
        BITMAP:'fuentePixel'
    },
    JUGADOR:{
        ID:'jugador',
        ANIMACION:{
            ESPERA: 'idle',
            CORRER: 'run',
            SALTO: 'jump-0'
        }
    },
    OBJETOS:{
        FINAL:'final'
    },
    ENEMIGOS:{
        BUNNY:{
            ID: 'bunny',
            ANIM: 'bunnyCorre',
            VELOCIDAD: 75
        },
        CHICKEN:{
            ID: 'chicken',
            ANIM: 'chickenCorre',
            VELOCIDAD: 100
        },
        MUSHROOM:{
            ID: 'mushroom',
            ANIM: 'mushroomCorre',
            VELOCIDAD: 100
        },
        RADISH:{
            ID: 'radish',
            ANIM: 'radishCorre',
            VELOCIDAD: 100
        },
        EXPLOSION:{
            ID:'explosion',
            ANIM:'explota'
        }
    },
    PLATAFORMAMOVIL:{
        ID:'plataformamovil',
        VELOCIDAD: 60
    },
    SONIDOS:{
        EFECTOS:{
            SALTAR:'saltar',
            CAERSOBREENEMIGO: 'caersobre',
            QUITARVIDA:'vida',
            RECOLECTAR: 'recolectar'
        },
        BANDASONORA:'bandasonora'
    },
    RECOLECTABLES:{
        PLATANO:{
            ID:'platano',
            ANIM:'platanoAnim'            
        },
        PINA:{
            ID:'pina',
            ANIM:'pinaAnim'            
        },
        CEREZA:{
            ID:'cereza',
            ANIM:'cerezaAnim'            
        },
    }            
}

export default Constante;
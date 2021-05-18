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
            CAPAPLATAFORMAS:'Plataforma'
        },
        TILESET:'nivelestileset',
        POSICIONFINAL:'posicionfinal',
        ENEMIGOS:'enemigos'
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
    }
}

export default Constante;
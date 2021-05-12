# Carrera Desarrollo de Videojuegos
Aquí subiré el material de la carrera de Desarrollo de Videojuegos realizada por OpenWebinars

## Inicio del Curso de Construct
### 12/04/2021
* Añadidos apuntes y resumen de los vídeos de presentación e introducción a Construct.


### 13/04/2021
* Añadido resumen del vídeo sobre la interfaz de Construct.
* Añadido archivo de proyecto de Construct con las acciones realizadas en el vídeo sobre la interfaz de Construct.
* Añadido resumen del vídeo sobre la lógica de Construct.
* Añadido archivo de proyecto de Construct con las acciones realizadas en el vídeo sobre la lógica de Construct.


### 14/04/2021
* Añadido PDF de apuntes sobre la 2a lección del curso de Construct.
* Añadido resumen del vídeo sobre la preparación del proyecto.
* Añadido archivo de proyecto de Construct con las acciones realizadas en el vídeo mencionado.


### 17/04/2021
* Añadido resumen del vídeo "Planificación" del proyecto.
* Actualizado archivo del proyecto con las acciones realizadas en el vídeo :
	* Añadidos eventos de teclado para controlar al jugador por WASD.
	* Añadido un sprite llamado "Enemigo".
	* Le doy comportamiento de plataforma al enemigo.
	* Añado eventos para que el enemigo se mueva hacia el jugador.

* Añadido resumen del vídeo "Creando un Personaje" del proyecto.
* Actualizado archivo del proyecto con las acciones realizadas en el vídeo :
	* Añadida variable de instancia al enemigo, para comprobar se debe perseguir al jugador.
	* Añadidos eventos para comprobar si el enemigo debe perseguir al jugador, y cuando el enemigo esté persiguiendo y se tope con un muro lo salte.


### 19/04/2021
* Añadido resumen del vídeo "Añadiendo Disparos" del proyecto.
* Actualizado archivo del proyecto con las acciones realizadas en el vídeo :
	* Se ha creado un nuevo sprite que representará una bala.
	* Se han creado grupos de eventos para una mejor organización de la hoja de eventos.
	* Se han creado eventos de gestión de la bala, como :
		* Un evento que hace que se cree una bala cuando se pulse el botón Intro.
		* Un evento que hace que se destruya la bala cuando su posición esté fuera de la escena.
	* Añadido vídeo mostrando el progreso actual en el proyecto de Construct.


### 20/04/2021
* Añadido resumen del vídeo "Añadiendo Enemigos" del proyecto.
* Actualizado archivo del proyecto con las acciones realizadas en dicho vídeo :
	* Se ha añadido una variable de instancia booleana al jugador que indica si se está moviendo hacia la derecha o no.
	* Se han añadido acciones en los eventos de movimiento del personaje para establecer el valor de dicha variable booleana, y comprobando su valor se han añadido y modificado eventos para que la bala se dispare en la dirección en la que se haya movido el jugador
	* Se ha añadido una variable de instancia numérica al jugador, que representará su puntuación.
	* Se ha añadido un tipo de objeto texto, que muestra la puntuación del jugador en todo momento.
	* Se ha creado un evento que controla cuando una bala colisiona contra un enemigo, que destruye la bala y el enemigo actuales, suma 1 a la puntuación y actualiza el valor del texto que se muestra.

* Añadido resumen del vídeo "Añadiendo IA  a los enemigos" del proyecto.
* Actualizado archivo del proyecto con las acciones realizadas en dicho vídeo :
	* Añadido bucle For Each en cada evento que controle las instancias de enemigos para que todos trabajen de la misma forma.
	* Añadido evento para vaciar el texto al iniciar la escena.
	* Añadido evento que comprueba si el enemigo colisiona con el jugador para acabar la partida.
	* Añadido sprite con dibujos que se mostrarán en el medio de la pantalla cuando se haya ganado o perdido.
	* Añadido sprite con dibujo de una bandera para que se gane la partida cuando el jugador llegue a ella.
	* Añadidos eventos pertinentes para cuando se pierde y se gana.
	* Añadidas barreras en los límites de la escena para que los sprites no se caigan.


### 21/04/2021
* Añadido resumen del vídeo "Introducción al Game Feel" del proyecto.
* Actualizado archivo del proyecto con las acciones realizadas en dicho vídeo :
	* Creado Sprite para hacer de cámara.
	* Añadido comportamiento ScrollTo a la cámara.
	* Añadido grupo de eventos en la hoja de eventos para controlar los eventos de la cámara :
		* Añadido evento que controla la posición de la cámara según la posición del jugador.
	* Añadidas variables globales estáticas para establecer la distancia entre la cámara y el jugador, y la velocidad de la cámara.
	* Ajustada la cámara para que no se viera cambiando su ajuste "Visible inicialmente".


### 22/04/2021
* Añadido resumen del vídeo "Aplicando Efectos del Juego" del proyecto.
* Actualizado archivo del proyecto con las acciones realizadas en dicho vídeo :
	* Incorporado efecto shake en la cámara al disparar balas.
	* Añadida aleatoriedad de la desviación del ángulo de las balas.
	* Optimizado evento que gestiona la destrucción de las instancias de las balas.

* Añadido resumen del vídeo "Añadiendo Assets de arte Finales" del proyecto.
* Descargado un pack de Assets de https://kenney.nl/assets/platformer-pack-redux.
* Actualizado archivo del proyecto con las acciones realizadas en dicho vídeo :
	* Establecidas imágenes de los diferentes sprites con sus animaciones y fotogramas.
	* Actualizados eventos para establecer la animación correspondiente al jugador dependiendo de su movimiento.


### 26/04/2021
* Optimizada hoja de eventos para una visualización óptima de las animaciones del personaje y de los enemigos.

* Añadido resumen del vídeo "Añadiendo Audio" del proyecto.
* Actualizado archivo del proyecto con las acciones realizadas en dicho vídeo :
	* Importados en el proyecto archivos de audio necesarios en una nueva carpeta donde están almacenados.
	* Añadidos eventos que reproducirán música al iniciarse la escena y un efecto de sonido cuando el jugador o los enemigos salten.

* Optimizada visualización de la puntuación, moviendo el texto de posición a medida que se mueve el jugador.
* Optimizado evento de inicio de partida para que sea visible el mensaje del fin de partida.
* Optimizado evento de fin de partida, optimizando la posición del mensaje del fin de partida.

* Añadido resumen del vídeo "Creando Más Niveles" del proyecto.
* Actualizado archivo del proyecto con las acciones realizadas en dicho vídeo :
	* Duplicada escena actual para seguir con la misma configuración.
	* Diseñado entorno del nuevo nivel.
	* Añadida variable global indicando el nivel en el que debe estar el jugador para poder cambiar de niveles de una manera más sencilla.
	* Optimizado evento de fin de partida para cambiar al nivel correspondiente.


### 27/04/2021
* Añadido resumen del vídeo "Añadiendo Progresión Entre Niveles" del proyecto.
* Actualizado archivo del proyecto con las acciones realizadas en dicho vídeo :
	* Creada nueva escena, con un fondo fijo y un texto en el medio.
	* Creada nueva hoja de eventos para la última escena, controlando el texto al inicio de la escena y el reinicio del juego.

* Optimizados tamaños de las escenas.

* Añadido resumen del vídeo "Creando Un Menú" del proyecto.
* Actualizado archivo del proyecto con las acciones realizadas en dicho vídeo :
	* Creada nueva escena con todos los elementos necesarios para usarse de menú.
	* Gestionada nueva hoja de eventos para el menú.
	* Actualizada hoja de eventos del último nivel, para volver al menú una vez se haya acabado y se pulse el espacio.
	* Creada nueva variable global para llevar la cuenta de todos los enemigos destruidos por el jugador.
	* Usada variable global en el mensaje de victoria al final del juego.

* Añadido resumen del vídeo "Compilar y Publicar el Juego" del proyecto.
* Exportado proyecto en HTML5 comprimido y añadido al repositorio.

* Añadido PDF de apuntes de la parte 4 del curso.
* Realizado el examen del curso con éxito y conseguido el diploma.

## Terminado Curso de Construct


### 28/04/2021
## Comenzado Curso de Desarrollo de Videojuegos Básicos con Phaser

* Añadidos apuntes de la primera parte del curso, Introducción.
* Añadido resumen de la primera parte del curso, Introducción.
* Actualizado Node.js para trabajar en este curso.

* Añadidos apuntes de Node.js y TypeScript de la segunda parte del curso, Entorno de Desarrollo.
* Configurado Visual Code para trabajar con TypeScript.
* Creado un proyecto para el juego con su estructura de carpetas.
* Creado un archivo TypeScript como ejemplo para compilar y ejecutar en TypeScript.
* Creado archivo JSON en el proyecto para especificar las opciones de compilación.
* Añadida carpeta con los archivos del profesor.
* Añadidos apuntes de la segunda parte del curso, Entorno de Desarrollo.
* Añadido resumen de la segunda parte del curso, Entorno de Desarrollo.

* Añadidos apuntes y resumen del siguiente vídeo del curso, Creación de nuestra plantilla inicial.
	* Creada versión 10 y añadida allí la plantilla de Phaser.
	* Añadido plugin livereload a la plantilla de Phaser.
	* Modificada versión 10 para limpiar caché.

* Añadidos apuntes y resumen del siguiente vídeo del curso, Estructura del Código en Phaser.
	* Aprendida estructura del código en una clase Phaser.Scene.
	* Eliminados archivos innecesarios de la plantilla.
	* Modificado archivo de Phaser.Scene para eliminar y limpiar componentes innecesarios.


### 29/04/2021
* Añadidos apuntes y resumen del siguiente vídeo del curso, Importar y Exportar Módulos.
	* Creada nueva carpeta copia de version10 llamada version11.
	* Estructurada version11 aplicando modularidad añadiendo una carpeta en 'src' para añadir las escenas allí y creando un archivo TS de configuración.
	* Modificados archivos de configuración, juego y escena del nivel 1 correctamente.
	* Añadidos imports y exports necesarios en los diferentes archivos.

* Añadidos apuntes y resumen del siguiente vídeo del curso, Escena carga de Assets.
	* Renombrada version11 a version12 para seguir avanzando en el proyecto.
	* Modificado game.ts para exportar un objeto Juego en vez de Phaser.Game.
	* Creado nuevo archivo referente a escena de carga tipo Phaser.Scene.
		* Creados dos objetos representando dos barras, de carga y de progreso.
		* Creo un método llamado 'creaBarras' para definir la barra de carga e inicializar la barra de progreso.
		* En el preload() establezco el color de fondo de la escena.
		* En el preload creo un listener para realizar la acción de relleno de la barra de carga con la barra de progreso.
		* En el preload creo un listener para cargar la 1a escena del juego, nivel1, cuando la barra de progreso haya completado.
		* Cargo el logo de Phaser 1000 veces para que se muestre en la escena nivel1 una vez cargue.


### 30/04/2021
* Añadidos apuntes y resumen del siguiente vídeo del curso, Escena Menú y Flujo entre Escenas.
	* Renombrada version12 a version13 para seguir avanzando en el proyecto.
	* Limpiada carpeta 'dist' para ahorrar espacio y eliminar archivos innecesarios.
	* Creado nuevo archivo de escena llamado ‘menu.ts’.
		* Muestro el mismo logo que en la escena de Nivel 1.
		* Creo dos variables privadas para controlar el ancho y alto de la escena.
		* En el init() establezco los valores de width y height.
		* Creo un objeto tipo Texto de Phaser.
		* Creo un método para cuando se toque el texto de Phaser se cambie a la escena indicada según parámetros.
	* En el archivo de configuración importo la escena Menú y la añado al array de escenas que deben cargarse en 2a posición.
	* En la escena de carga establezco que la escena que debe cargarse una vez se haya realizado la carga de assets sea la escena Menú en vez del Nivel 1.
	* En la escena del Nivel 1 establezco las mismas variables de ancho y alto, el mismo init y el mismo objeto de texto que en la escena Menú, solo que el texto mostrará 'NIVEL 1'.


### 1/05/2021
* Añadidos comentarios en todos los lugares convenientes del proyecto.
* Añadidos apuntes y resumen del siguiente vídeo del curso, Escena HUD, Intercambio de datos y eventos.
	* Renombrada version13 a version14 para seguir avanzando en el proyecto.
	* Creado nuevo archivo de escena de Phaser llamado 'hud.ts'.
		* Creo una variable de tipo texto de Phaser para mostrar las vidas.
		* Le doy un valor inicial al texto desde el create().
		* Creo una variable en el create() que se refiere a la escena Nivel 1.
		* Recojo los eventos que lanza Nivel 1 para ejecutar una función donde reduzco el número de vidas.
	* En la escena Nivel 1 :
		* Creo una variable tipo Number para llevar la cuenta de las vidas.
		* En el create() creo un objeto tipo texto de Phaser y lo establezco interactivo para cuando se pulse, se reduzca el número de vidas y se emita un evento, el evento que recogerá la escena HUD.

* Realizado reto, donde realizo el mismo proceso para la puntuación, donde al pulsar en el texto de puntuación ésta se aumenta en 1.
	* En el reto he hecho uso de la función Phaser.Utils.String.Pad() para añadir ceros.


### 3/05/2021
* Añadidos apuntes y resumen del siguiente vídeo del curso, Centralizar Identificadores.
	* Renombrada version14 a version16 para seguir avanzando en el proyecto.
	* Creado nuevo archivo TS dedicado a almacenar constantes del proyecto.
	* Rellenado archivo de constantes con las constantes referentes a eventos.
	* Importado archivo de constantes e integradas todas las constantes en los lugares que les corresponden.

* Añadidos apuntes y resumen del siguiente vídeo del curso, Free Assets.
	* Descargados paquetes de Assets en nueva carpeta creada de Assets dentro de la carpeta Juego.

* Añadidos apuntes y resumen del siguiente vídeo del curso, Creación de TileMaps con Tiled.
	* Creada nueva carpeta en assets para el tileset y los niveles del juego.
	* Creado tilemap con el tileset de terrenos usando Tiled.


### 4/05/2021
* Añadidos apuntes y resumen del siguiente vídeo del curso, TileMaps y TileSets desde Tiled.
	* Definidos nombres de los elementos de Tiled en el archivo de Constantes.
	* En el archivo de carga :
		* Aplicadas constantes correspondientes en el archivo de carga.
		* Cargado mapa y tileset desde el archivo de carga con sus nombres referidos usando constantes.
	* En el archivo referente al Nivel 1 :
		* Creadas y definidas variables privadas para los elementos de Tiled.
		* Mostrados elementos de Tiled en create() con sus respectivos datos usando constantes.

* Añadidos apuntes y resumen del siguiente vídeo del curso, Fondo en Moivimiento.
	* Renombrada version17 a version18 para seguir avanzando en el proyecto.
	* Actualizado archivo de constantes.
	* Cargada imagen de fondo en la escena de carga.
	* Realizadas acciones en el archivo referente al Nivel 1 :
		* Creada variable de tipo TileSprite para el fondo.
		* Muestro el fondo en pantalla indicándole sus propiedades en la función create().
		* Creo la función update() y ahí especifico el movimiento del mismo.
		* En la función update() controlo la vuelta a la escena Menú cuando las vidas llegan a 0.

* Añadidos apuntes y resumen del siguiente vídeo del curso, Fuentes Bitmap.
	* Renombrada version18 a version19 para seguir avanzando en el proyecto.
	* Usada fuente proporcionada por el profesor del curso para trabajar en el proyecto.
	* Modifico el archivo de carga para la carga de la fuente.
	* Añado un campo al archivo de configuración para una mejor renderización del PixelArt.
	* Cambiado texto de las constantes que se muestran por pantalla para su visualización con el nuevo font.


### 5/05/2021
* Añadidos apuntes y resumen del siguiente vídeo del curso, Atlas de Imágenes.
	* Renombrada version19 a version20 para seguir avanzando en el proyecto.
	* Creado un Atlas de imágenes del personaje con un programa TexturePacker.
	* Añadido Atlas al proyecto.
	* Añadida nueva constante para el jugador.
	* Añadida carga del Atlas en la escena de carga.

* Añadidos apuntes y resumen del siguiente vídeo del curso, Animaciones, Físicas y Colisiones.
	* Simplificado path de carga en la escena de carga.
	* Actualizado archivo de constantes con las nuevas constantes de las animaciones.
	* En la escena del Nivel 1 :
		* Creo una variable para el jugador.
		* Creo la animación correspondiente a Idle.
		* Especifico que la capa del TiledMap sea colisionable.
		* Añado el collider de la capa.
	* En el archivo de configuración añado otro objeto para las físicas y sus propiedades.


### 10/05/2021
* Añadidos apuntes y resumen del siguiente vídeo del curso, Control de Movimientos.
	* En la escena del Nivel 1 :
		* Añadidas variables referentes a los controles de movimiento del jugador.
		* Añadida definición de la animación de correr del jugador.
		* Controlada gestión de movimientos para aplicarle velocidad y animación al jugador según el control usado.

* Añadidos apuntes y resumen del siguiente vídeo del curso, Clase de Gestión del Jugador.
	* Renombrada version20 a version21 para seguir avanzando en el proyecto.
	* Creada nueva clase de TypeScript para controlar todo lo referente al jugador.
		* Constructor y variables creadas con lo que ya estaba hecho en el nivel 1.
		* Creada función update() con las acciones hechas en el nivel 1.
	* Adaptada clase de la escena del Nivel 1 a la nueva clase referente al jugador.


### 11/05/2021
* Añadidos apuntes y resumen del último vídeo del curso, Posición del Jugador y Objeto Final.
	* Creados objetos puntos en el TiledMap del nivel 1 para la posición final del jugador y la posición del objeto final. 
	* Creada nueva carpeta dentro de 'imagenes' para añadir ahí la imagen del objeto final.
	* Actualizado archivo de constantes con los nuevos valores correspondientes.
	* Cargo el objeto final en la escena de carga con sus valores correspondientes.
	* Defino el objeto final en la escena de nivel 1, indicando todos sus valores para su posición, tamaño, etc..
	* Establezco el collider del objeto final para que se vuelva al menú cuando se toque.
	* Eliminado el texto interactivo con la variable vidas en el nivel 1.
	* Cambiada definición del jugador en el nivel 1 para colocarlo en la posición inicial creada en el TiledMap.

## Terminado Curso de Desarrollo de Videojuegos Básicos con Phaser


### 12/05/2021
## Empezado Curso de Desarrollo Avanzado de Videojuegos con Phaser
* Añadidos apuntes y resumen del primer vídeo del curso, Presentación.

* Añadidos apuntes y resumen del siguiente vídeo, Contador de Tiempo.
	* Renombrada version20 a version21 para seguir avanzando en el proyecto.
	* Actualizado archivo de constantes con los nuevos valores correspondientes.
	* Acciones realizadas en Nivel 1 :
		* Creadas e inicializadas nuevas variables para el contador de tiempo.
		* Añadido parámetro time a la función update().
		* Realizada gestión del contador en update() llamando a su evento y usando el registro.
		* Quitado el logo de Phaser para mejor visión de la interfaz HUD.
	* Creadas variables para el control del tiempo en HUD.
	* Texto del tiempo posicionado y gestionado mediante constantes y registro.
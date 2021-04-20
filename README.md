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
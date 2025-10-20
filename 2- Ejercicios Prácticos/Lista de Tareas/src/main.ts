import { input, close } from "./entradas";
import { Tarea } from "./tarea";
import { GestorTareas, iGestorTareas } from "./gestorTareas";
import { iTarea } from "./iTarea";

//Instanciamos el gestor de tareas
const miGestor: iGestorTareas = new (GestorTareas as any)();

//Muestra los detalles de una tarea y ofrece opciones para editar o volver

async function menuDetalles(tarea: iTarea): Promise<void> {
  //while true para mantener el menú hasta que el usuario decida volver
    while (true) {
    
    (tarea as any).mostrarDetalles(); 
    
    let op = await input('\nPresiona "E" para editar, "0" para volver: ');
    if (op.toLowerCase() === "e") {
      await menuEditar(tarea);
    } else if (op === "0") {
      return;
    } else {
      console.log("Opción inválida.");
    }
  }
}

// menu de edicion de una tarea
async function menuEditar(tarea: iTarea): Promise<void> {
    console.log("\n--- Editando: "+ tarea.titulo +" ---");
    console.log("(Deja en blanco para no cambiar un valor)\n");

    // Usamos 'as any' para poder llamar a los métodos del prototipo Tarea
    const TareaProto = (tarea as any);
 
    const desc = await input("Descripción " + tarea.descripcion+ "  ");
    //si desc no está vacio, llamamos al metodo editarDesc
    while (true) {
    const est = (await input("Estado ([P]endiente /[E]n Curso /[T]erminada /[C]ancelada) [" + tarea.estado + "]: ")).toUpperCase();

    // Opción 1: El usuario no ingresa nada (deja en blanco)
    if (est === "") {
      break;
    }

    // Opción 2: El usuario ingresa una opción válida
    if (est === "P" || est === "E" || est === "T" || est === "C") {
      if (est === "P") TareaProto.editarEstado("Pendiente");
      else if (est === "E") TareaProto.editarEstado("En Curso");
      else if (est === "T") TareaProto.editarEstado("Terminada");
      else if (est === "C") TareaProto.editarEstado("Cancelada");
      
      break; // Salimos del bucle
    }
    
    // Opción 3: El usuario ingresa algo inválido
    console.log("Valor inválido. Intenta de nuevo (P, E, T, C) o deja en blanco.");
  }
    

    while (true) {
    const dif = await input("Dificultad ([1]/[2]/[3]) [" + tarea.dificultad + "]: ");
    
    // Opción 1: No cambiar
    if (dif === "") {
      break; 
    }

    const difNum = parseInt(dif);

    // Opción 2: Valor válido
    if (difNum === 1 || difNum === 2 || difNum === 3) {
      TareaProto.editarDif(difNum);
      break;
    }

    // Opción 3: Valor inválido (NaN o fuera de rango)
    console.log("Valor inválido. Intenta de nuevo (1, 2, 3) o deja en blanco.");
  }
    
    console.log("\n¡Tarea actualizada!");
}


// menú para agregar una nueva tarea
async function menuAgregar(): Promise<void> {
    console.log("\n=== Nueva Tarea ===");
    const titulo = await input("1. Título: ");
    const descripcion = await input("2. Descripción: ");
    let estado = "Pendiente";
    let estadoValido = false;
    while (!estadoValido){
        const estadoTemp = (await input("3. Estado ([P]endiente /[E]n Curso /[T]erminada /[C]ancelada): ")).toUpperCase();
        switch (estadoTemp){
            case "P":
                estado = "Pendiente";
                estadoValido = true;
                break;
            case "E":
                estado = "En Curso";
                estadoValido = true;
                break;
            case "T":
                estado = "Terminada";
                estadoValido = true;
                break;
            case "C":
                estado = "Cancelada";
                estadoValido = true;
                break;
            case "":
                estado = "Pendiente";
                estadoValido = true;
                break;
            default:
                console.log("Estado inválido. Intenta de nuevo.");
        }
    }
    
    const dificultad = parseInt(await input("4. Dificultad (1-3): "));
    
    // Creamos la instancia con 'new'.
    // Ahora 'nuevaTarea' será un objeto cuyo prototipo es Tarea.prototype
    const nuevaTarea: iTarea = new (Tarea as any)(titulo, descripcion, estado, dificultad, null);
    
    // Agregamos la nueva tarea al gestor
    miGestor.agregarTarea(nuevaTarea);
    
    console.log("\n¡Tarea agregada con éxito!");
}

// menú para mostrar tareas según un filtro
async function menuMostrar(filtro: string): Promise<void> {
   // la constante indices guarda un array con los índices de las tareas que coinciden con el filtro
    const indices = miGestor.mostrarTareasPorFiltro(filtro);

  if (indices.length === 0) {
    console.log("\nNo hay tareas para este filtro.");
    return;
  }

  console.log("\n--- Tareas " + filtro + " ---");
  // Mostramos las tareas encontradas
  for (let i = 0; i < indices.length; i++) {
    //la constante indiceGlobal guarda el índice real de la tarea en el gestor
    const indiceGlobal = indices[i];
    //la constante tarea guarda la tarea obtenida por su índice
    const tarea = miGestor.obtenerTareaPorIndice(indiceGlobal);
    // Si la tarea existe, la mostramos
    if (tarea) {
        console.log("[ " + (i + 1) + " ] " + tarea.titulo + " - [ " + tarea.estado + " ]");
    }
  }

  // seleccion guarda la elección del usuario para ver detalles de una tarea
  const seleccion = parseInt(await input("\nElige una tarea para ver sus detalles (0 para volver): "));
  
  if (seleccion > 0 && seleccion <= indices.length) {
  //indiceGlobalSeleccionado guarda el índice real de la tarea seleccionada
    const indiceGlobalSeleccionado = indices[seleccion - 1];
    //tareaSeleccionada guarda la tarea obtenida por su índice con la ayuda de obtenerTareaPorIndice
    const tareaSeleccionada = miGestor.obtenerTareaPorIndice(indiceGlobalSeleccionado);

    if (tareaSeleccionada) {
        //Hacemos uso de asincronia para esperar a que el usuario termine de ver los detalles, o editar la tarea, etc.
      await menuDetalles(tareaSeleccionada);
    }
  }
}

// Función para mostrar el submenú de mostrar tareas
async function subMenuMostrar(): Promise<void> {
    const op = await input(`
=== ¿Qué tareas deseas ver? ===
[1] Todas
[2] Pendientes
[3] En Curso
[4] Terminadas
[0] Volver
===============================
Opción: `);
    switch(op){
        case "1":
            await menuMostrar("Todas");
            break;
        case "2":
            await menuMostrar("Pendiente");
            break;
        case "3":
            await menuMostrar("En Curso");
            break;
        case "4":
            await menuMostrar("Cancelada");
            break;
        case "0":
            console.log("Opcion Invalida.");
        break;
    }
    
}


//Menu para buscar tareas por titulo
async function menuBuscar(): Promise<void> {
    const clave = await input("\nIntroduce un término para buscar por título: ");
    //si la clave esta vacia salimos
    if (!clave) return;

    //la constante indices guarda un array con los indices de las tareas que coinciden con la busqueda
    const indices = miGestor.buscarTareasPorTitulo(clave);

    if (indices.length === 0) {
        console.log("\nNo se encontraron tareas.");
        return;
    }

    console.log("\n--- Tareas Encontradas ---");
    //bucle para mostrar las tareas encontrasas
    for (let i = 0; i < indices.length; i++) {
        //guarda el indice real de la tarea en el gestor
        const indiceGlobal = indices[i];
        //guarda la tarea obrenida por su indice
        const tarea = miGestor.obtenerTareaPorIndice(indiceGlobal);
        if (tarea) {
            console.log(`[${i + 1}] ${tarea.titulo} - [${tarea.estado}]`);
        }
    }

    //seleccion guarda la eleccion del usuario apra ver detalles de una tarea
    const seleccion = parseInt(await input("\nElige una tarea para ver sus detalles (0 para volver): "));
    if (seleccion > 0 && seleccion <= indices.length) {
        const indiceGlobal = indices[seleccion - 1];
        const tarea = miGestor.obtenerTareaPorIndice(indiceGlobal);
        if (tarea) {
            await menuDetalles(tarea);
        }
    }
}

//función principal que maneja el menú
async function main(): Promise<void> {
  while (true) {
    const op = await input(`
==== MENÚ PRINCIPAL ====
1. Ver mis tareas
2. Buscar una tarea
3. Agregar una tarea
0. Salir
======================
Elija una opción: `);

    switch (op) {
      case "1":
        await subMenuMostrar();
        break;
      case "2":
        await menuBuscar();
        break;
      case "3":
        await menuAgregar();
        break;
      case "0":
        console.log("¡Adiooooos!");
        close();
        return;
      default:
        console.log("Opción inválida.");
    }
    await input("\nPresiona Enter para continuar...");
  }
}

main();
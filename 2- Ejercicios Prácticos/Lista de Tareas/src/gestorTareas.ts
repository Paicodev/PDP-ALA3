import { iTarea } from './iTarea';
import { input } from './entradas';

/*Definimos lo que debe tener un objeto GestorTareas
    *tenemos tareas: un array de iTarea
    *contador: un número para llevar la cuenta de tareas
    *métodos para agregar, buscar, obtener y mostrar tareas
*/
interface iGestorTareas{

   tareas: iTarea[];
   contador: number;
   agregarTarea(tarea: iTarea): void;
   buscarTareasPorTitulo(clave: string): number[];
   obtenerTareaPorIndice(indice: number): iTarea | null;
   mostrarTareasPorFiltro(filtro: string): number[];
}

/*La funcion constructora GestorTareas
    *this.tareas se inicializa como un array vacío
    *this.contador se inicializa a 0
*/
function GestorTareas(this: iGestorTareas){
    this.tareas = [];
    this.contador = 0;

}

/*METODOS DE GESTOR TAREAS
  *En cada metodo usamos this: iGestorTareas para que TypeScript reconozca las propiedades del objeto
  *aparte de el uso de iGestorTareas, usamos tarea, indice, clave y filtro según corresponda en cada metodo 
*/
// Agrega una nueva tarea al gestor, tarea se usa para recibir la tarea a agregar
(GestorTareas as any).prototype.agregarTarea = function (this: iGestorTareas, tarea: iTarea): void {
  this.tareas[this.contador] = tarea;
  this.contador++;
};

// Obtiene una tarea por su índice, indice se usa para recibir el índice de la tarea a obtener
//indice es un número que representa la posición de la tarea en el array
(GestorTareas as any).prototype.obtenerTareaPorIndice = function (this: iGestorTareas, indice: number): iTarea | null {
  if (indice >= 0 && indice < this.contador) {
    return this.tareas[indice];
  }
  return null;
};

/* Busca tareas cuyo título contenga la clave ingresada, clave se usa para recibir la palabra clave a buscar.
   *Devuelve un array numerico con los índices de las tareas que coinciden con la búsqueda.
*/
(GestorTareas as any).prototype.buscarTareasPorTitulo = function (this: iGestorTareas, clave: string): number[] {
  const indicesEncontrados: number[] = [];
  let contadorIndices = 0;

  // Recorremos todas las tareas para buscar coincidencias en el título
  for (let i = 0; i < this.contador; i++) {
  //Si el título de la tarea incluye la clave, guardamos su índice
    if (this.tareas[i].titulo.toLowerCase().includes(clave.toLowerCase())) {
        // Guardamos el índice de la tarea que coincide
      indicesEncontrados[contadorIndices] = i;
      contadorIndices++;
    }
  }
  // Devolvemos el array con los índices encontrados
  return indicesEncontrados;
};

// Muestra tareas según el filtro de estado, filtro se usa para recibir el estado por el cual filtrar
(GestorTareas as any).prototype.mostrarTareasPorFiltro = function (this: iGestorTareas, filtro: string): number[] {
  const indicesFiltrados: number[] = [];
  let contadorIndices = 0;

  for (let i = 0; i < this.contador; i++) {
    // Si el filtro es "Todas" o el estado de la tarea coincide con el filtro, guardamos su índice
    if (filtro === "Todas" || this.tareas[i].estado === filtro) {
      indicesFiltrados[contadorIndices] = i;
      contadorIndices++;
    }
  }
  return indicesFiltrados;
};

export { GestorTareas, iGestorTareas };



import { ITarea } from "./ITarea";

//Definimos la funcion constructora Tarea, que recibe los datos de la interfaz ITarea y devuelve un objeto de tipo ITarea
function Tarea(titulo: string, descripcion: string, estado: string, dificultad: number, vencimiento: Date | null): ITarea {
    //Creamos el objeto ITarea con las propiedades recibidas y las fechas de creacion y edicion actuales
const obj: ITarea = {
    titulo,
    descripcion,
    estado,
    dificultad,
    vencimiento,
    creacion: new Date(),
    edicion: new Date(),
};
//Devolvemos el objeto creado, esto asegura que el objeto tenga toda la estructura definida en la interfaz ITarea
return obj;
}

/*Metodos agregados al prototipo de Tarea
  *Aqui hago uso de prototipos para agregar metodos al objeto Tarea. 
  *Cada objeto de tipo Tarea podra usar estos metodos para modificar sus propiedades o mostrar informacion.
  *Tarea debe definirse como any para evitar errores de tipos al agregar metodos al prototipo en TypeScript.
  *Todos los metodos son de tipo function para mantener el contexto de 'this' correcto.
  */
(Tarea as any).prototype.editarTitulo = function (nuevoTitulo: string){
    this.titulo = nuevoTitulo || this.titulo;
    this.edicion = new Date();
}; 

(Tarea as any).prototype.editarDesc = function (nuevaDesc: string){
    this.descripcion = nuevaDesc || this.descripcion;
    this.edicion = new Date();
};

(Tarea as any).prototype.editarEstado = function (nuevoEstado: string){
    this.estado = nuevoEstado || this.estado;
    this.edicion = new Date();
};

(Tarea as any).prototype.editarDif = function (nuevaDif: number){
    if ( nuevaDif >= 1 && nuevaDif <= 5 ){
        this.dificultad = nuevaDif;
        this.edicion = new Date();
    }
};

(Tarea as any).prototype.editarVenc = function (nuevoVenc: Date | null){
    this.vencimiento = nuevoVenc || this.vencimiento;
    this.edicion = new Date();
};

(Tarea as any).prototype.getDifEstrellas = function (): string {
    //Segun lo que vale this.dificultad, devuelve una cadena con estrellas representando la dificultad
    switch (this.dificultad){
        case 1: 
        return "★☆☆ (Fácil)";
        case 2:
        return "★★☆ (Media)";
        case 3:
        return "★★★ (Difícil)";
        default: 
        return "No definida";
    }
};

//Muestra por consola los detalles de la tarea
(Tarea as any).prototype.mostrarDetalles = function (): string {
    console.log("--- Detalles de la Tarea ---");
    console.log("Título: " + this.titulo);
    console.log("Descripción: " + this.descripcion);
    console.log("Estado: " + this.estado);
    console.log("Dificultad: " + this.getDifEstrellas());
    console.log("Vencimiento: " + (this.vencimiento || "Sin Datos"));
    console.log("Creación: " + this.creacion);
    console.log("Última Edición: " + this.edicion);
    return "----------------------------";
}

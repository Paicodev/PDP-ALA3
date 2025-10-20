import { iTarea } from "./iTarea";

//Definimos la funcion constructora Tarea, que recibe a this de tipo iTarea y los parametros necesarios para crear una tarea
function Tarea(this: iTarea, titulo: string, descripcion: string, estado: string, dificultad: number, vencimiento: Date | null){
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.estado = estado;
    this.dificultad = dificultad;
    this.vencimiento = vencimiento;
    this.creacion = new Date();
    this.edicion = new Date();
}

/*Metodos agregados al prototipo de Tarea
  *Aqui hago uso de prototipos para agregar metodos al objeto Tarea. 
  *Cada objeto de tipo Tarea podra usar estos metodos para modificar sus propiedades o mostrar informacion.
  *Tarea debe definirse como any para evitar errores de tipos al agregar metodos al prototipo en TypeScript.
  *Cada function devuelve this: iTarea cuando es un metodo de edicion, para permitir encadenar llamadas si se desea.
  *Todos los metodos son de tipo function para mantener el contexto de 'this' correcto.
  */
(Tarea as any).prototype.editarTitulo = function (this: iTarea, nuevoTitulo: string){
    this.titulo = nuevoTitulo || this.titulo;
    this.edicion = new Date();
}; 

(Tarea as any).prototype.editarDesc = function (this: iTarea, nuevaDesc: string){
    this.descripcion = nuevaDesc || this.descripcion;
    this.edicion = new Date();
};

(Tarea as any).prototype.editarEstado = function (this: iTarea, nuevoEstado: string){
    this.estado = nuevoEstado || this.estado;
    this.edicion = new Date();
};

(Tarea as any).prototype.editarDif = function (this: iTarea, nuevaDif: number){
    if ( nuevaDif >= 1 && nuevaDif <= 3 ){
        this.dificultad = nuevaDif;
        this.edicion = new Date();
    }
};

(Tarea as any).prototype.editarVenc = function (this: iTarea, nuevoVenc: Date | null){
    this.vencimiento = nuevoVenc || this.vencimiento;
    this.edicion = new Date();
};

(Tarea as any).prototype.getDifEstrellas = function (this:iTarea): string {
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

export { Tarea };
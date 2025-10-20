# Explicación sobre las características de la Programación Orientada a Objetos (POO) #
En ambos programas (la calculadora y la lista de tareas) he aplicado distintos principios importantes de la Programación Orientada a Objetos (POO). 

1. Encapsulamiento
Este consiste en agrupar los datos (atributos) y métodos (acciones) que operan sobre esos datos dentro de una misma entidad (clase u objeto)

En la calculadora, los atributos operador_a y operador_b están contenidos dentro de la clase calculadora, junto con los métodos que los manipulan (sumar, restar, multiplicar, dividir). Esto me permite mantener control sobre cómo se usan los valores.

```TypeScript

class calculadora {
  operador_a: number;
  operador_b: number;
  constructor(operador_a: number, operador_b: number) {
    this.operador_a = operador_a;
    this.operador_b = operador_b;
  }
  sumar(): number { return this.operador_a + this.operador_b; }
}
```

De esta manera, las operaciones están “encapsuladas” dentro de la clase y no se realizan directamente sobre los números fuera de ella.

En la lista de tareas, aunque no utilicé clases sino prototipos, el mismo concepto se aplica: los datos (titulo, descripcion, estado, etc.) se relacionan con los métodos que modifican (editarDescripcion, editarEstado, etc.) dentro del objeto Tarea.

2. Abstracción
La abstracción permite representar entidades reales mediante modelos más simples, destacando solo la información que nos interesa.

En la calculadora, se abstrae el concepto de una operación matemática con solo 4 operaciones sobre dos números.

En la lista de tareas, se abstrae el concepto de una tarea con sus datos y comportamientos

```TypeScript

const tarea1 = new Tarea("Estudiar", "Repasar POO", "Pendiente", 2, null);
```

Acá lo importante es como el usuario pueda manipularla con acciones concretas, ya sea editando, adicionando, buscando, etc.

3. Modularidad
Ambos programas están divididos en módulos independientes (calculadora.ts, input.ts, main.ts, etc.), esto me sirvió mucho para su legibilidad, mantenimiento, reutilizacion, y hasta incluso detectar errores puntuales. Cada módulo tiene su responsabilidad, como el input de recibir las entradas del usuario, o calculadora definiendo la lógica de las operaciones, en la lista de tareas, iTarea define como debe ser una tarea, Tarea, los comportamiento de esa lista, que hacer cuando agregarmos una nueva, cuando obtenermos una por indice, etc.

4. Uso de Prototipos 
En el caso de la lista de tareas, apliqué el modelo de prototipos de JavaScript (y yo le apliqué el tipado para usarlo en TypeScript), donde los métodos se agregan manualmente al prototipo de la función constructora:

```TypeScript

(Tarea as any).prototype.editarDescripcion = function (nuevaDesc: string) {
  this.descripcion = nuevaDesc || this.descripcion;
};
```
Todas las tareas van a acceder al mismo método gracias a la funcion Tarea.prototype, esto nos garantiza que todas las instancias con new Tarea() tengan acceso al mismo método.
Esto cumple el mismo propósito que la herencia de clases, ya que todas las instancias de Tarea comparten estos métodos sin duplicarlos (En cada tarea que vayamos a crear, van a acceder a la misma función). 

5. Polimorfismo (no implementado directamente)
No implementé polimorfismo, los programas no requerian sobreescribir métodos a mi punto de vista, o definir comportamientos distintos. Me enfoqué en entender y aplicar prototipos en la lista de tareas y fue todo un desafio, pero una vez tuve la estructura fue mas fácil.
Por ejemplo, en la lista de tareas todas las instancias comparten el mismo conjunto de métodos, tal vez, podria aplicar polimorfismo creando distintos tipos de tareas como, TareasAcademicas, TareasPersonales, TareasLaborales, y esto podria redefinir algunos comportamientos

6. Herencia (no implementada)
Tampoco utilicé herencia porque son programas que no la requieren esencialmente, quizás se podria utilizar una clase operacion base y que de ella hayan clases hijas (suma, resta, multiplicacion, division). siendo que cada clase hija use un super para el constructor, y la clase operacion tenga en el constructor original a operando_a y operando_b.
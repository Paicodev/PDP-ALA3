### **Lenguaje: JavaScript (paradigma orientado a objetos basado en prototipos)**

#### **1. Generalización simbólica**
JavaScript implementa la orientación a objetos mediante el uso de **prototipos**, en lugar de clases tradicionales (aunque las sintaxis modernas las simulan). Sus reglas escritas principales dentro de este paradigma son:
- **Herencia prototípica:** los objetos pueden heredar directamente de otros objetos mediante el enlace prototípico (`[[Prototype]]` o `Object.create()`).
- **Funciones constructoras:** permiten crear nuevos objetos y establecer su prototipo a través de la palabra clave `new`.
- **Métodos y propiedades dinámicas:** los objetos pueden modificarse en tiempo de ejecución, agregando o eliminando atributos y métodos.
- **`this` contextual:** el valor de `this` depende del modo en que la función es invocada, lo que refuerza la flexibilidad del modelo de objetos.
- **Encapsulamiento mediante closures:** aunque no existen modificadores de acceso formales, se logra el ocultamiento de datos utilizando funciones internas.
- **Prototipo global (`Object.prototype`):** todos los objetos heredan, directa o indirectamente, de este prototipo base.
Muchas de estas reglas las utilizo en el práctico.

#### **2. Creencias de los profesionales**
Los desarrolladores que trabajan con JavaScript bajo el paradigma orientado a objetos basado en prototipos suelen sostener ciertas creencias sobre sus ventajas:
- **Flexibilidad extrema:** el sistema de prototipos permite modificar o extender objetos en tiempo de ejecución, adaptándose fácilmente a distintas necesidades.
- **Simplicidad conceptual:** al no depender de jerarquías de clases rígidas, se puede representar la herencia de forma más natural.
- **Reutilización eficiente:** el enlace prototípico evita duplicaciones, ya que los métodos compartidos se almacenan en el prototipo común.
- **Alta expresividad:** se pueden combinar características de la programación funcional y orientada a objetos sin restricciones.
- **Modelo mental cercano a la realidad:** al trabajar directamente con objetos concretos que heredan de otros, se facilita el razonamiento sobre el comportamiento del sistema.

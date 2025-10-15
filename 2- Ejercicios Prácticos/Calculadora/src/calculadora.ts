//Constructor de la calculadora
function Calculadora() {}

//Metodos del prototipo que realizaran los operandos entre numeros
Calculadora.prototype = {
    sumar(a:number, b:number): number{
        return a + b;
    },
    restar(a:number, b:number): number{
        return a - b;
    },
    multiplicar(a:number, b:number): number{
        return a * b;
    },
    dividir(a:number, b:number): number{
        if (b === 0) {
            //Palabra clave throw que trata de manejar la excepción
            throw new Error("No se puede dividir por cero");
        }
        return a / b;
    }
};

export {Calculadora};
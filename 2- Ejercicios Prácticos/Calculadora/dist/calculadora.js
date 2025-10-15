"use strict";
//Constructor de la calculadora
function Calculadora() { }
//Metodos del prototipo que realizaran los operandos entre numeros
Calculadora.prototype = {
    sumar(a, b) {
        return a + b;
    },
    restar(a, b) {
        return a - b;
    },
    multiplicar(a, b) {
        return a * b;
    },
    dividir(a, b) {
        if (b === 0) {
            //Palabra clave throw que trata de manejar la excepción
            throw new Error("No se puede dividir por cero");
        }
        return a / b;
    }
};

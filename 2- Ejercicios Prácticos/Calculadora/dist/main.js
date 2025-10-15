"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
const calculadora_1 = require("./calculadora");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("---CALCULADORA---\n");
        const calc = new calculadora_1.Calculadora();
        //booleano continuar que realizara las operaciones mientras sea true
        let continuar = true;
        do {
            console.log("\nElige las operacion que desees:");
            console.log("1. Sumar");
            console.log("2. Restar");
            console.log("3. Multiplicar");
            console.log("4. Dividir");
            console.log("5. Salir");
            const opcion = yield (0, input_1.input)("Seleccione una opción (1-5): ");
            if (opcion === "5") {
                continuar = false;
                console.log("Saliendo de la calculadora...");
                break;
            }
            //las variables a y b recibiran un string debido al await del modulo input pero con parseFloat se convertiran de tipo 
            let a = parseFloat(yield (0, input_1.input)("Ingrese el primer número: "));
            let b = parseFloat(yield (0, input_1.input)("Ingrese el segundo número: "));
            let resultado;
            switch (opcion) {
                case "1":
                    resultado = calc.sumar(a, b);
                    console.log("Resultado: " + resultado);
                    break;
                case "2":
                    resultado = calc.restar(a, b);
                    console.log("Resultado: " + resultado);
                    break;
                case "3":
                    resultado = calc.multiplicar(a, b);
                    console.log("Resultado: " + resultado);
                    break;
                case "4":
                    if (b === 0) {
                        console.log("Error: no se puede dividir por cero.");
                    }
                    else {
                        resultado = calc.dividir(a, b);
                        console.log("Resultado: " + resultado);
                    }
                    break;
                default:
                    console.log("Opción no válida, intente nuevamente.");
            }
        } while (continuar);
        (0, input_1.close)();
    });
}
main();

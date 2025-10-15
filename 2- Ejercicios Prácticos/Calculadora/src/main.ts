import {input, close} from "./input";
import { Calculadora } from "./calculadora";

async function main(){
console.log("---CALCULADORA---\n");
const calc = new(Calculadora as any)();
//booleano continuar que realizara las operaciones mientras sea true
let continuar = true;

 do {
        console.log("\nElige las operacion que desees:");
        console.log("1. Sumar");
        console.log("2. Restar");
        console.log("3. Multiplicar");
        console.log("4. Dividir");
        console.log("5. Salir");

        const opcion = await input("Seleccione una opción (1-5): ");

        if (opcion === "5") {
            continuar = false;
            console.log("Saliendo de la calculadora...");
            break;
         }

        //las variables a y b recibiran un string debido al await del modulo input pero con parseFloat se convertiran de tipo 
        let a = parseFloat(await input("Ingrese el primer número: "));
        let b = parseFloat(await input("Ingrese el segundo número: "));
        let resultado: number | string;

        switch (opcion) {
            case "1":
                resultado = calc.sumar(a, b);
                console.log("Resultado: " + resultado);
                break;
            case "2":
                resultado = calc.restar(a, b);
                console.log("Resultado: "+ resultado);
                break;
            case "3":
                resultado = calc.multiplicar(a, b);
                console.log("Resultado: "+ resultado);
                break;
            case "4":
                if (b === 0) {
                    console.log("Error: no se puede dividir por cero.");
                } else {
                    resultado = calc.dividir(a, b);
                    console.log("Resultado: "+ resultado);
                }
                break;
            default:
                console.log("Opción no válida, intente nuevamente.");
        }

    } while (continuar);

    close();
}

main();
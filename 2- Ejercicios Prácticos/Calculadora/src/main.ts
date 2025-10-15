import {input, close} from "./input";
import {calculadora} from "./calculadora";

class App {
    //Metodo main que es asincrono porque utiliza await (que utiliza promise)
async main(){
//booleano continuar que realizara las operaciones mientras sea true
    let continuar = true;

 do {
    console.log("---CALCULADORA---\n");
        console.log("\nElige las operacion que desees:");
        console.log("1. Sumar");
        console.log("2. Restar");
        console.log("3. Multiplicar");
        console.log("4. Dividir");
        console.log("5. Salir");

        //opcion espera al usuario a que ingrese una opcion y almacena la variable
        const opcion = await input("Seleccione una opción (1-5): ");

        if (opcion === "5") {
            //el valor false en continuar provoca que salgamos del bucle
            continuar = false;
            console.log("Saliendo de la calculadora...");
            break;
         }

        //las variables a y b recibiran un string debido al await del modulo input pero con parseFloat se convertiran de tipo 
        let a = parseFloat(await input("Ingrese el primer número: "));
        let b = parseFloat(await input("Ingrese el segundo número: "));
        //Instanciacion de la clase calculadora usando los numeros ingresados como parametros
        const calc = new calculadora(a,b);
        //la variable resultado puede ser un string o un numero.
        let resultado: number | string;

        switch (opcion) {
            case "1":
                resultado = calc.sumar();
                console.log("Resultado: " + resultado);
                break;
            case "2":
                resultado = calc.restar();
                console.log("Resultado: "+ resultado);
                break;
            case "3":
                resultado = calc.multiplicar();
                console.log("Resultado: "+ resultado);
                break;
            case "4":
                if (b === 0) {
                    console.log("Error: no se puede dividir por cero.");
                } else {
                    resultado = calc.dividir();
                    console.log("Resultado: "+ resultado);
                }
                break;
            default:
                console.log("Opción no válida, intente nuevamente.");
        }

    } while (continuar);
//se cierra la interfaz de entradas
    close();
}
}
//se crea una instancia de la clase App y ejecuta el metodo main para iniciar la aplicacion.
const app = new App();
app.main();
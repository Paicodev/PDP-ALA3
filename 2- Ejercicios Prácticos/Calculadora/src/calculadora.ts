//Constructor de la calculadora
class calculadora {
    operando_a: number;
    operando_b: number;
    
    constructor(operando_a: number, operando_b: number){
    this.operando_a = operando_a;
    this.operando_b = operando_b;
    }

    sumar(): number{
        return this.operando_a + this.operando_b;
    }
    restar(): number{
        return this.operando_a - this.operando_b;
    }
    multiplicar(): number{
        return this.operando_a * this.operando_b;
    }
    dividir(): number{
        if (this.operando_b === 0) {
            //Palabra clave throw que trata de manejar la excepción
            throw new Error("No se puede dividir por cero");
        }
        return this.operando_a / this.operando_b;
    }
}

export {calculadora};
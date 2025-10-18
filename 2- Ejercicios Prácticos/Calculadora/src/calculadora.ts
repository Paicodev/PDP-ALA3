//Constructor de la calculadora
class calculadora {
    a: number;
    b: number;
    
    constructor(a: number, b: number){
    this.a = a;
    this.b = b;
    }

    sumar(): number{
        return this.a + this.b;
    }
    restar(): number{
        return this.a - this.b;
    }
    multiplicar(): number{
        return this.a * this.b;
    }
    dividir(): number{
        if (this.b === 0) {
            //Palabra clave throw que trata de manejar la excepción
            throw new Error("No se puede dividir por cero");
        }
        return this.a / this.b;
    }
}

export {calculadora};
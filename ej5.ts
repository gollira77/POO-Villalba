// Ejercicio 5 — Getters y setters

class Persona {
  private readonly dni: string;
  nombre: string;
  private _edad: number = 0;
  private _email: string = "";

  constructor(dni: string, nombre: string, edad: number, email: string) {
    this.dni = dni;
    this.nombre = nombre;
    // Se asigna a través de los setters para que también se validen al crear.
    this.edad = edad;
    this.email = email;
  }

  get edad(): number {
    return this._edad;
  }

  set edad(valor: number) {
    if (valor < 0) {
      throw new Error(`La edad no puede ser negativa (recibido: ${valor})`);
    }
    if (valor > 120) {
      throw new Error(`La edad no puede ser mayor a 120 (recibido: ${valor})`);
    }
    this._edad = valor;
  }

  get email(): string {
    return this._email;
  }

  set email(valor: string) {
    if (!valor.includes("@")) {
      throw new Error(`Email inválido, falta "@" (recibido: "${valor}")`);
    }
    this._email = valor;
  }

  // Solo lectura: no hay setter y el valor se calcula cada vez que se lee.
  get esMayorDeEdad(): boolean {
    return this._edad >= 18;
  }

  // No incluye dni ni email: son datos sensibles.
  get datosPublicos(): string {
    return `${this.nombre} — mayor de edad: ${this.esMayorDeEdad ? "sí" : "no"}`;
  }
}

// ---------- Pruebas ----------
const persona = new Persona("40123456", "Carla", 17, "carla@mail.com");
console.log(persona.datosPublicos);
console.log("Edad:", persona.edad, "| Email:", persona.email);

persona.edad = 18; // usa el setter
console.log("Cumplió años →", persona.datosPublicos);

try {
  persona.edad = -5;
} catch (error) {
  console.log("Error:", (error as Error).message);
}

try {
  persona.edad = 130;
} catch (error) {
  console.log("Error:", (error as Error).message);
}

try {
  persona.email = "carla.mail.com";
} catch (error) {
  console.log("Error:", (error as Error).message);
}
console.log("La edad y el email no cambiaron:", persona.edad, persona.email);

try {
  new Persona("38999888", "Error", 200, "x@y.com");
} catch (error) {
  console.log("Error al crear:", (error as Error).message);
}

// Estas líneas no compilan:
// persona.dni;                 // dni es privado
// persona.esMayorDeEdad = true; // es de solo lectura (no tiene setter)

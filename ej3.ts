// Ejercicio 3 — Herencia

class Empleado {
  protected nombre: string;
  protected antiguedad: number;

  constructor(nombre: string, antiguedad: number) {
    this.nombre = nombre;
    this.antiguedad = antiguedad;
  }

  // La clase base no sabe calcular un sueldo real: cada subclase lo decide.
  calcularSueldo(): number {
    return 0;
  }

  // No se reescribe en las subclases: llama a this.calcularSueldo(), que se
  // resuelve según el tipo real del objeto (polimorfismo).
  describir(): string {
    return `${this.nombre} (${this.antiguedad} años) — sueldo: $${this.calcularSueldo()}`;
  }
}

class EmpleadoFijo extends Empleado {
  private sueldoBase: number;

  constructor(nombre: string, antiguedad: number, sueldoBase: number) {
    super(nombre, antiguedad);
    this.sueldoBase = sueldoBase;
  }

  // sueldoBase + 2% del sueldoBase por cada año de antigüedad
  override calcularSueldo(): number {
    const bono = this.sueldoBase * 0.02 * this.antiguedad;
    return this.sueldoBase + bono;
  }
}

// ---------- Pruebas ----------
const generico = new Empleado("Genérico", 1);
const juan = new EmpleadoFijo("Juan", 3, 500000);
const maria = new EmpleadoFijo("María", 10, 800000);

console.log(generico.describir()); // sueldo 0: la base no sabe calcular
console.log(juan.describir()); // 500000 + 6% = 530000
console.log(maria.describir()); // 800000 + 20% = 960000

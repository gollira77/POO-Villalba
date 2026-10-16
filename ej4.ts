// Ejercicio 4 — Polimorfismo
// Se repite la jerarquía del ejercicio 3 para que este archivo se ejecute solo
// (si se importara de ej3.ts, también se correrían las pruebas de ese archivo).

class Empleado {
  protected nombre: string;
  protected antiguedad: number;

  constructor(nombre: string, antiguedad: number) {
    this.nombre = nombre;
    this.antiguedad = antiguedad;
  }

  calcularSueldo(): number {
    return 0;
  }

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

  override calcularSueldo(): number {
    const bono = this.sueldoBase * 0.02 * this.antiguedad;
    return this.sueldoBase + bono;
  }
}

class EmpleadoPorHoras extends Empleado {
  private horasTrabajadas: number;
  private valorHora: number;

  constructor(nombre: string, antiguedad: number, horasTrabajadas: number, valorHora: number) {
    super(nombre, antiguedad);
    this.horasTrabajadas = horasTrabajadas;
    this.valorHora = valorHora;
  }

  // horas × valor hora, sin bono por antigüedad
  override calcularSueldo(): number {
    return this.horasTrabajadas * this.valorHora;
  }
}

class EmpleadoPorComision extends Empleado {
  private ventasDelMes: number;
  private porcentajeComision: number;

  constructor(nombre: string, antiguedad: number, ventasDelMes: number, porcentajeComision: number) {
    super(nombre, antiguedad);
    this.ventasDelMes = ventasDelMes;
    this.porcentajeComision = porcentajeComision;
  }

  // ventas × porcentaje (el porcentaje se pasa como número entero, ej: 10 = 10%)
  override calcularSueldo(): number {
    return (this.ventasDelMes * this.porcentajeComision) / 100;
  }
}

// Función suelta (no método): suma el sueldo de todos sin importar su tipo.
function calcularNomina(empleados: Empleado[]): number {
  let total = 0;
  for (const empleado of empleados) {
    total += empleado.calcularSueldo();
  }
  return total;
}

// ---------- Pruebas ----------
const empleados: Empleado[] = [
  new EmpleadoFijo("Juan", 3, 500000),
  new EmpleadoPorHoras("Lucía", 1, 120, 3000),
  new EmpleadoPorComision("Pedro", 5, 4000000, 10),
  new EmpleadoFijo("María", 10, 800000),
  new EmpleadoPorHoras("Tomás", 8, 80, 3500),
];

// No se pregunta de qué tipo es cada uno: cada objeto responde con su propia versión.
for (const empleado of empleados) {
  console.log(`Sueldo: $${empleado.calcularSueldo()} → ${empleado.describir()}`);
}

console.log("Total de la nómina: $" + calcularNomina(empleados));

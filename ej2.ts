// Ejercicio 2 — Encapsulamiento

class CuentaBancaria {
  readonly titular: string;
  private saldo: number;
  private historial: string[] = [];

  constructor(titular: string, montoInicial: number) {
    this.titular = titular;
    this.saldo = montoInicial;
  }

  depositar(monto: number): void {
    if (monto <= 0) {
      throw new Error(`El monto a depositar debe ser mayor a 0 (recibido: ${monto})`);
    }
    this.saldo += monto;
    this.historial.push(`depósito: +${monto}`);
  }

  retirar(monto: number): void {
    if (monto <= 0) {
      throw new Error(`El monto a retirar debe ser mayor a 0 (recibido: ${monto})`);
    }
    if (monto > this.saldo) {
      throw new Error(`Saldo insuficiente: se pidieron ${monto} y hay ${this.saldo}`);
    }
    this.saldo -= monto;
    this.historial.push(`retiro: -${monto}`);
  }

  consultarSaldo(): number {
    return this.saldo;
  }

  // Devuelve una copia: si quien llama la modifica, el historial interno no cambia.
  obtenerHistorial(): string[] {
    return [...this.historial];
  }
}

// ---------- Pruebas ----------
const cuenta = new CuentaBancaria("Ana López", 5000);
console.log(`Titular: ${cuenta.titular} — saldo inicial: $${cuenta.consultarSaldo()}`);

cuenta.depositar(2000);
cuenta.retirar(1500);
console.log("Saldo actual:", cuenta.consultarSaldo());

try {
  cuenta.depositar(0);
} catch (error) {
  console.log("Error:", (error as Error).message);
}

try {
  cuenta.retirar(-100);
} catch (error) {
  console.log("Error:", (error as Error).message);
}

try {
  cuenta.retirar(100000);
} catch (error) {
  console.log("Error:", (error as Error).message);
}

const copia = cuenta.obtenerHistorial();
console.log("Historial:", copia);

copia.push("depósito: +999999"); // intento de "trucho" desde afuera
copia.length = 0;
console.log("Historial real (no se alteró):", cuenta.obtenerHistorial());

// Estas líneas no compilan porque saldo e historial son privados:
// cuenta.saldo = 1000000;
// cuenta.historial.push("...");
// cuenta.titular = "Otro"; // titular es readonly

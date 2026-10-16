// Ejercicio 1 — Abstracción
// Para vender solo importan: nombre, precio, categoría y stock.
// Datos reales como el color del embalaje, el peso o el proveedor se dejan afuera
// porque no intervienen en ninguna operación de venta.

class Producto {
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;

  constructor(nombre: string, precio: number, categoria: string, stock: number) {
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.stock = stock;
  }

  describir(): string {
    return `${this.nombre} (${this.categoria}): $${this.precio} — ${this.stock} unidades`;
  }

  hayStock(cantidad: number): boolean {
    return this.stock - cantidad >= 0;
  }

  // Decisión: lanza un Error si no se puede vender.
  // Justificación: una venta fallida es una situación excepcional que quien llama
  // no puede ignorar por accidente (un console.log pasaría desapercibido y el
  // sistema seguiría como si la venta se hubiera hecho). Con un Error, el código
  // que llama decide qué hacer con try/catch (avisar al cliente, ofrecer menos, etc.).
  venderUnidades(cantidad: number): void {
    if (cantidad <= 0) {
      throw new Error(`La cantidad a vender debe ser mayor a 0 (recibido: ${cantidad})`);
    }
    if (!this.hayStock(cantidad)) {
      throw new Error(
        `Stock insuficiente de ${this.nombre}: se pidieron ${cantidad} y hay ${this.stock}`
      );
    }
    this.stock -= cantidad;
  }

  // Simulación: calcula el precio con descuento sin tocar this.precio.
  aplicarDescuento(porcentaje: number): number {
    return this.precio - (this.precio * porcentaje) / 100;
  }
}

// ---------- Pruebas ----------
const teclado = new Producto("Teclado", 10000, "electrónica", 5);
const yerba = new Producto("Yerba 1kg", 3500, "almacén", 20);

console.log(teclado.describir());
console.log(yerba.describir());

console.log("¿Hay stock para 3 teclados?", teclado.hayStock(3));
console.log("¿Hay stock para 10 teclados?", teclado.hayStock(10));

teclado.venderUnidades(3);
console.log("Después de vender 3:", teclado.describir());

try {
  teclado.venderUnidades(5);
} catch (error) {
  console.log("Error:", (error as Error).message);
}
console.log("El stock no cambió:", teclado.describir());

console.log("Precio con 15% de descuento:", teclado.aplicarDescuento(15));
console.log("Precio original intacto:", teclado.precio);

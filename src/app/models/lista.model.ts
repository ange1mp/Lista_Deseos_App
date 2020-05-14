import { ListaItems } from "./lista-item.model";

export class Lista {
  id: number;
  titulo: string;
  creadaEn: Date;
  terminadaEn: Date;
  completada: boolean;
  items: ListaItems[];

  constructor(titulo: string) {
    this.id = new Date().getTime();
    this.titulo = titulo;
    this.creadaEn = new Date();
    this.completada = false;
    this.items = [];
  }
}

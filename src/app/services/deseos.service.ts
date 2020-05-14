// tslint:disable: quotemark
import { Injectable } from "@angular/core";
import { Lista } from "../models/lista.model";

@Injectable({
  providedIn: "root",
})
export class DeseosService {
  listas: Lista[] = [];
  constructor() {
    this.cargaLocal();
  }

  agregarLista(titulo: string) {
    const listaNueva = new Lista(titulo);
    this.listas.push(listaNueva);
    this.guardaLocal();
    return listaNueva.id;
  }

  borrarLista(lista: Lista) {
    this.listas = this.listas.filter((listaA) => {
      return listaA.id !== lista.id;
    });
    this.guardaLocal();
  }

  obtenerLista(id: string | number) {
    id = Number(id);
    return this.listas.find((listaData) => listaData.id === id);
  }

  guardaLocal() {
    localStorage.setItem("lista", JSON.stringify(this.listas));
  }

  cargaLocal() {
    if (localStorage.getItem("lista")) {
      this.listas = JSON.parse(localStorage.getItem("lista"));
    } else {
      console.log("lista no existe");
    }
  }
}

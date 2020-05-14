// tslint:disable: quotemark
import { Component, OnInit } from "@angular/core";
import { DeseosService } from "../../services/deseos.service";
import { ActivatedRoute } from "@angular/router";
import { Lista } from "../../models/lista.model";
import { ListaItems } from "../../models/lista-item.model";

@Component({
  selector: "app-agregar",
  templateUrl: "./agregar.page.html",
  styleUrls: ["./agregar.page.scss"],
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem: string;
  constructor(
    private deseoService: DeseosService,
    private router: ActivatedRoute
  ) {
    const idLista = this.router.snapshot.paramMap.get("listaId");
    this.lista = this.deseoService.obtenerLista(idLista);
    console.log(this.lista);
  }

  ngOnInit() {}

  agregarItems() {
    if (this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListaItems(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem = "";
    this.deseoService.guardaLocal();
  }

  cambioCheck(item: ListaItems) {
    const pendientes = this.lista.items.filter(
      (resultado) => !resultado.completado
    ).length;
    console.log({ pendientes });
    if (pendientes === 0) {
      this.lista.completada = true;
      this.lista.terminadaEn = new Date();
    } else {
      this.lista.completada = false;
      this.lista.terminadaEn = null;
    }
    console.log(this.deseoService.listas);
    this.deseoService.guardaLocal();
  }

  borrarItem(index: number) {
    this.lista.items.splice(index, 1);
    this.deseoService.guardaLocal();
  }
}

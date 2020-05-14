import { Component, OnInit, Output, Input, ViewChild } from "@angular/core";
import { Lista } from "src/app/models/lista.model";
import { Router } from "@angular/router";
import { DeseosService } from "../../services/deseos.service";
import { AlertController, IonList } from "@ionic/angular";

@Component({
  selector: "app-listas",
  templateUrl: "./listas.component.html",
  styleUrls: ["./listas.component.scss"],
})
export class ListasComponent implements OnInit {
  constructor(
    public deseosService: DeseosService,
    private router: Router,
    private alertController: AlertController
  ) {}
  @Input() terminado: boolean;
  ngOnInit() {}
  listaSeleccionada(lista: Lista) {
    if (this.terminado) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  eliminaLista(lista: Lista) {
    this.deseosService.borrarLista(lista);
  }

  async presentAlert(lista: Lista) {
    const alert = await this.alertController.create({
      header: "Alert",
      inputs: [
        {
          name: "Nombre",
          type: "text",
          value: `${lista.titulo}`,
          placeholder: "Nuevo nombre",
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Boton Cancelar");
          },
        },
        {
          text: "Actualizar",
          handler: (data) => {
            console.log(data.Nombre);
            if (data.Nombre.length === 0) {
              return console.log("Tarea no valida");
            }
            lista.titulo = data.Nombre;
            this.deseosService.guardaLocal();
          },
        },
      ],
    });

    await alert.present();
  }
}

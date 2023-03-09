import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  constructor(public dataService : DataService) { }

  listaUnis : any[] = [];
  uniSeleccionada : any;
  id!: number;

  ngOnInit(): void {
    // this.dataService.getUniversidades().subscribe( (data) => {
    //   this.listaUnis = data;
    //   console.log("uni: ", data.data);
    // });
    this.dataService.getUniversidades().subscribe(data => {
      this.listaUnis = data.data.map((u: { id: any, attributes: { nombre: any; abreviatura: any; }; }) => ({
        id : u.id,
        nombre: u.attributes.nombre,
        abreviatura: u.attributes.abreviatura
      }));
    });
  }

  getDatos(id: number) {
    this.dataService.getDatosUni(id).subscribe(data => {
      this.uniSeleccionada = data.data.map((u: { id: any, attributes : { nombre: any; abreviatura: any; ciudad: any; }; }) => ({
        id: u.id,
        nombre: u.attributes.nombre,
        abreviatura: u.attributes.abreviatura,
        ciudad: u.attributes.ciudad
      }));
      this.id = this.uniSeleccionada.id;
    });
  }

}

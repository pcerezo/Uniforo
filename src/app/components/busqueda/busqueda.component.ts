import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  constructor(public dataService : DataService) { }

  listaUnis : any [] = [];

  ngOnInit(): void {
    this.dataService.getUnis().subscribe( (data) => {
      this.listaUnis = data;
      console.log("uni: ", data.data);
    });
  }

}

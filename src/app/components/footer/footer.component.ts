import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info/info.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  anio : number = new Date().getFullYear();
  mes : number = new Date().getMonth();
  
  constructor( public is : InfoService) { }

  ngOnInit(): void {
  }

}

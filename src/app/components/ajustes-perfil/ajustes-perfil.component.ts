import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-ajustes-perfil',
  templateUrl: './ajustes-perfil.component.html',
  styleUrls: ['./ajustes-perfil.component.css']
})
export class AjustesPerfilComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}

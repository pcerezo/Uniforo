import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor( public authService : AuthService) { }

  comprobarDatosSignUp(userEmail:String, pass1: String, pass2: String) {
    var submit = document.getElementById("submitInput");
    var correctIcon = document.getElementById("correctIcon");
    var wrongIcon = document.getElementById("wrongIcon");

    if (submit != null) {
      if (userEmail.length == 0) {
        submit.setAttribute("disabled", "true");
      }
      else {
        // Se puede hacer submit
        if (pass1 === pass2){
          submit.removeAttribute("disabled");
          if (correctIcon != null && wrongIcon != null) {
            correctIcon.style.display = "inline";
            wrongIcon.style.display = "none";
          }
        }
        // No se puede
        else {
          submit.setAttribute("disabled", "true");
          if (correctIcon != null && wrongIcon != null) {
            wrongIcon.style.display = "inline";
            correctIcon.style.display = "none";
          }
        }
      }
    }
  }

  ngOnInit(): void {
  }

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AjustesPerfilComponent } from './components/ajustes-perfil/ajustes-perfil.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HeaderComponent } from './components/header/header.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthService } from './services/auth/auth.service';
import { InfoService } from './services/info/info.service';
import { HttpClientModule } from '@angular/common/http';
import { BusquedaComponent } from './components/busqueda/busqueda.component';

@NgModule({
  declarations: [
    AppComponent,
    AjustesPerfilComponent,
    ContactoComponent,
    ContenidoComponent,
    FooterComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    InicioComponent,
    PerfilComponent,
    SidebarComponent,
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent,
    BusquedaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    InfoService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

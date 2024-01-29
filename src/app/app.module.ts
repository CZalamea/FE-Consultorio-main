import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { MaterialModule } from './shared/material.module';
import { NavbarComponent } from './setting/dashboard/navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { SettingMedicosComponent } from './setting/components/medico/setting-medicos/setting-medicos.component';
import { AddEditMedicoComponent } from './setting/components/medico/add-edit-medico/add-edit-medico.component';
import { DeleteMedicoComponent } from './setting/components/medico/delete-medico/delete-medico.component';
import { SettingPacienteComponent } from './setting/components/paciente/setting-paciente/setting-paciente.component';
import { AddEditPacienteComponent } from './setting/components/paciente/add-edit-paciente/add-edit-paciente.component';
import { DeletePacienteComponent } from './setting/components/paciente/delete-paciente/delete-paciente.component';
import { AddConsultaComponent } from './setting/components/consulta/add-consulta/add-consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NotFoundPageComponent,
    NavbarComponent,
    SettingMedicosComponent,
    AddEditMedicoComponent,
    DeleteMedicoComponent,
    SettingPacienteComponent,
    AddEditPacienteComponent,
    DeletePacienteComponent,
    AddConsultaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

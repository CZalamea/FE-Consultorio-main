import { AddConsultaComponent } from './setting/components/consulta/add-consulta/add-consulta.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import { NavbarComponent } from './setting/dashboard/navbar/navbar.component';
import { SettingMedicosComponent } from './setting/components/medico/setting-medicos/setting-medicos.component';
import { SettingPacienteComponent } from './setting/components/paciente/setting-paciente/setting-paciente.component';

const routes: Routes = [
  { path: '',               redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',          component: LoginPageComponent },
  { path: 'setting',        component: NavbarComponent,
    children: [
      { path: 'medicos',    component: SettingMedicosComponent },
      { path: 'pacientes',  component: SettingPacienteComponent },      
      { path: 'consulta',   component: AddConsultaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

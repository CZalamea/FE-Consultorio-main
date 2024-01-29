import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EEspecialidad } from 'src/app/interfaces/eespecialidad';
import { IMedico } from 'src/app/interfaces/imedico';
import { MedicoService } from 'src/app/services/medico.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-edit-medico',
  templateUrl: './add-edit-medico.component.html',
  styleUrls: ['./add-edit-medico.component.css']
})
export class AddEditMedicoComponent implements OnInit{
  form: FormGroup;
  title: string = "Agregar Médico";
  iconName: string = "arrow_forward_ios";
  especialidades = Object.values(EEspecialidad);

  constructor(
    private dialogRef: MatDialogRef<AddEditMedicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMedico,
    private fb: FormBuilder,
    private _toast: ToastService,
    private _medicoServices: MedicoService
  ) {
    this.form = this.fb.group({
      nombre:         ['', Validators.required],
      email:          ['', Validators.required],
      telefono:       ['', Validators.required],
      especialidad:   ['', Validators.required],
      calle:          ['', Validators.required],
      distrito:       ['', Validators.required],
      ciudad:         ['', Validators.required],
      numero:         ['', Validators.required],
      complemento:    ['', Validators.required],    
    })
  }

  ngOnInit(){
    if(this.data){
      this.title              = "Editar Médico";
      this.iconName           = "edit";    
      this.loadMedicoData()
    }
  }

  private loadMedicoData() {
    this.form.patchValue({
      nombre:         this.data.nombre,
      email:          this.data.email,
      telefono:       this.data.telefono,
      especialidad:   this.data.especialidad,
      calle:          this.data.datosDireccion?.calle,
      distrito:       this.data.datosDireccion?.distrito,
      numero:         this.data.datosDireccion?.numero,
      complemento:    this.data.datosDireccion?.complemento,
    })
  }

  submit(){
    if(this.form.invalid){
      this._toast.error("Todos los campos son requeridos")
      return
    }

    const medico: IMedico = {  
      nombre:         this.form.value.nombre,
      email:          this.form.value.email,
      telefono:       this.form.value.telefono,
      especialidad:   this.form.value.especialidad,
      datosDireccion: { 
        calle:        this.form.value.calle,
        distrito:     this.form.value.distrito,
        numero:       this.form.value.numero,
        complemento:  this.form.value.complemento
      }
    }

    if(this.data){
      medico.id = this.data.id
    }

    const request = this.data ? this._medicoServices.put(medico) : this._medicoServices.post(medico);

    request.subscribe({
      next: () => this.dialogRef.close('success'),
      error: () => this.dialogRef.close('error'),
    });
  }

}
 
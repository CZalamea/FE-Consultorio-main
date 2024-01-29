import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPaciente } from 'src/app/interfaces/ipaciente';
import { PacienteService } from 'src/app/services/paciente.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-edit-paciente',
  templateUrl: './add-edit-paciente.component.html',
  styleUrls: ['./add-edit-paciente.component.css']
})
export class AddEditPacienteComponent {
  form: FormGroup;
  title: string = "Agregar Paciente";
  labelButton: string = "Agregar";
  iconName: string = "arrow_forward_ios";
  editar:boolean=false;
  

  constructor(
    private dialogRef: MatDialogRef<AddEditPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPaciente,
    private fb: FormBuilder,
    private _toast: ToastService,
    private _pacienteServices: PacienteService
  ) {
    console.log(data);

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

    

    if (data.id == 0 || data.id == null) {
      this.title = "Agregar Paciente";
      this.editar=false;
      this.labelButton = "Agregar";
    }else{
      this.title = "Editar Paciente";
      this.editar=true;
      this.labelButton = "Editar";

    }


  }


  editarCrearPaciente(){
   
    if(this.editar){
      this._pacienteServices.put(this.data).subscribe({
        next: (resp) =>{
          console.log(resp);
          this._toast.success("Paciente editado correctamente");
          this.dialogRef.close(true);
        },
        error: (error) =>{
          console.log(error);
          this._toast.error("Error al editar paciente");
        }
      });
      
    }else{

      this._pacienteServices.post(this.form.value).subscribe(resp=>{
        this._toast.success("Paciente agregado correctamente");
        this.dialogRef.close(true);
      },error=>{
        this._toast.error("Error al agregar paciente");
      });
    }
  }


}

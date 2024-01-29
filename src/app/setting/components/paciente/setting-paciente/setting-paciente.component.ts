import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IPaciente } from 'src/app/interfaces/ipaciente';
import { PacienteService } from 'src/app/services/paciente.service';
import { ToastService } from 'src/app/services/toast.service';
import { AddEditPacienteComponent } from '../add-edit-paciente/add-edit-paciente.component';
import { IDireccion } from 'src/app/interfaces/idireccion';

@Component({
  selector: 'app-setting-paciente',
  templateUrl: './setting-paciente.component.html',
  styleUrls: ['./setting-paciente.component.css']
})
export class SettingPacienteComponent implements OnInit{

  displayedColumns: string[] = ['nombre', 'email', 'telefono', 'documento', 'acciones'];
  dataSource = new MatTableDataSource<IPaciente>(); //IPaciente
  loading: boolean = false;
  arreglo:any[]=[];
  apaciente:IPaciente[]=[];
  paciente: IPaciente = {
   id: 0,
   nombre: '',
   email: '',
   telefono: '',
   documento: '',
   datosDireccion: {
      calle: '',
      numero:'',
      complemento: '' ,
      distrito: '',
      ciudad: ''
  }
   
 }
  
  
   

  constructor(
    private _pacienteService: PacienteService,   
    private _toast: ToastService,
    private dialog: MatDialog,
    private router: Router,
  
  ) { }

  ngOnInit(){
    this.getPacientes();
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0){
      this.paginator._intl.itemsPerPageLabel = "Items por Página ";
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPacientes() {
    this.loading = true;
    this._pacienteService.get().subscribe({
      next: (data) => {    
        let indice=0;
         this.arreglo = (data as any).content;
         this.arreglo.forEach( item =>{
          indice++;
          this.paciente.id = indice;
          this.paciente.nombre = item.nombre;;
          this.paciente.email = item.email;
          this.paciente.documento = item.documento;
          this.apaciente.push(this.paciente);
          this.paciente = {
            id: 0,
            nombre: '',
            email: '',
            telefono: '',
            documento: '',
            datosDireccion: {} as IDireccion
          } 
        });
        this.dataSource.data = this.apaciente;
      
        this.apaciente = [];
        indice=0;
        this.loading = false;
      },
      error: () => {
      
        this.loading = false;
        this._toast.error("Ha ocurrido un error")
      }
    })
  }  

  openAdd() {
    this.paciente = {
      id: 0,
      nombre: '',
      email: '',
      telefono: '',
      documento: '',
      datosDireccion: {} as IDireccion
    } 
    this.openMedicoDialog(this.paciente);
  }

  openEdit(medico: IPaciente) {
    this.openMedicoDialog(medico);
  }

  openDelete(id: number) {
    // Lógica para eliminar médico next: (data) => {  
    this._pacienteService.delete(id).subscribe({
      next: (data) => {  
        this._toast.success("¡Enhorabuena! Eliminación exitosa")
        this.getPacientes();
      },
      error: () => {
        this._toast.error("¡Ups! Ha ocurrido un error")
      }
    });
  }

  private openMedicoDialog(data?: IPaciente) {
    
    this.dialog.open(AddEditPacienteComponent, {
      autoFocus: false,
      disableClose: true,
      width:'50%',
      data: data

    }).afterClosed().subscribe((respuesta) => {
      if(respuesta == "success"){
        this.getPacientes()
        this._toast.success("¡Enhorabuena! Ingreso exitoso")
      }
      if(respuesta == "error"){        
        this._toast.error("¡Ups! Ha ocurrido un error")
      }
    });
  }


}

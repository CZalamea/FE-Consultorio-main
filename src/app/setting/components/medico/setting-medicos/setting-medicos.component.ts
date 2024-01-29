import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IMedico } from 'src/app/interfaces/imedico';
import { MedicoService } from 'src/app/services/medico.service';
import { ToastService } from 'src/app/services/toast.service';
import { AddEditMedicoComponent } from '../add-edit-medico/add-edit-medico.component';

@Component({
  selector: 'app-setting-medicos',
  templateUrl: './setting-medicos.component.html',
  styleUrls: ['./setting-medicos.component.css']
})
export class SettingMedicosComponent implements OnInit{

  displayedColumns: string[] = ['nombre', 'email', 'telefono', 'especialidad', 'acciones'];
  dataSource = new MatTableDataSource<IMedico>();
  loading: boolean = false;

  constructor(
    private _medicoService: MedicoService,   
    private _toast: ToastService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(){
    this.getMedicos();
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

  getMedicos() {
    this.loading = true;
    this._medicoService.get().subscribe({
      next: (data) => {   
        console.log(data);     
        this.dataSource.data = data
        this.loading = false;
      },
      error: () => {
        //this.router.navigate(['login'])
        this.loading = false;
        this._toast.error("Ha ocurrido un error")
      }
    })
  }  

  openAdd() {
    this.openMedicoDialog();
  }

  openEdit(medico: IMedico) {
    this.openMedicoDialog(medico);
  }

  openDelete(id: number) {
    // Lógica para eliminar médico
  }

  private openMedicoDialog(data?: IMedico) {
    this.dialog.open(AddEditMedicoComponent, {
      autoFocus: false,
      disableClose: true,
      width:'50%',
      data: data
    }).afterClosed().subscribe((respuesta) => {
      if(respuesta == "success"){
        this.getMedicos()
        this._toast.success("¡Enhorabuena! Ingreso exitoso")
      }
      if(respuesta == "error"){        
        this._toast.error("¡Ups! Ha ocurrido un error")
      }
    });
  }

}

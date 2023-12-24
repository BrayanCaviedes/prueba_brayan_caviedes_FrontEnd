import {FormBuilder, FormGroup, Validators} from '@angular/forms'

import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { Pacientes } from './Interface/pacientes';
import { PacientesService } from './Services/pacientes.service';

import { MatSnackBar } from '@angular/material/snack-bar';


import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle,} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

import { DialogoAddEditComponent } from './Dialog/dialog-add-edit/dialog-add-edit.component';
import { DialogoDeleteComponent } from './Dialog/dialog-delete/dialog-delete.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements  AfterViewInit, OnInit{
  listaPacientes:string[]=['numeroDocumento','tipoDocumento','nombre',
                           'correoElectronico','telefono','fechaNacimiento',
                           'estadoAfiliacion', 'Acciones'];                      // Columnas mostradas
  dataSource = new MatTableDataSource<Pacientes>();                             // Origen de datos
  formularioPacientes:FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  constructor(
    private _pacientesServicio:PacientesService,
    private fb:FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    
    
  ){
    this.formularioPacientes = this.fb.group({
      numeroDocumento:['',Validators.required],
      tipoDocumento:['',Validators.required],
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      correoElectronico:['',Validators.required],
      telefono:['',Validators.required],
      fechaNacimiento:['',Validators.required],
      estadoAfiliacion:['',Validators.required]
    });
  }

// <!----------------------------Metodo GET de obtener pacientes de la API ---------------------------------------->

  obtenerPacientes(){
    this._pacientesServicio.getList().subscribe({
      next:(data) =>{
        console.log(data)
        this.dataSource.data = data;
    },error:(e) => {}
    });
  }

  ngOnInit(): void {
    this.obtenerPacientes();
  }
// <!----------------------------------------------------------------------------------------------------------------->
// <!---------------------------------------- Dialog  ---------------------------------------------------------------->
  dialogoNuevoPaciente() {
    this.dialog.open(DialogoAddEditComponent,{
      disableClose:true,
      width:'350px'
    }).afterClosed().subscribe(resultado => {
      if(resultado === "Creado"){
        this.obtenerPacientes();
      }
    })
  }
// <!----------------------------------------------------------------------------------------------------------------->
// <!---------------------------------------- Actualizar o editar un paciente  --------------------------------------->

  dialogoEditarPaciente(dataPacientes:Pacientes) {
    this.dialog.open(DialogoAddEditComponent,{
      disableClose:true,
      width:'350px',
      data: dataPacientes
    }).afterClosed().subscribe(resultado => {
      if(resultado === "Editado"){
        this.obtenerPacientes();
      }
    })
  }
// <!----------------------------------------------------------------------------------------------------------------->
// <!-------------------------------------------- Mostrar Alertas  --------------------------------------------------->
      mostrarAlerta(msg: string, accion: string) {
        this._snackBar.open(msg, accion,{
          horizontalPosition: "end",
          verticalPosition: "top",
          duration:3000
        });
      }
// <!----------------------------------------------------------------------------------------------------------------->
// <!-------------------------------------------- Eliminar pacientes  ------------------------------------------------>
      dialogoEliminarPacientes(dataPacientes:Pacientes){
      this.dialog.open(DialogoDeleteComponent,{
        disableClose:true,
        data: dataPacientes
      }).afterClosed().subscribe(resultado => {
        if(resultado === "Eliminar"){
          this._pacientesServicio.delete(dataPacientes.id).subscribe({
            next:(data) => {
              this.mostrarAlerta("Paciente fue eliminado", "Listo");
              this.obtenerPacientes();
            },error:(e) => {}
          })

        }
      })
      }
// <!----------------------------------------------------------------------------------------------------------------->



}

import { Component, OnInit, Inject} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


// Para poder trabajar con las alertas
import { MatSnackBar } from '@angular/material/snack-bar';

// Para darle formato a las fechas
import { MAT_DATE_FORMATS } from '@angular/material/core';
import *as moment from 'moment';

// Importar nuestra Interface y services
import { Pacientes } from 'src/app/Interface/pacientes';
import { PacientesService } from 'src/app/Services/pacientes.service'; 


// Configurar el formato de las fechas
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display:{
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-dialogo-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css'],
  providers: [
    {provide:MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class DialogoAddEditComponent implements OnInit {

  formPacientes: FormGroup;
  tituloAccion: string = "Nuevo";
  botonAccion: string = "Guardar";


  constructor(
    private dialogoReferencia: MatDialogRef <DialogoAddEditComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _pacientesServicio: PacientesService,
    @Inject (MAT_DIALOG_DATA) public dataPacientes: Pacientes
  ) { 

    this.formPacientes = this.fb.group({
      numeroDocumento: ['',Validators.required],
      tipoDocumento: ['',Validators.required],
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      correoElectronico: ['',Validators.required],
      telefono: ['',Validators.required],
      fechaNacimiento: ['',Validators.required],
      estadoAfiliacion: ['',Validators.required]
    })

  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition: "end",
      verticalPosition: "top",
      duration:3000
    });
  }

  // Agregar el nuevo pacientes 
  addEditPacientes(){
    console.log(this.formPacientes)
    console.log(this.formPacientes.value)

    const modelo: Pacientes={
      id: 0,
      numeroDocumento: this.formPacientes.value.numeroDocumento,
      tipoDocumento: this.formPacientes.value.tipoDocumento,
      nombre: this.formPacientes.value.nombre,
      apellido: this.formPacientes.value.apellido,
      correoElectronico: this.formPacientes.value.correoElectronico,
      telefono: this.formPacientes.value.telefono,
      //fechaNacimiento: moment(this.formPacientes.value.fechaNacimiento).format("DD/MM/YYYY"),
      fechaNacimiento: this.formPacientes.value.fechaNacimiento,
      estadoAfiliacion: this.formPacientes.value.estadoAfiliacion
    };

    // Establecer el id si dataPacientes no es nulo
    if (this.dataPacientes != null) {
        modelo.id = this.dataPacientes.id;
    }
    
    // Vamos a ejecutar la API - Para agregar el nuevo pacientes (si es null va crear un nuevo paciente si no lo va a editar o actualizar)
    if(this.dataPacientes == null){
      this._pacientesServicio.add(modelo).subscribe({
        next:(data) => {
          this.mostrarAlerta("Paciente fue creado", "Listo");
          this.dialogoReferencia.close("Creado");
        },error:(e) => {
          this.mostrarAlerta("No se pudo crear", "Error");
        }
  
      });

    }else {
      this._pacientesServicio.update(this.dataPacientes.id, modelo).subscribe({
        next:(data) => {
          this.mostrarAlerta("Paciente fue editado", "Listo");
          this.dialogoReferencia.close("Editado");
        },error:(e) => {
          this.mostrarAlerta("No se pudo editar", "Error");

        }
  
      })
    }


  }

  // Se pasan los valores obtenidos para poder editar o actualizar
  ngOnInit(): void {
    if(this.dataPacientes){
      this.formPacientes.patchValue({
        numeroDocumento: this.dataPacientes.numeroDocumento,
        tipoDocumento: this.dataPacientes.tipoDocumento,
        nombre: this.dataPacientes.nombre,
        apellido: this.dataPacientes.apellido,
        correoElectronico: this.dataPacientes.correoElectronico,
        telefono: this.dataPacientes.telefono,
        fechaNacimiento: moment(this.dataPacientes.fechaNacimiento,"DD-MM-YYYY"),
        estadoAfiliacion: this.dataPacientes.estadoAfiliacion
      })
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
  }

}

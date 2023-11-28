import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

import { Pacientes } from './Interface/pacientes';
import { PacientesService } from './Services/pacientes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  listaPacientes:Pacientes[]=[];
  formularioPacientes:FormGroup;

  constructor(
    private _pacientesServicio:PacientesService,
    private fb:FormBuilder
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


  obtenerPacientes(){
    this._pacientesServicio.getList().subscribe({
      next:(data) =>{
        console.log(data)
        this.listaPacientes = data;
    },error:(e) => {}
    });
  }

  ngOnInit(): void {
    this.obtenerPacientes();
  }

  agregarPacientes(){
    const request:Pacientes = {
      numeroDocumento:0,
      tipoDocumento: this.formularioPacientes.value.tipoDocumento,
      nombre: this.formularioPacientes.value.nombre,
      apellido: this.formularioPacientes.value.apellido,
      correoElectronico: this.formularioPacientes.value.correoElectronico,
      telefono: this.formularioPacientes.value.telefono,
      fechaNacimiento: this.formularioPacientes.value.fechaNacimiento,
      estadoAfiliacion: this.formularioPacientes.value.estadoAfiliacion
    }

    this._pacientesServicio.add(request).subscribe({
      next:(data) =>{
        console.log(data)
        this.listaPacientes.push(data);
        this.formularioPacientes.patchValue({
          numeroDocumento:"",
          tipoDocumento:"",
          nombre:"",
          apellido:"",
          correoElectronico:"",
          telefono:"",
          fechaNacimiento:"",
          estadoAfiliacion:""
        });
    },error:(e) => {}
    });

  }

  eliminarPacientes(pacientes:Pacientes){
    this._pacientesServicio.delete(pacientes.numeroDocumento).subscribe({
      next:(data) =>{
       const nuevaLista = this.listaPacientes.filter(item => item.numeroDocumento != pacientes.numeroDocumento)
       this.listaPacientes = nuevaLista;
    },error:(e) => {}
    });
  }



}

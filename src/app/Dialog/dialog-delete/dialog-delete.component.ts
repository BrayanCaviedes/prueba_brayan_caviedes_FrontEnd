import { Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Pacientes } from 'src/app/Interface/pacientes';


@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogoDeleteComponent implements OnInit {

  constructor(
    private dialogoReferencia: MatDialogRef <DialogoDeleteComponent>,
    @Inject (MAT_DIALOG_DATA) public dataPacientes: Pacientes
  ) { }

  ngOnInit(): void {
  }

  confirmar_Eliminar(){
    if(this.dataPacientes){
      this.dialogoReferencia.close('Eliminar');
    }
  }

}

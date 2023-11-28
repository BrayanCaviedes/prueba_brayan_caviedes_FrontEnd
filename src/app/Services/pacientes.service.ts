import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Pacientes } from '../Interface/pacientes';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private endPoint:string = environment.endPoint;
  private apiUrl:string = this.endPoint + "Pacientes/";

  constructor(private http:HttpClient) { }

  getList():Observable<Pacientes[]>{
    return this.http.get<Pacientes[]>(`${this.apiUrl}Lista`);
}

  add(request:Pacientes):Observable<Pacientes>{
    return this.http.post<Pacientes>(`${this.apiUrl}Agregar`, request);
}


delete(numeroDocumento:number):Observable<void>{
  return this.http.delete<void>(`${this.apiUrl}eliminar/${numeroDocumento}`);
}

}

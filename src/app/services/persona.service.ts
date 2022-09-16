import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  actualizarPersonas: any;
  actualizarPersona(formData: FormData) {
    throw new Error('Method not implemented.');
  }
  readonly BaseUrl = "https://localhost:44323/api/persona";
  constructor(private http: HttpClient) { }


  getPersonas() {
    //https://localhost:44324/api/persona -- nombre del controlador que quiero solicitar
        return this.http.get(this.BaseUrl);

      }

        getPersonaById(id:any) {
        //https://localhost:44324/api/persona -- nombre del controlador que quiero solicitar
            return this.http.get(this.BaseUrl+'/'+id);

          }
            //metodo para insertar club en la BD
  insertarPersona(formGroup:any) {
    return this.http.post(this.BaseUrl, formGroup);
  }

  ActualizarPersona(formGroup:any) {
    return this.http.put(this.BaseUrl, formGroup);
  }

  // EliminarPersona(formGroup:any) {
  //   return this.http.put(this.BaseUrl, formGroup);
  // }

}

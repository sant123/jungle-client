import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  readonly BaseUrl = "https://localhost:44323/api/usuario";
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
  validarIdentidad(formGroup:any) {
    return this.http.post(this.BaseUrl, formGroup);
  }

  ActualizarPersona(formGroup:any) {
    return this.http.put(this.BaseUrl, formGroup);
  }

  // EliminarPersona(formGroup:any) {
  //   return this.http.put(this.BaseUrl, formGroup);
  // }

}

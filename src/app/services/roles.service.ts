import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  readonly BaseUrl = "https://localhost:44323/api/Roles";
  actualizarRoles: any;
  constructor(private http: HttpClient) { }


  getRoles() {
    //https://localhost:44324/api/persona -- nombre del controlador que quiero solicitar
        return this.http.get(this.BaseUrl);

      }
      GetByIdRolex(id:any) {
        //https://localhost:44324/api/persona -- nombre del controlador que quiero solicitar
            return this.http.get(this.BaseUrl+'/'+id);

          }

      //metodo para insertar club en la BD
  // insertarServicios(formGroup:any) {
  //   return this.http.post(this.BaseUrl, formGroup); 
  // }

  // ActualizarServicios(formGroup:any) {
  //   return this.http.put(this.BaseUrl, formGroup);
  // }

}

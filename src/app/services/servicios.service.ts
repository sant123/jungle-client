import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  readonly BaseUrl = "https://localhost:44323/api/Servicios";
  actualizarServicios: any;
  constructor(private http: HttpClient) { }


  getServicios() {
    //https://localhost:44324/api/persona -- nombre del controlador que quiero solicitar
        return this.http.get(this.BaseUrl);

      }
      getServiciosById(id:any) {
        //https://localhost:44324/api/persona -- nombre del controlador que quiero solicitar
            return this.http.get(this.BaseUrl+'/'+id);

          }

      //metodo para insertar club en la BD
  insertarServicios(formGroup:any) {
    return this.http.post(this.BaseUrl, formGroup);
  }

  ActualizarServicios(formGroup:any) {
    return this.http.put(this.BaseUrl, formGroup);
  }

}

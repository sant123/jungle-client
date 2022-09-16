import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  readonly BaseUrl = "https://localhost:44323/api/inventario";
  constructor(private http: HttpClient) { }


  getInventario() {
    //https://localhost:44324/api/persona -- nombre del controlador que quiero solicitar
        return this.http.get(this.BaseUrl);

      }

      getInventarioById(id:any) {
        //https://localhost:44324/api/persona -- nombre del controlador que quiero solicitar
            return this.http.get(this.BaseUrl+'/'+id);

          }
            //metodo para insertar club en la BD
  insertarInventario(formGroup:any) {
    return this.http.post(this.BaseUrl, formGroup);
  }


  actualizarInventario(formGroup:any) {
    return this.http.put(this.BaseUrl, formGroup);
  }
  // EliminarInventario(formGroup:any) {
  //   return this.http.put(this.BaseUrl, formGroup);
  // }

}

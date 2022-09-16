import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MovimientoInventarioService {

  readonly BaseUrl = "https://localhost:44323/api/movimientoinventario";
  constructor(private http: HttpClient) { }


    getMovimientoInventario(idInventario:any) {
    //https://localhost:44324/api/persona -- nombre del controlador que quiero solicitar
        return this.http.get(this.BaseUrl+'/'+idInventario);

      }
            //metodo para insertar club en la BD
  insertarMovimientoInventario(formGroup:any) {
    return this.http.post(this.BaseUrl, formGroup);
  }

  // EliminarInventario(formGroup:any) {
  //   return this.http.put(this.BaseUrl, formGroup);
  // }

}

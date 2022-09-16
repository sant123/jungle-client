import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TipoMovimientoInventarioService {
  readonly BaseUrl = "https://localhost:44323/api/tipomovimientoinventario";
  getTipoMovimientoInventarioService: any;
  constructor(private http: HttpClient) { }


  getTipoMovimientoInventario() {
    //https://localhost:44324/api/persona -- nombre del controlador que quiero solicitar
        return this.http.get(this.BaseUrl);

      }
            //metodo para insertar club en la BD
  insertarTipoMovimientoInventario(formGroup:any) {
    return this.http.post(this.BaseUrl, formGroup);
  }

  // EliminarInventario(formGroup:any) {
  //   return this.http.put(this.BaseUrl, formGroup);
  // }

}

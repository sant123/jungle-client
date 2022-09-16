import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DetalleCitaService {
  readonly BaseUrl = "https://localhost:44323/api/detallecita";
  constructor(private http: HttpClient) { }


  getDetalleCita() {
    //https://localhost:44324/api/persona -- nombre del controlador que quiero solicitar
        return this.http.get(this.BaseUrl);

      }

      insertarDetalleCita(formGroup:any) {
        return this.http.post(this.BaseUrl, formGroup);
      }



}

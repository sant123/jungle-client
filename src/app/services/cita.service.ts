import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  readonly BaseUrl = 'https://localhost:44323/api/cita';
  constructor(private http: HttpClient) {}

  getCita() {
    //https://localhost:44324/api/persona -- nombre del controlador que quiero solicitar
    return this.http.get(this.BaseUrl);
  }

  insertarCita(formGroup: any) {
    return this.http.post(this.BaseUrl, formGroup);
  }

  getCitaById(id: any) {
    //https://localhost:44324/api/persona -- nombre del controlador que quiero solicitar
    return this.http.get(this.BaseUrl + '/' + id);
  }

  ActualizarCita(formGroup: any) {
    return this.http.put(this.BaseUrl, formGroup);
  }

  getBarberos() {
    return this.http.get(this.BaseUrl + '/Barberos');
  }

  getClientes() {
    return this.http.get(this.BaseUrl + '/Clientes');
  }

  EliminarCita(formGroup: any) {
    return this.http.delete(this.BaseUrl, formGroup);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { IPaciente } from '../interfaces/ipaciente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private myAppUrl:string   = 'http://localhost:8081'; //environment.endpoint;
  private myApiUrl:string   = '/pacientes';

  constructor(
    private http: HttpClient,
    private _authService: AuthenticationService
    ) { }

    post(paciente: IPaciente): Observable<IPaciente>{
      return this.http.post<IPaciente>(`${this.myAppUrl}${this.myApiUrl}`, paciente, { headers: this._authService.getAuthHeaders() });
    }

    put(paciente: IPaciente): Observable<IPaciente>{
      return this.http.put<IPaciente>(`${this.myAppUrl}${this.myApiUrl}`,paciente,  { headers: this._authService.getAuthHeaders() });
    } 

    delete(id: Number): Observable<any>{
      return this.http.delete<any>(`${this.myAppUrl}${this.myApiUrl}/${id}`, { headers: this._authService.getAuthHeaders() });
    }

    get(): Observable<IPaciente[]>{
      return this.http.get<IPaciente[]>(`${this.myAppUrl}${this.myApiUrl}`, { headers: this._authService.getAuthHeaders() });
    }

    getId(id: number): Observable<IPaciente>{
      return this.http.get<IPaciente>(`${this.myAppUrl}${this.myApiUrl}${id}`, { headers: this._authService.getAuthHeaders() });
    }

}

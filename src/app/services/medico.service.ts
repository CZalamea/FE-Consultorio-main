import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { IMedico } from '../interfaces/imedico';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private myAppUrl:string   = 'http://localhost:8081';    //environment.endpoint;
  private myApiUrl:string   = '/setting/medicos';

  constructor(
    private http: HttpClient,
    private _authService: AuthenticationService
    ) { }

    post(medico: IMedico): Observable<IMedico>{
      return this.http.post<IMedico>(`${this.myAppUrl}${this.myApiUrl}`, medico, { headers: this._authService.getAuthHeaders() });
    }

    put(medico: IMedico): Observable<IMedico>{
      return this.http.put<IMedico>(`${this.myAppUrl}${this.myApiUrl}`,medico,  { headers: this._authService.getAuthHeaders() });
    } 

    delete(id: Number): Observable<any>{
      return this.http.delete<any>(`${this.myAppUrl}${this.myApiUrl}${id}`, { headers: this._authService.getAuthHeaders() });
    }

    get(): Observable<IMedico[]>{
      return this.http.get<IMedico[]>(`${this.myAppUrl}${this.myApiUrl}`, { headers: this._authService.getAuthHeaders() });
    }

    getId(id: number): Observable<IMedico>{
      return this.http.get<IMedico>(`${this.myAppUrl}${this.myApiUrl}${id}`, { headers: this._authService.getAuthHeaders() });
    }
  
}

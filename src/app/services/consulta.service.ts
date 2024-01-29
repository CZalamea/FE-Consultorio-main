import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { IConsulta } from '../interfaces/iconsulta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private myAppUrl:string   = environment.endpoint;
  private myApiUrl:string   = 'api/consultas/';

  constructor(
    private http: HttpClient,
    private _authService: AuthenticationService
    ) { }

    post(consulta: IConsulta): Observable<IConsulta>{
      return this.http.post<IConsulta>(`${this.myAppUrl}${this.myApiUrl}`, consulta, { headers: this._authService.getAuthHeaders() });
    }

}

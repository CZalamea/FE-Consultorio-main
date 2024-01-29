import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _toast: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token_value');
    /*if (!token) {
      this._toast.error('Acceso denegado');
      this.router.navigate(['/login'])
      return
    }*/   
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigate([''])    
  }
 
}

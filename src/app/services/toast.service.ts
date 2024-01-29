import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  notyf = new Notyf();

  constructor() { }

  private showToast(message: string, background: string, icon: string) {
    this.notyf.dismissAll();
    this.notyf.open({
      message: message,
      duration: 5000,
      background: background,
      dismissible: true,
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: icon,
        color: '#fff'
      }
    });
  }

  error(mensaje: string) {    
    this.showToast(mensaje, '#ff5c5d', 'error');
  }

  warning(mensaje: string) {
    this.showToast(mensaje, '#efc314', 'warning');
  }

  success(mensaje: string) {
    this.showToast(mensaje, '#3D73DD', 'check_circle');
  }

}

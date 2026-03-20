import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUsuario } from '../interfaces/iusuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosServices {

  private url: string = 'https://peticiones.online/users';
  private httpClient = inject(HttpClient);

  getAll(){
    return lastValueFrom(this.httpClient.get<IUsuario>(this.url));
  }
  
}

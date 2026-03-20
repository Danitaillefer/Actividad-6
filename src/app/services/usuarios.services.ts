import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUsuario } from '../interfaces/iusuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosServices {

  private url: string = 'https://peticiones.online/api/users';
  private httpClient = inject(HttpClient);

  getAll(): Promise<any>{
    return lastValueFrom(this.httpClient.get<any>(this.url));
  }

  getById(id: string | undefined): Promise<IUsuario>{
    return lastValueFrom(this.httpClient.get<IUsuario>(`${this.url}/${id}`))
  }

  deleteById(id: string | undefined): Promise<IUsuario>{
    return lastValueFrom(this.httpClient.delete<IUsuario>(`${this.url}/${id}`))
  }
  
}

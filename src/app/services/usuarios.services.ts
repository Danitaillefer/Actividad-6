import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUsuario } from '../interfaces/iusuario.interface';

type IApiResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: IUsuario[];
};

@Injectable({
  providedIn: 'root',
})
export class UsuariosServices {

  private url: string = 'https://peticiones.online/api/users';
  private httpClient = inject(HttpClient);

  getAll(page: number=1): Promise<IApiResponse>{
    return lastValueFrom(this.httpClient.get<IApiResponse>(`${this.url}/?page=${page}`));
  }

  getById(id: string | undefined): Promise<IUsuario>{
    return lastValueFrom(this.httpClient.get<IUsuario>(`${this.url}/${id}`))
  }

  deleteById(id: string | undefined): Promise<IUsuario>{
    return lastValueFrom(this.httpClient.delete<IUsuario>(`${this.url}/${id}`))
  }

  insert(IUsuario: IUsuario): Promise<IUsuario>{
    return lastValueFrom(this.httpClient.post<IUsuario>(this.url, IUsuario))
  }

  update(id: string | undefined, IUsuario: IUsuario): Promise<IUsuario>{  
    return lastValueFrom(this.httpClient.put<IUsuario>(`${this.url}/${id}`, IUsuario))
  }
}

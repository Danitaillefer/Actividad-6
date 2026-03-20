import { Component, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { UsuariosServices } from '../../services/usuarios.services';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { toast } from 'ngx-sonner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuario',
  imports: [RouterLink],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
})
export class UsuarioComponent {

  id = input<string>();
  usuariosServices = inject(UsuariosServices);
  miUsuario = signal<IUsuario | null>(null);
  @Output() deleteEmit: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(){
    this.cargarUsuario();
  }

  async cargarUsuario(){
    try{
      let response = await this.usuariosServices.getById(this.id());
      this.miUsuario.set(response);
    }catch (err){
      toast.error('No se pudo cargar el usuario');
    }
  }

  async deleteUsuario(id: string | undefined){
    try{
      let response = await this.usuariosServices.deleteById(id);
      if(response._id){
        toast.error(`Se ha eliminado el usuario ${response.username}`)
        this.deleteEmit.emit(true)
      }
    }catch (err){
      toast.error('No se ha podido elimiar el usuario');
    }
  }
}

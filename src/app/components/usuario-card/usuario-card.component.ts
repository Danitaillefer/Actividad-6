import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { RouterLink } from "@angular/router";
import { UsuariosServices } from '../../services/usuarios.services';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-usuario-card',
  imports: [RouterLink],
  templateUrl: './usuario-card.component.html',
  styleUrl: './usuario-card.component.css',
})
export class UsuarioCardComponent {
  usuario = input<IUsuario>();
  usuariosServicios = inject(UsuariosServices);
  @Output() deleteEmit: EventEmitter<boolean> = new EventEmitter();

  async deleteUsuario(id: string | undefined){
    try{
      let response = await this.usuariosServicios.deleteById(id);
      if(response){
        toast.success(`El usuario ${response.first_name} ha sido eliminado`)
        console.log("borrado")
        this.deleteEmit.emit(true);
      }
    }catch (err){
      console.log(err)
    }
  }
}

import { Component, inject, signal } from '@angular/core';
import { UsuarioCardComponent } from '../../components/usuario-card/usuario-card.component';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosServices } from '../../services/usuarios.services';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-home',
  imports: [UsuarioCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  arrayUsuario= signal<IUsuario[]>([]);
  usuariosServicios = inject(UsuariosServices);

  ngOnInit(){
    this.cargarUsuarios();
    console.log("onINiT")
    console.log(this.cargarUsuarios())
  }

  async cargarUsuarios(){
    try{
      let response = await this.usuariosServicios.getAll();
      this.arrayUsuario.set(response.results)
    }catch (err){
      toast.error('No se ha podido cargar los datos');
    }
  }

  eventDelete(event:boolean){
    if(event){
      this.cargarUsuarios();
    }
  }

}

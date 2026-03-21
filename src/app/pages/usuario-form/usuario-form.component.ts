import { Component, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { UsuariosServices } from '../../services/usuarios.services';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  imports: [ReactiveFormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css',
})
export class UsuarioFormComponent {

  usuarioForm: FormGroup;
  id = input<string>();
  title: string = 'Crear';
  router = inject(Router);
  usuariosServicios= inject(UsuariosServices);
  usuario = signal<IUsuario | undefined>(undefined);

  constructor() {
    this.usuarioForm = new FormGroup({
      first_name: new FormControl('',[]),
      last_name: new FormControl('',[]),
      username: new FormControl('',[]),
      email: new FormControl('',[]),
      image: new FormControl('',[])
    });
  }

  async ngOnInit() {
    if (this.id()) {
      this.title = 'Actualizar';
      this.usuario.set(await this.usuariosServicios.getById(this.id()));
      this.usuarioForm.patchValue({
        first_name: this.usuario()?.first_name,
        last_name: this.usuario()?.last_name,
        username: this.usuario()?.username,
        email: this.usuario()?.email,
        image: this.usuario()?.image
      });


    }
  }

  async getDataForm() {
    if(this.id()){
      try{
        let response =  await this.usuariosServicios.update(this.id(), this.usuarioForm.value);
        if(response){
          toast.success('Usuario actualizado correctamente');
          this.router.navigate(['/home']);
        }
      } catch (error) {
        toast.error('Error al actualizar el usuario');
      }

    }else{
      try{
        let response = await this.usuariosServicios.insert(this.usuarioForm.value);
        if(response){
          toast.success('Usuario creado correctamente');
          this.router.navigate(['/home']);
        }
      } catch (error) {
        toast.error('Error al crear el usuario');
    }
  } 
}

}

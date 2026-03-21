import { Component, inject, signal, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  arrayUsuario = signal<IUsuario[]>([]);
  
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);

  usuariosServicios = inject(UsuariosServices);

  ngOnInit() {
    this.cargarUsuarios(this.currentPage());
  }

  async cargarUsuarios(page: number) {
    try {
      let response = await this.usuariosServicios.getAll(page);
      this.arrayUsuario.set(response.results);
      this.currentPage.set(response.page);
      this.totalPages.set(response.total_pages);
    } catch (err) {
      toast.error('No se ha podido cargar los datos');
    }
  }

  async paginaSiguiente() {
    if (this.currentPage() < this.totalPages()) {
      await this.cargarUsuarios(this.currentPage() + 1);
    }
  }

  async paginaAnterior() {
    if (this.currentPage() > 1) {
      await this.cargarUsuarios(this.currentPage() - 1);
    }
  }

  eventDelete(event: boolean) {
    if (event) {
      this.cargarUsuarios(this.currentPage());
    }
  }
}
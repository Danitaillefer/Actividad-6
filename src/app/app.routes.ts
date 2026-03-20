import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuarioFormComponent } from './pages/usuario-form/usuario-form.component';
import { Error404Component } from './pages/error404/error404.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'home'},
    {path:'home', component: HomeComponent},
    {path: 'user/:id' , component: UsuarioComponent },
    {path: 'newuser', component: UsuarioFormComponent},
    {path: 'updateuser/:id', component: UsuarioFormComponent},
    { path: "**", component: Error404Component }
];

import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {DevolucionesComponent} from './components/devoluciones/devoluciones.component';
import {EntradaComponent} from './components/entradas/entradas.component';
import {EntregaComponent} from './components/entregas/entregas.component';
import {InventarioComponent} from './components/inventario/inventario.component';
import {TareaComponent} from './components/tareas/tareas.component';
import {TransporteComponent} from './components/transporte/transporte.component';

//Servicios
import {AuthGuardService} from './services/auth-guard.service';

const APP_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'entrada',
    component: EntradaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'entrega',
    component: EntregaComponent ,
    canActivate: [AuthGuardService]
  },
  {
    path: 'inventario',
    component: InventarioComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'devolucion',
    component: DevolucionesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tarea',
    component: TareaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'transporte',
    component: TransporteComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);

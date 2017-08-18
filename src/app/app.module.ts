import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Pipes
import {TableFilterPipe} from './pipes/table-filter.pipe';

//Rutas
import {APP_ROUTING} from './app.routes';

//Servicios
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {EntregaService} from './services/entrega.service';
import {OperarioService} from './services/operario.service';
import {TareaService} from "./services/tarea.service";
import {EntradaService} from './services/entrada.service';
import {TransporteService} from './services/transporte.service';

//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { TareaComponent } from './components/tareas/tareas.component';
import { EntregaComponent } from './components/entregas/entregas.component';
import { EntradaComponent } from './components/entradas/entradas.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { DevolucionesComponent } from './components/devoluciones/devoluciones.component';
import { LoginComponent } from './components/login/login.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DetalleModalComponent } from './components/entregas/dialog/detalle-modal/detalle-modal.component';
import { TareaModalComponent } from './components/entregas/dialog/tarea-modal/tarea-modal.component';
import { CollapseModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';
import {DetalleTareaModalComponent} from './components/tareas/dialog/detalle-tarea/detalle-tarea.component';
import { TransporteComponent } from './components/transporte/transporte.component';
import {CsvService} from "angular2-json2csv";
import { DetalleTareaComponent } from './components/entradas/dialog/detalle-tarea/detalle-tarea.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TareaComponent,
    EntregaComponent,
    EntradaComponent,
    InventarioComponent,
    DevolucionesComponent,
    LoginComponent,
    DetalleModalComponent,
    TareaModalComponent,
    TableFilterPipe,
    DetalleTareaModalComponent,
    TransporteComponent,
    DetalleTareaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING,
    BootstrapModalModule,
    CollapseModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  entryComponents: [
    DetalleModalComponent,
    TareaModalComponent,
    DetalleTareaModalComponent,
    DetalleTareaComponent
  ],
  providers: [
    AuthService,
    AuthGuardService,
    EntregaService,
    OperarioService,
    TareaService,
    CsvService,
    EntradaService,
    TransporteService
],
  bootstrap: [AppComponent]
})
export class AppModule { }

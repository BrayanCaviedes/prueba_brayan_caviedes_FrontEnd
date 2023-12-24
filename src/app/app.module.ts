import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

// 1. Para trabajar con Reactive Forms
import {ReactiveFormsModule} from '@angular/forms';

// 2. Para trabajar con peticiones http
import {HttpClientModule} from '@angular/common/http';

// 3. TABLAS Y PAGINACION
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator';

// 4. Para trabajar con controles de formularios de material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

// Darle formato a las fechas
// en la terminar copiamos el siguiente comando (npm install moment --save)
// este comando tambien (npm i @angular/material-moment-adapter@14.2.7)
import { MomentDateModule } from '@angular/material-moment-adapter';

// 5. Para trabajar con mensajes de alertas
import {MatSnackBarModule} from '@angular/material/snack-bar';

// 6. Para trabajar con iconos de material
import {MatIconModule} from '@angular/material/icon';

// 7. Para trabajar con modales de material
import {MatDialogModule} from '@angular/material/dialog';

// 8. Para trabajar con cuadriculas
import {MatGridListModule} from '@angular/material/grid-list';
import { DialogoAddEditComponent } from './Dialog/dialog-add-edit/dialog-add-edit.component';
import { DialogoDeleteComponent } from './Dialog/dialog-delete/dialog-delete.component';



@NgModule({
  declarations: [
    AppComponent,
    DialogoAddEditComponent,
    DialogoDeleteComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

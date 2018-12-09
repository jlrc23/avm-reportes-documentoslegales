import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableVehiclesComponent } from './table-vehicles/table-vehicles.component';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule, MatInputModule, MatCheckboxModule, MatSelectModule, MatButtonModule, MatStepperModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { IconsComponent } from './icons/icons.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FilterComponent } from './filter/filter.component';
import { WizarReportComponent } from './wizar-report/wizar-report.component';
import {PromptSelectorModule} from '../../projects/prompt-selector/src/lib/prompt-selector.module';
import { FieldsSelectorComponent } from './fields-selector/fields-selector.component';
@NgModule({
  declarations: [
    AppComponent,
    TableVehiclesComponent,
    IconsComponent,
    FilterComponent,
    WizarReportComponent,
    FieldsSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatStepperModule,
    PromptSelectorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
3

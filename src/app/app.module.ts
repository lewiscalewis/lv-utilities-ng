import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LvCarrouselComponent } from 'src/components/lv-carrousel/lv-carrousel.component';
import { LvDataTableComponent } from 'src/components/lv-data-table/lv-data-table.component';
import { LvFormComponent } from 'src/components/lv-form/lv-form.component';
import { LvModalComponent } from 'src/components/lv-modal/lv-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LvCarrouselComponent,
    LvDataTableComponent,
    LvModalComponent,
    LvFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

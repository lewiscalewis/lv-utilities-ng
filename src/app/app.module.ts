import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LvCarrouselComponent } from 'src/components/lv-carrousel/lv-carrousel.component';
import { LvDataTableComponent } from 'src/components/lv-data-table/lv-data-table.component';
import { LvFormComponent } from 'src/components/lv-form/lv-form.component';
import { LvModalComponent } from 'src/components/lv-modal/lv-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LvSideBarComponent } from 'src/components/lv-sideBar/lv-sideBar.component';
import { LvLoadSpinnerComponent } from 'src/components/lv-load-spinner/lv-load-spinner.component';
import { LvDropdownComponent } from 'src/components/lv-dropdown/lv-dropdown.component';
import { LvModalService } from 'src/services/lv-modal.service';
import { LvDropDownService } from 'src/services/lv-dropdown.service';
import { LvSearchBarComponent } from 'src/components/lv-searchBar/lv-searchBar.component';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LvCarrouselComponent,
    LvDataTableComponent,
    LvModalComponent,
    LvFormComponent,
    LvSideBarComponent,
    LvLoadSpinnerComponent,
    LvDropdownComponent,
    LvSearchBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  providers: [LvModalService, LvDropDownService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

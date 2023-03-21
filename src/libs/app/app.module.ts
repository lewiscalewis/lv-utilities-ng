import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LvCarrouselComponent } from '../components/lv-carrousel/lv-carrousel.component';
import { LvDataTableComponent } from '../components/lv-data-table/lv-data-table.component';
import { LvDropdownComponent } from '../components/lv-dropdown/lv-dropdown.component';
import { LvFormComponent } from '../components/lv-form/lv-form.component';
import { LvLoadSpinnerComponent } from '../components/lv-load-spinner/lv-load-spinner.component';
import { LvModalComponent } from '../components/lv-modal/lv-modal.component';
import { LvSearchBarComponent } from '../components/lv-searchBar/lv-searchBar.component';
import { LvSideBarComponent } from '../components/lv-sideBar/lv-sideBar.component';
import { LvDarkThemeDirective } from '../directives/lv-dark.directive';
import { LvModalService } from '../services/lv-modal.service';

@NgModule({
  declarations: [
    LvCarrouselComponent,
    LvDataTableComponent,
    LvModalComponent,
    LvFormComponent,
    LvSideBarComponent,
    LvLoadSpinnerComponent,
    LvDropdownComponent,
    LvSearchBarComponent,
    LvDarkThemeDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  providers: [LvModalService, DatePipe],
  exports: [
    LvCarrouselComponent,
    LvDataTableComponent,
    LvModalComponent,
    LvFormComponent,
    LvSideBarComponent,
    LvLoadSpinnerComponent,
    LvDropdownComponent,
    LvSearchBarComponent,
    LvDarkThemeDirective
  ]
})
export class LvModule {
    public static forRoot(): ModuleWithProviders<LvModule> {
        return {
            ngModule: LvModule,
            providers: [
                LvModalService
            ]
        };
    }
 }

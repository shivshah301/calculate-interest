import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { CalculateInterestComponent } from './calculate-interest/calculate-interest.component';
import { CalculateInterestObjectComponent } from './calculate-interest-object/calculate-interest-object.component';
import { OverlayModule } from '@angular/cdk/overlay'
import { CdkMenuModule } from '@angular/cdk/menu'
import { InputComponent } from './input/input.component';
import { AutocompleteComponent } from './component/autocomplete/autocomplete.component';
import { MenubarComponent } from './component/menubar/menubar.component';
import { CardComponent } from './component/card/card.component';
import { TableComponent } from './component/table/table.component';
import { PopupComponent } from './component/popup/popup.component';
import { UserdetailComponent } from './component/userdetail/userdetail.component';
import { AssociateComponent } from './component/associate/associate.component';
import { HomeComponent } from './component/home/home.component';
import { FormdesignComponent } from './component/formdesign/formdesign.component';
import { SliderComponent } from './component/slider/slider.component';
import { MaterialModule } from './material-module';
import { SimpleInterestComponent } from './component/simple-interest/simple-interest.component';
import { CompoundInterestComponent } from './component/compound-interest/compound-interest.component';


@NgModule({
  declarations: [
    AppComponent,
    CalculateInterestComponent,
    CalculateInterestObjectComponent,
    InputComponent,
    AutocompleteComponent,
    MenubarComponent,
    HomeComponent,
    CardComponent,
    SliderComponent,
    TableComponent,
    FormdesignComponent,
    PopupComponent,
    AssociateComponent,
    UserdetailComponent,
    SimpleInterestComponent,
    CompoundInterestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    CdkMenuModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(MatNativeDateModule)//here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

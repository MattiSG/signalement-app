import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { SignalementFormComponent } from './pages/signalement-form/signalement-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale, frLocale } from 'ngx-bootstrap';
import { FileInputComponent } from './components/file-input/file-input.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { CompanyFormComponent } from './pages/company-form/company-form.component';
import { FooterComponent } from './pages/footer/footer.component';
import { WhyComponent } from './pages/infos/why/why.component';
import { RouterModule } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import { Angulartics2Module } from 'angulartics2';

defineLocale('fr', frLocale);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignalementFormComponent,
    FileInputComponent,
    CompanyFormComponent,
    FooterComponent,
    WhyComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    NgxLoadingModule.forRoot({ primaryColour: '#003b80', secondaryColour: '#003b80', tertiaryColour: '#003b80' }),
    Ng2CompleterModule,
    Angulartics2Module.forRoot(),
    RouterModule.forRoot([
        { path: '', component: SignalementFormComponent },
        { path: 'infos/why', component: WhyComponent },
      ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
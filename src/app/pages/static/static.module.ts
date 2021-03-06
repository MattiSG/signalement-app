import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HowComponent } from './how/how.component';
import { AboutComponent } from './about/about.component';
import { ProComponent } from './pro/pro.component';
import { RetractationComponent } from './retractation/retractation.component';
import { CguComponent } from './cgu/cgu.component';
import { BlogComponent } from './blog/blog.component';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ContactComponent } from './contact/contact.component';
import { ComponentsModule } from '../../components/components.module';
import { TrackingAndPrivacyComponent } from './tracking-and-privacy/tracking-and-privacy.component';

const routes: Routes = [
  { path: 'comment-ça-marche/consommateur', component: HowComponent },
  { path: 'comment-ça-marche/professionnel', component: ProComponent },
  { path: 'qui-sommes-nous', component: AboutComponent },
  { path: 'delai-de-retractation', component: RetractationComponent },
  { path: 'conditions-generales-utilisation', component: CguComponent },
  { path: 'conditions-generales-utilisation/consommateur', component: CguComponent },
  { path: 'conditions-generales-utilisation/professionnel', component: CguComponent },
  { path: 'blog/:year/:month/:day/:article', component: BlogComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'suivi-et-vie-privee', component: TrackingAndPrivacyComponent },
];

@NgModule({
  declarations: [
    HowComponent,
    AboutComponent,
    ProComponent,
    CguComponent,
    BlogComponent,
    RetractationComponent,
    ContactComponent,
    TrackingAndPrivacyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forChild(routes),
    MarkdownModule.forRoot(),
    ComponentsModule,
  ],
  exports: [
    RouterModule,
  ],
  providers: [
  ],
  entryComponents: [
  ]
})
export class StaticModule { }

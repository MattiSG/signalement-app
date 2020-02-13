import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { CompanyAccessesComponent } from './company-accesses/company-accesses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule, NgxLoadingConfig } from '../../components/components.module';
import { CompanyActivationComponent } from './company-activation/company-activation.component';
import { MyCompaniesComponent } from './my-companies/my-companies.component';
import { CompanyInvitationComponent } from './company-invitation/company-invitation.component';
import { NgxLoadingModule } from 'ngx-loading';

const routes: Routes = [
  { path: 'entreprise/acces/:siret', component: CompanyAccessesComponent, canActivate: [AuthGuard] },
  { path: 'entreprise/acces/:siret/invitation', component: CompanyInvitationComponent, canActivate: [AuthGuard] },
  { path: 'entreprise/activation', component: CompanyActivationComponent },
  { path: 'mes-entreprises', component: MyCompaniesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    CompanyActivationComponent,
    CompanyAccessesComponent,
    CompanyInvitationComponent,
    MyCompaniesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    NgxLoadingModule.forRoot(NgxLoadingConfig),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ],
})
export class CompaniesModule { }

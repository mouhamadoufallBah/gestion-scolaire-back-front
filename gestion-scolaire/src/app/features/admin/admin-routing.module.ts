import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewAdminComponent } from './overview-admin/overview-admin.component';
import { GestionClasseComponent } from './gestion-classe/gestion-classe.component';
import { GestionMatiereComponent } from './gestion-matiere/gestion-matiere.component';
import { GestionProfesseurComponent } from './gestion-professeur/gestion-professeur.component';
import { GestionApprenantComponent } from './gestion-apprenant/gestion-apprenant.component';


const routes: Routes = [

  { path: 'overview', component: OverviewAdminComponent },
  { path: 'gestion-classe', component: GestionClasseComponent },
  { path: 'gestion-matiere', component: GestionMatiereComponent },
  { path: 'gestion-professeur', component: GestionProfesseurComponent },
  { path: 'gestion-apprenant', component: GestionApprenantComponent },
  { path: '', redirectTo: 'overview', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

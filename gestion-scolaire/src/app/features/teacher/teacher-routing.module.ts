import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewTeacherComponent } from './overview-teacher/overview-teacher.component';
import { GestionEvaluationComponent } from './gestion-evaluation/gestion-evaluation.component';

const routes: Routes = [
  {path: 'overview', component: OverviewTeacherComponent},
  {path: 'evaluation', component: GestionEvaluationComponent},
  {path: '', redirectTo: 'overview', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }

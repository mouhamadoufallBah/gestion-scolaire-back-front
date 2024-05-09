import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewStudentComponent } from './overview-student/overview-student.component';

const routes: Routes = [
  {path: 'overview', component: OverviewStudentComponent},
  {path: '', redirectTo: 'overview', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }

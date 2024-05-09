import { Routes } from '@angular/router';
import { NavigationComponent } from './layouts/navigation/navigation.component';
import { CrudJantComponent } from './core/components/crud-jant/crud-jant.component';
import { adminGuard } from './core/guards/admin/admin.guard';

export const routes: Routes = [
  {

    path: 'dashboard', component: NavigationComponent, children: [
      {
        path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),  canActivate: [adminGuard]
      },
      {
        path: 'professeur', loadChildren: () => import('./features/teacher/teacher.module').then(m => m.TeacherModule), canActivate: [adminGuard]
      },
      {
        path: 'apprenant', loadChildren: () => import('./features/student/student.module').then(m => m.StudentModule), canActivate: [adminGuard]
      }
    ]
  },
  {
    path: '', loadChildren: () => import('./features/security/security.module').then(m => m.SecurityModule)
  }
  // {
  //   path: '', component: CrudJantComponent
  // },
];

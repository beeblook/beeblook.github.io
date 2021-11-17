import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentFormComponent } from '../student-form/student-form.component';
import { StudentRozkladComponent } from '../student-rozklad/student-rozklad.component';

const routes: Routes = [
  { path: '', redirectTo: 'student', pathMatch: 'full' },
  { path: 'student', component: StudentFormComponent },
  {
    path: 'student/:fakultet',
    component: StudentFormComponent,
  },
  {
    path: 'student/:fakultet/:kafedra',
    component: StudentFormComponent,
  },
  {
    path: 'student/:fakultet/:kafedra/:grupa',
    component: StudentRozkladComponent,
  },
  // { path: 'lectorer', component: LectorerComponent },
  // { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

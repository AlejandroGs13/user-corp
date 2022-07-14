import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    component:UserFormComponent,
    path:'add-user'
  },
  {
    component:UserFormComponent,
    path:'update-user/:id'
  },
  {
    component:UsersComponent,
    path:'users'
  },
  {
    path:'**',
    redirectTo:'users'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

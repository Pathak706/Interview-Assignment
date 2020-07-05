import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMemberComponent } from './list-member/list-member.component';
import { AddMemberComponent } from './add-member/add-member.component';

const routes: Routes = [
  {
    path: "",
    component: ListMemberComponent
  },
  {
    path: "member",
    component: AddMemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

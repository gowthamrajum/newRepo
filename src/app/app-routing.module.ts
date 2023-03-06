import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasklistComponent } from './tasklist/tasklist.component';
import { startNewProcessComponent } from './forms/myprocess/startNewProcess.component';


const routes: Routes = [
  { path: 'tasklist', component: TasklistComponent },
  { path: 'tasklist/:id', component: TasklistComponent },
  { path: 'startNewProcess', component: startNewProcessComponent },
  { path: 'startNewProcess/:id', component: startNewProcessComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ListComponent} from './components/list/list.component';
import {DetailsComponent} from './components/details/details.component';
import {CreateOrEditComponent} from './components/create-or-edit/create-or-edit.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'create', component: CreateOrEditComponent},
  {path: ':id', component: DetailsComponent},
  {path: ':id/edit', component: CreateOrEditComponent},
  {path: ':id/delete', component: DetailsComponent},
];

export const TodosRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);

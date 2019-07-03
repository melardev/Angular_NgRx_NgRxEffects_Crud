import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {TodosRoutingModule} from './todos.routing';
import {DetailsComponent} from './components/details/details.component';
import {CreateOrEditComponent} from './components/create-or-edit/create-or-edit.component';
import {ListComponent} from './components/list/list.component';


@NgModule({
  declarations: [ListComponent, CreateOrEditComponent, DetailsComponent],
  imports: [
    // Built in modules

    // My Modules
    SharedModule,
    TodosRoutingModule,
    // 3party Modules
  ]
})
export class TodosModule {
}

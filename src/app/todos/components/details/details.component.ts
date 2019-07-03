import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NotificationService} from '../../../shared/services/notification.service';
import {TodoApiService} from '../../services/todo-api.service';
import {Todo} from '../../dtos/responses/todos.dto';
import {AppState} from '../../../store/app.state';
import {Store} from '@ngrx/store';
import {FetchById} from '../../store/actions/todos.actions';
import {getTodo} from '../../store/reducers/todos.reducer';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  todo: Todo;

  constructor(private todoApiService: TodoApiService,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit() {

    // this.route.snapshot.paramMap.get('id');
    // this.route.snapshot.params.id
    this.route.params.subscribe(params => {
      const id = params.id;

      if (id) {
        this.store.dispatch(new FetchById(id));
        this.store.select(getTodo).subscribe(todo => {
          this.todo = todo;
        });
      }

    });
  }


}

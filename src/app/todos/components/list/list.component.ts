import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from '../../../shared/services/notification.service';
import {TodoApiService} from '../../services/todo-api.service';
import {Todo} from '../../dtos/responses/todos.dto';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.state';
import {getTodos} from '../../store/reducers/todos.reducer';
import {DeleteTodo, UpdateTodoAction} from '../../store/actions/todos.actions';
import * as TodoActions from './../../store/actions/todos.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private errors: any;
  todos: Todo[];

  constructor(private todosService: TodoApiService, private router: Router, private notificationService: NotificationService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new TodoActions.FetchAllTodos());
    this.store.select(getTodos).subscribe(todos => {
      this.todos = todos;
    });
  }

  edit(id: number) {
    this.todosService.getById(id).subscribe(res => {
      if ((res as Todo).id) {
        const returnedTodo = {...res};
        this.todos = this.todos.map(todo => todo.id === (returnedTodo as Todo).id ? (returnedTodo as Todo) : todo);
        this.notificationService.dispatchSuccessMessage('Todo updated successfully');
      } else {
        this.notificationService.dispatchSuccessMessage('Unknown error');
      }
      return res;
    });
  }

  toggleComplete(todo: Todo) {
    this.store.dispatch(new UpdateTodoAction({...todo, completed: !todo.completed}));
  }

  deleteAll() {
    this.todosService.deleteAll()
      .subscribe(
        res => {
          if (res.status === 204) {
            this.notificationService.dispatchSuccessMessage('Todos deleted successfully');
          } else {
            this.notificationService.dispatchErrorMessage('Error');
          }
        },
        error => this.errors = [{error}]
      );
  }

  deleteTodo(todo) {
    this.store.dispatch(new DeleteTodo(todo.id));
  }
}

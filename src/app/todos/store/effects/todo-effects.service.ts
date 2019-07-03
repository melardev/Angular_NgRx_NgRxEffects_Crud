import {Injectable} from '@angular/core';
import {TodoApiService} from '../../services/todo-api.service';
import {from, Observable, of, throwError} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  CreateTodoAction, CreateTodoSuccessAction, DeleteTodo, DeleteTodoSuccess,
  FetchById,
  FetchByIdSuccess,
  ActionTypes,
  UpdateTodoAction,
  UpdateTodoSuccessAction
} from '../actions/todos.actions';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Todo} from '../../dtos/responses/todos.dto';
import {ErrorAppResponse} from '../../../shared/dtos/responses/base.dto';
import {HttpResponse} from '@angular/common/http';
import * as TodoActions from '../actions/todos.actions';
import * as NotificationActions from '../../../shared/store/actions/notifications.actions';

import {AppState} from '../../../store/app.state';

@Injectable()
export class TodoEffects {

  constructor(private actions$: Actions, private todoApiService: TodoApiService, private store: Store<AppState>) {
  }

  // This Effect will be triggered on FETCH_ALL Action trigger
  // It is listening all events but only fires on FETCH_ALL
  @Effect()
  fetchAll$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.FETCH_ALL),
    // startWith(new AppActions.Loading(true)),
    switchMap(() =>
      this.todoApiService.fetchAll().pipe(
        map((todos: Todo[]) => {
          this.store.dispatch(new NotificationActions.SuccessMessageAction('Todos Loaded'));
          return new TodoActions.FetchAllSuccessAction(todos);
        }),
        catchError((err) => [new TodoActions.ErrorResponse([err.toString()])])
      )));

  @Effect()
  fetchById: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.FETCH_BY_ID),
    map((action: FetchById) => action.id),
    switchMap((id) => this.todoApiService.getById(id)),
    switchMap(response => {
      if ((response as Todo).id) {
        return of(new FetchByIdSuccess(response as Todo), new NotificationActions.SuccessMessageAction('Todo Loaded Successfully'));
      } else {
        return of(new NotificationActions.ErrorMessage((response as ErrorAppResponse).full_messages.join(', ')));
      }
    }),
    catchError(err => [new TodoActions.ErrorResponse([err.toString()])])
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofType(ActionTypes.UPDATE_TODO),
    map((action: UpdateTodoAction) => action.todo),
    mergeMap((todo: Todo) =>
      this.todoApiService.update(todo).pipe(
        map((response: Todo | ErrorAppResponse) => {
          if (response && (response as Todo).id) {
            return new UpdateTodoSuccessAction(response as Todo, true);
          } else {
            throw (response as ErrorAppResponse).full_messages.join(', ');
          }
        }),
        tap(() => this.store.dispatch(new NotificationActions.SuccessMessageAction('Todo Updated Successfully'))),
        catchError(err => {
          this.store.dispatch(new NotificationActions.ErrorMessage(err.toString()));
          return [new TodoActions.ErrorResponse([err.toString()])];
        }),
      )
    ));

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.CREATE_TODO),
    map((action: CreateTodoAction) => action.todo),
    switchMap((todo) =>
      this.todoApiService.createTodo(todo).pipe(
        map((response: HttpResponse<Todo | ErrorAppResponse>) => {
          if (response.status === 201) {
            this.store.dispatch(new NotificationActions.SuccessMessageAction('Todo Created'));
            return new CreateTodoSuccessAction(response.body as Todo);
          } else {
            throw ((response.body as ErrorAppResponse).full_messages.join(', '));
          }
        }),
        catchError(err => {
          this.store.dispatch(new NotificationActions.ErrorMessage(err.toString()));
          return of(new TodoActions.ErrorResponse([err.toString()]));
        })
      )));

  @Effect()
  deleteTodo = this.actions$.pipe(
    ofType(ActionTypes.DELETE_TODO),
    map((action: DeleteTodo) => action.id),
    switchMap(id =>
      this.todoApiService.deleteById(id).pipe(
        map((response: HttpResponse<void | ErrorAppResponse>) => {
          if (response.status === 204) {
            this.store.dispatch(new NotificationActions.SuccessMessageAction('Todo Deleted'));
            return new DeleteTodoSuccess(id);
          } else {
            return of(new NotificationActions.ErrorMessage((response.body as ErrorAppResponse).full_messages.join(', ')));
          }
        }),
        catchError((err) => {
          this.store.dispatch(new NotificationActions.ErrorMessage(err.toString()));
          return of(new TodoActions.ErrorResponse([err.toString()]));
        })
      )
    ),
    /*
    mergeMap(result => {
      return from([result, new NotificationActions.SuccessMessageAction('Todo deleted successfully')]);
    })
    */
  );
}




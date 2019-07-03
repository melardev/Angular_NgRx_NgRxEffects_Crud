import {Action} from '@ngrx/store';
import {Todo} from '../../dtos/responses/todos.dto';


export const ActionTypes = {
  FETCH_ALL: 'FETCH_ALL',
  FETCH_ALL_SUCCESS: 'FETCH_ALL_SUCCESS',
  ERROR_RESPONSE: 'ERROR_RESPONSE',
  FETCH_BY_ID: 'FETCH_BY_ID',
  FETCH_BY_ID_SUCCESS: 'FETCH_BY_ID_SUCCESS',
  CREATE_TODO: 'CREATE_TODO',
  CREATE_TODO_SUCCESS: 'CREATE_TODO_SUCCESS',
  UPDATE_TODO: 'UPDATE_TODO',
  UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',
  DELETE_TODO: 'DELETE_TODO',
  DELETE_TODO_SUCCESS: 'DELETE_TODO_SUCCESS',
  CLEAR_FLAGS: 'CLEAR_FLAGS'
};


export class FetchAllTodos implements Action {
  readonly type = ActionTypes.FETCH_ALL;
}

export class FetchAllSuccessAction implements Action {
  readonly type = ActionTypes.FETCH_ALL_SUCCESS;

  constructor(public todos: Todo[]) {
  }
}


export class ErrorResponse implements Action {
  readonly type = ActionTypes.ERROR_RESPONSE;

  constructor(public fullMessages: string[]) {
  }
}

export class FetchById implements Action {
  readonly type = ActionTypes.FETCH_BY_ID;

  constructor(public id: number) {
  }
}

export class FetchByIdSuccess implements Action {
  readonly type = ActionTypes.FETCH_BY_ID_SUCCESS;

  constructor(public todo: Todo) {
  }
}

export class UpdateTodoAction implements Action {
  readonly type = ActionTypes.UPDATE_TODO;

  constructor(public todo: Todo, public setCurrent = false) {
  }
}

export class UpdateTodoSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_TODO_SUCCESS;

  constructor(public todo: Todo, public setCurrent = false) {
  }
}

export class CreateTodoAction implements Action {
  readonly type = ActionTypes.CREATE_TODO;

  constructor(public todo: Todo) {
  }
}

export class CreateTodoSuccessAction implements Action {
  readonly type = ActionTypes.CREATE_TODO_SUCCESS;

  constructor(public todo: Todo) {
  }
}


export class DeleteTodo implements Action {
  readonly type = ActionTypes.DELETE_TODO;

  constructor(public id: number | string) {
  }
}

export class DeleteTodoSuccess implements Action {
  readonly type = ActionTypes.DELETE_TODO_SUCCESS;

  constructor(public id: number | string) {
  }
}

export class ClearFlags implements Action {
  readonly type = ActionTypes.CLEAR_FLAGS;
}

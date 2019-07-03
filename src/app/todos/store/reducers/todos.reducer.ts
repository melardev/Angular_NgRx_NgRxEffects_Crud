import {Action, createFeatureSelector, createSelector} from '@ngrx/store';
import {Todo} from '../../dtos/responses/todos.dto';
import {DeleteTodoSuccess, FetchByIdSuccess, ActionTypes, UpdateTodoSuccessAction, CreateTodoSuccessAction} from '../actions/todos.actions';
import * as TodoActions from '../actions/todos.actions';

export interface State {
  todos: Todo[];
  currentTodo: Todo;
  justCreated: boolean;
  justDeleted: boolean;
}

const INITIAL_STATE: State = {
  todos: [],
  currentTodo: null,
  justCreated: false,
  justDeleted: false
};

export function TodoReducer(state: State = INITIAL_STATE, action: Action) {

  switch (action.type) {
    case ActionTypes.FETCH_ALL_SUCCESS : {
      return {...state, todos: (action as TodoActions.FetchAllSuccessAction).todos || []};
    }

    case ActionTypes.FETCH_BY_ID_SUCCESS : {
      return {...state, currentTodo: (action as FetchByIdSuccess).todo};
    }

    case ActionTypes.CREATE_TODO_SUCCESS : {
      return {...state, justCreated: true, todos: state.todos.concat((action as CreateTodoSuccessAction).todo)};
    }

    case ActionTypes.UPDATE_TODO_SUCCESS: {
      const updatedTodo = (action as UpdateTodoSuccessAction).todo;
      const newState = {
        ...state, todos: state.todos.map(todo => {

          if (todo.id !== updatedTodo.id) {
            return todo;
          } else {
            return updatedTodo;
          }
        })
      };

      if ((action as UpdateTodoSuccessAction).setCurrent) {
        newState.currentTodo = updatedTodo;
      }
      return newState;
    }
    case ActionTypes.DELETE_TODO_SUCCESS: {
      return {...state, justDeleted: true, todos: state.todos.filter(t => t.id !== (action as DeleteTodoSuccess).id)};
    }

    case ActionTypes.CLEAR_FLAGS: {
      return {...state, justDeleted: false, justCreated: false};
    }
    default: {
      return state;
    }

  }
}

export const getTodoState = createFeatureSelector<State>('todos');
export const getTodos = createSelector(getTodoState, (state: State) => state.todos);
export const getTodo = createSelector(getTodoState, (state: State) => state.currentTodo);
export const getCreated = createSelector(getTodoState, (state: State) => state.justCreated);
export const getDeleted = createSelector(getTodoState, (state: State) => state.justDeleted);

import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as todoStore from '../todos/store/reducers/todos.reducer';
import {TodoReducer} from '../todos/store/reducers/todos.reducer';
import {NotificationsReducer} from '../shared/store/reducers/notifications.reducer';

export interface AppState {
  todos: todoStore.State;
}

export const reducers: ActionReducerMap<any> = {
  todos: TodoReducer,
  notifications: NotificationsReducer
};
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

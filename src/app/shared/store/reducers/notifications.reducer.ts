import {Action, createFeatureSelector, createSelector} from '@ngrx/store';
import * as NotificationActions from '../actions/notifications.actions';
import {SuccessMessageAction} from '../actions/notifications.actions';

export interface State {
  type: string;
  message: string;
}

const INITIAL_STATE: State = {
  type: '',
  message: ''
};

export function NotificationsReducer(state: State = INITIAL_STATE, action: Action) {

  switch (action.type) {

    case NotificationActions.ActionTypes.SUCCESS_MESSAGE : {
      return {...state, type: 'success', message: (action as SuccessMessageAction).message};
    }

    case NotificationActions.ActionTypes.ERROR_MESSAGE : {
      return {...state, type: 'error', message: (action as SuccessMessageAction).message};
    }

    case NotificationActions.ActionTypes.CLEAR : {
      return {...state, type: '', message: ''};
    }

    default: {
      return state;
    }

  }
}

export const getNotificationsState = createFeatureSelector<State>('notifications');
export const getNotificationMessage = createSelector(getNotificationsState, (state: State) => state.message);
export const getNotificationType = createSelector(getNotificationsState, (state: State) => state.type);

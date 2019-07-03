import {Action} from '@ngrx/store';

export const ActionTypes = {
  SUCCESS_MESSAGE: 'SUCCESS_MESSAGE',
  ERROR_MESSAGE: 'ERROR_MESSAGE',
  CLEAR: 'CLEAR'
};

export class SuccessMessageAction implements Action {
  readonly type = ActionTypes.SUCCESS_MESSAGE;

  constructor(public message: string) {
  }
}

export class ErrorMessage implements Action {
  readonly type = ActionTypes.ERROR_MESSAGE;

  constructor(public message: string) {
  }
}

export class ClearNotificationsAction implements Action {
  readonly type = ActionTypes.CLEAR;
}

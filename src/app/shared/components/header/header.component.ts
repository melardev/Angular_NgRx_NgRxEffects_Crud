import {Component, OnInit} from '@angular/core';
import {getNotificationsState} from '../../store/reducers/notifications.reducer';
import * as NotificationActions from '../../store/actions/notifications.actions';

import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private message: string;
  private className: string;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    this.store.select(getNotificationsState).subscribe(notification => {
      if (notification != null
        && notification.type != null && notification.type !== ''
        && notification.message && notification.message !== '') {
        this.className = notification.type === 'success' ? 'alert alert-success' : 'alert alert-danger';
        this.message = notification.message;
        setTimeout(() => {
          this.className = '';
          this.message = '';
          this.store.dispatch(new NotificationActions.ClearNotificationsAction());
        }, 1000);
      }
    });
  }

}

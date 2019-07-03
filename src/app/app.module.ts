import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {TodoReducer} from './todos/store/reducers/todos.reducer';
import {EffectsModule} from '@ngrx/effects';
import {TodoEffects} from './todos/store/effects/todo-effects.service';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {NotFoundComponent} from './not-found/not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {reducers} from './store/app.state';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    // Built in modules
    BrowserModule,
    HttpClientModule,

    // my modules
    AppRoutingModule,
    SharedModule,

    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TodoEffects]),
    // 3party modules
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

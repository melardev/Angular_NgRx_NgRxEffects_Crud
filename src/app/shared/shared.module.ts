import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PaginationComponent} from './components/pagination/pagination.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, PaginationComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    // Modules
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    // Components
    HeaderComponent, FooterComponent, PaginationComponent],
})
export class SharedModule {
}

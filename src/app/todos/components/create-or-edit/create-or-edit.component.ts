import {Component, OnInit} from '@angular/core';


import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {Todo} from '../../dtos/responses/todos.dto';
import {ClearFlags, CreateTodoAction, DeleteTodo, FetchById, UpdateTodoAction} from '../../store/actions/todos.actions';
import {getCreated, getDeleted, getTodo} from '../../store/reducers/todos.reducer';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.state';

@Component({
  selector: 'app-create-or-edit',
  templateUrl: './create-or-edit.component.html',
  styleUrls: ['./create-or-edit.component.css']
})
export class CreateOrEditComponent implements OnInit {

  todo: Todo;
  private todoForm: FormGroup;
  isSubmitting = false;
  private submitted: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private route: ActivatedRoute,
              private store: Store<AppState>) {
    this.todoForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      completed: [null],
    });
  }

  ngOnInit() {
    // const id = this.route.snapshot.params.id;

    this.route.params.subscribe(params => {
        const id = params.id;

        if (id) {
          this.store.dispatch(new FetchById(id));
          this.store.select(getTodo).subscribe(todo => {
            if (todo == null) {
              return;
            }
            console.log(todo);
            this.submitted = false;
            this.isSubmitting = false;
            this.todo = todo;

            // patchValue vs setValue, setValue is for updating all controls, patchValue for updating only some,
            // leaving the rest untouched
            this.todoForm.patchValue({
              title: todo.title,
              description: todo.description,
              completed: todo.completed
            });
          });

          this.store.select(getDeleted).subscribe(deleted => {
            if (deleted) {
              setTimeout(() => {
                this.router.navigateByUrl('/');
                this.store.dispatch(new ClearFlags());
              }, 500);
            }
          });

        } else {
          this.store.select(getCreated).subscribe(created => {
            if (created) {
              console.log('Created');
              this.submitted = true;
              this.isSubmitting = false;
              setTimeout(() => {
                this.router.navigateByUrl('/');
                this.store.dispatch(new ClearFlags());
              }, 1000);
            }
          });
        }
      }
    );
  }

  update(): void {
    this.submitted = true;
    this.store.dispatch(new UpdateTodoAction(this.todo, true));
  }

  delete(): void {
    this.submitted = true;
    this.store.dispatch(new DeleteTodo(this.todo.id));
  }

  create() {
    this.submitted = true;
    console.log(this.todo);
    this.store.dispatch(new CreateTodoAction(this.todo));
  }

  createOrUpdateTodo() {
    this.isSubmitting = true;
    const newTodo = {} as Todo;

    newTodo.title = this.todoForm.value.title;
    newTodo.description = this.todoForm.value.description;
    // If the user has not touched the checkbox then it will be null
    newTodo.completed = this.todoForm.value.completed || false;


    if (this.todo) {
      newTodo.id = this.todo.id;
      this.store.dispatch(new UpdateTodoAction(newTodo, true));
    } else {
      newTodo.completed = newTodo.completed || false;
      this.store.dispatch(new CreateTodoAction(newTodo));
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }
}

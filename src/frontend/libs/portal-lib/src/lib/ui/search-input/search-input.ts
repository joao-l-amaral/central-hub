import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'lib-search-input',
  templateUrl: './search-input.html',
  styleUrls: ['./search-input.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule],
})
export class SearchInputComponent {
  readonly placeholder = input('Search...');
  readonly disabled = input(false);
  readonly onKeySearch = input(false);
  readonly smallOptions = input(false);
  readonly errorState = input(false);

  readonly searchValue = output<string>();

  readonly searchForm = new FormControl('', { nonNullable: true });

  constructor() {
    effect((onCleanup) => {
      if (!this.onKeySearch()) {
        return;
      }

      const sub = this.searchForm.valueChanges
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe((value) => {
          this.searchValue.emit(value);
        });

      onCleanup(() => sub.unsubscribe());
    });
  }

  onSearch(event: Event) {
    if (!this.onKeySearch()) {
      event.preventDefault();
      this.searchValue.emit(this.searchForm.value);
    }
  }

  protected onForceClear() {
    this.searchForm.setValue('');
    this.searchValue.emit("");
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchInputComponent } from './search-input';
import { vi } from 'vitest';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default placeholder', () => {
    expect(component.placeholder()).toBe('Search...');
  });

  it('should have disabled input set to false by default', () => {
    expect(component.disabled()).toBe(false);
  });

  it('should emit searchValue on search', () => {
    const spy = vi.spyOn(component.searchValue, 'emit');
    component.searchForm.setValue('test query');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });

    component.onSearch(event);

    expect(spy).toHaveBeenCalledWith('test query');
  });
});

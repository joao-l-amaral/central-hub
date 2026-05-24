import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert-component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });

  it('Should create a AlertComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Check error icon based of status', () => {
      fixture.componentRef.setInput('title', "");
      fixture.componentRef.setInput('status', "danger");
      fixture.detectChanges();

      const alert = fixture.nativeElement.querySelector('.alert__icon');
      expect(alert.classList.contains('bi-x-circle')).toBe(true);
  })

  it('Check warning icon based of status', () => {
      fixture.componentRef.setInput('title', "");
      fixture.componentRef.setInput('status', "warning");
      fixture.detectChanges();

      const alert = fixture.nativeElement.querySelector('.alert__icon');
      expect(alert.classList.contains('bi-exclamation-triangle')).toBe(true);
  })

  it('Check info icon based of status', () => {
      fixture.componentRef.setInput('title', "");
      fixture.componentRef.setInput('status', "info");
      fixture.detectChanges();

      const alert = fixture.nativeElement.querySelector('.alert__icon');
      expect(alert.classList.contains('bi-info-circle')).toBe(true);
  })

});

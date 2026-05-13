import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CircleComponent } from './circle-component';

describe('CircleComponent', () => {
  let component: CircleComponent;
  let fixture: ComponentFixture<CircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CircleComponent);
    component = fixture.componentInstance;
  });

  it('Should create a CircleComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Should the color be primary if selected', () => {
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      const circle = fixture.nativeElement.querySelector('.circle-container');
      expect(circle.classList.contains('selected')).toBe(true);
  })

  it('Should the color be neutral if not selected', () => {
      fixture.componentRef.setInput('selected', false);
      fixture.detectChanges();

      const circle = fixture.nativeElement.querySelector('.circle-container');
      expect(circle.classList.contains('unselected')).toBe(true);
  })

  it('Should trigger the function if selected', async () => {
      const onActionFn = vi.spyOn(component, 'onAction');
      let clickedEmitted = "";

      fixture.componentRef.setInput('id', "batatas");
      fixture.componentRef.setInput('selected', true);

      component.clicked.subscribe(value => {
          clickedEmitted = value;
      });

      fixture.componentInstance.onAction();
      fixture.detectChanges();

      expect(clickedEmitted).toBe('batatas');

      expect(onActionFn).toHaveBeenCalledTimes(1);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideBarNavigationComponent } from './sidebar-nav';
import { PageSampleComponent } from './sidebar-nav.stories';
import {ChangeDetectionStrategy, Component, Pipe, PipeTransform, Type} from '@angular/core';
import { vi } from 'vitest';
import { InternalizationPipe } from '../../util-i18n';

@Component({
  selector: 'lib-dummy',
  template: `<span>dummy</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DummyComponent {}

@Pipe({
  name: 'translate',
  standalone: true,
})
class MockTranslatePipe implements PipeTransform {
  transform(value: unknown): unknown {
    return value;
  }
}

describe('SideBarNavigationComponent', () => {
  let component: SideBarNavigationComponent;
  let fixture: ComponentFixture<SideBarNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarNavigationComponent],
    })
      .overrideComponent(SideBarNavigationComponent, {
        remove: {
          imports: [InternalizationPipe],
        },
        add: {
          imports: [MockTranslatePipe],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SideBarNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set injectedComponent and usingSideNav when a component is passed', () => {
    component.optionHandler(PageSampleComponent);

    expect(component.injectedComponent()).toBe(PageSampleComponent);
    expect(component.usingSideNav()).toBe(true);
  });

  it('should overwrite a previously injected component', () => {
    component.optionHandler(PageSampleComponent);

    class AnotherComponent {}
    component.optionHandler(AnotherComponent);

    expect(component.injectedComponent()).toBe(AnotherComponent);
    expect(component.usingSideNav()).toBe(true);
  });

  it('should keep usingSideNav true even if called multiple times', () => {
    component.optionHandler(PageSampleComponent);
    component.optionHandler(PageSampleComponent);

    expect(component.usingSideNav()).toBe(true);
  });

  it('should clear the container and create the injected component when both are set', () => {
    component.usingSideNav.set(true);
    fixture.detectChanges();

    const container = component.container();
    expect(container).toBeTruthy();

    const clearSpy = vi.spyOn(container!, 'clear');
    const createComponentSpy = vi.spyOn(container!, 'createComponent');

    component.injectedComponent.set(DummyComponent as Type<unknown>);
    fixture.detectChanges();

    expect(clearSpy).toHaveBeenCalled();
    expect(createComponentSpy).toHaveBeenCalledWith(DummyComponent);
  });

  it('should return the selected injected component', () => {
    component.injectedComponent.set(DummyComponent);

    expect(component.selectedOption()).toBe(DummyComponent);
  });
});

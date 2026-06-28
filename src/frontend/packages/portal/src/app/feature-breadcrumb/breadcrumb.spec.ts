import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Breadcrumb } from './breadcrumb';
import {BreadcrumbStateService} from "./breadcrumb-state";

describe('BreadcrumbComponent', () => {
  let component: Breadcrumb;
  let fixture: ComponentFixture<Breadcrumb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [Breadcrumb],
        providers: [
            BreadcrumbStateService
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(Breadcrumb);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


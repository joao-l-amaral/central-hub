import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Administration } from './administration';
import {provideToastr} from "ngx-toastr";
import { I18nService } from '@central-hub/library';

describe('AdministrationComponent', () => {
  let component: Administration;
  let fixture: ComponentFixture<Administration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [Administration],
        providers: [
            provideToastr({
                timeOut: 3000,
                positionClass: 'toast-top-right',
                preventDuplicates: true,
            }),
            {
              provide: I18nService,
              useValue: { translate: vi.fn().mockReturnValue('translated') }
            }
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(Administration);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


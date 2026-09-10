import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Configuration } from './configuration';
import {provideToastr} from "ngx-toastr";
import { I18nService } from '@central-hub/library';

describe('ConfigurationComponent', () => {
  let component: Configuration;
  let fixture: ComponentFixture<Configuration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [Configuration],
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

    fixture = TestBed.createComponent(Configuration);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


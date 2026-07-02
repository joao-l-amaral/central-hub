import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrationComponent } from './administration.component';
import {provideToastr} from "ngx-toastr";
import { I18nService } from '@central-hub/library';

describe('AdministrationComponent', () => {
  let component: AdministrationComponent;
  let fixture: ComponentFixture<AdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [AdministrationComponent],
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

    fixture = TestBed.createComponent(AdministrationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


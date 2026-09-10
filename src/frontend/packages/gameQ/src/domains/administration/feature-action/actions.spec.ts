import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Actions } from './actions';
import {provideToastr} from "ngx-toastr";
import { I18nService } from '@central-hub/library';
import { GameqAdministrationApi } from '../data-access/gameq-administration-api';

describe('ActionsComponent', () => {
  let component: Actions;
  let fixture: ComponentFixture<Actions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [Actions],
        providers: [
            GameqAdministrationApi,
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

    fixture = TestBed.createComponent(Actions);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


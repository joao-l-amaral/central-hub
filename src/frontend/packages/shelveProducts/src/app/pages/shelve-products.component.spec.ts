import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShelveProductsComponent } from './shelve-products.component';
import { provideToastr } from 'ngx-toastr';
import { I18nService, LoggingService } from '@central-hub/library';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('ShelveProductsComponent', () => {
    let component: ShelveProductsComponent;
    let fixture: ComponentFixture<ShelveProductsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ShelveProductsComponent],
            providers: [
                provideToastr({
                    timeOut: 3000,
                    positionClass: 'toast-top-right',
                    preventDuplicates: true,
                }),
                LoggingService,
                provideHttpClient(),
                provideHttpClientTesting(),
                {
                  provide: I18nService,
                  useValue: { translate: vi.fn().mockReturnValue('translated') }
                }
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ShelveProductsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShelveProductsComponent } from './shelve-products.component';
import { provideToastr } from 'ngx-toastr';
import {ApplicationConfigurations, LoggingService} from '@portal-library';

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
                ApplicationConfigurations,
                LoggingService
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ShelveProductsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

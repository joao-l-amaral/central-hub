import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { GamePlatformApiService } from '../../data-source/game-platform-api.service';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Platforms } from '../../interfaces/game-platforms.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfigurationComponent } from './configuration/configuration.component';
import { InternalizationPipe, MF_FRONTEND } from '@portal/library';
import { ActionsComponent } from './actions/actions.component';

@Component({
    selector: 'administration-administration',
    templateUrl: './administration.component.html',
    styleUrl: './administration.component.scss',
    imports: [
        MatButtonToggleModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        ConfigurationComponent,
        InternalizationPipe,
        ActionsComponent
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        GamePlatformApiService,
        { provide: MF_FRONTEND, useValue: 'gameVault' }
    ]
})
export class AdministrationComponent implements OnInit {

    private readonly gamePlatformApi = inject(GamePlatformApiService);

    platformList = signal<Platforms>({
        listOfPlatforms: [],
        listOfSelectedPlatforms: []
    });
    hideMultipleSelectionIndicator = signal(false);
    configuration = signal("");

    catConfigConfigurationEdit = signal(false);

    platforms = computed(() => {
        const { listOfPlatforms, listOfSelectedPlatforms } = this.platformList();

        return listOfPlatforms.map(platform => ({
            platformName: platform,
            isSelected: listOfSelectedPlatforms.includes(platform),
        }));
    })

    readonly form = new FormGroup({
        data: new FormControl('', [Validators.required]),
    });

    ngOnInit(): void {
        this.gamePlatformApi.getPlatforms().then(platforms => {
            this.platformList.set(platforms);
        });
        this.gamePlatformApi.getConfigurations().then(configuration => {
            const configurationToDisplay = typeof configuration === 'string'
                    ? JSON.parse(configuration)
                    : configuration;

            this.configuration.set(configurationToDisplay);
        });
    }

    onValChange(value: MatButtonToggleChange) {
        this.gamePlatformApi.updatePlatform(value.value).then( () => {});
    }

    save() {
        if (this.form.invalid) {
            return;
        }

        alert("send")
    }
}

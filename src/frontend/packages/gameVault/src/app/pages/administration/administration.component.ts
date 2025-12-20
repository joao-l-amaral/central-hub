import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { GamePlatformApiService } from '../../data-source/game-platform-api.service';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Platforms } from '../../interfaces/game-platforms.interface';
import { MatCard } from '@angular/material/card';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'administration-administration',
    templateUrl: './administration.component.html',
    styleUrl: './administration.component.scss',
    imports: [
        MatButtonToggleModule,
        MatCheckboxModule,
        MatCard,
        JsonPipe
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        GamePlatformApiService
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

    platforms = computed(() => {
        const { listOfPlatforms, listOfSelectedPlatforms } = this.platformList();

        return listOfPlatforms.map(platform => ({
            platformName: platform,
            isSelected: listOfSelectedPlatforms.includes(platform),
        }));
    })

    ngOnInit(): void {
        this.gamePlatformApi.getPlatforms().then(platforms => {
            this.platformList.set(platforms);
        });
        this.gamePlatformApi.getConfigurations().then(configuration => {
            const s = JSON.stringify(configuration);
            console.log(s);
            const parsedConfiguration = JSON.parse(s);
            console.log(parsedConfiguration);

            const b = typeof configuration === 'string'
                    ? JSON.parse(configuration)
                    : configuration;


            this.configuration.set(b);

        });
    }

    onValChange(value: MatButtonToggleChange) {
        this.gamePlatformApi.updatePlatform(value.value).then( () => {});
    }
}

import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GamePlatformApiService } from '../../../data-source/game-platform-api.service';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'configuration-administration',
    templateUrl: './configuration.component.html',
    styleUrl: './configuration.component.scss',
    imports: [
        MatButtonToggleModule,
        MatCheckboxModule,
        MatCard,
        MatFormField,
        ReactiveFormsModule,
        MatLabel,
        MatHint,
        MatInput,
        CdkTextareaAutosize,
        MatButton
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: []
})
export class ConfigurationComponent implements OnInit {

    private readonly gamePlatformApi = inject(GamePlatformApiService);

    configuration = signal("");

    catConfigConfigurationEdit = signal(false);

    readonly form = new FormGroup({
        configurationData: new FormControl('', [Validators.required]),
    });

    ngOnInit(): void {
        this.gamePlatformApi.getConfigurations().then(configuration => {
            const configurationToDisplay = typeof configuration === 'string'
                ? JSON.parse(configuration)
                : configuration;

            this.configuration.set(configurationToDisplay);
            this.form.patchValue({
                configurationData:  JSON.stringify(configurationToDisplay, null, 2)
            })
            this.form.get('configurationData')?.disable();
        });
    }

    onChangeEditState() {
        this.catConfigConfigurationEdit.set(!this.catConfigConfigurationEdit());
        if(this.catConfigConfigurationEdit()){
            this.form.get('configurationData')?.enable();
        } else {
            this.form.get('configurationData')?.disable();
        }
    }

    save() {
        // if (this.form.invalid) {
        //     return;
        // }

        alert("send")
    }
}

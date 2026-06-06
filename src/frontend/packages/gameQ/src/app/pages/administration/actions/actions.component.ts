import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { I18nService, InternalizationPipe, LibCustomButtonDirective, MF_FRONTEND } from '@portal-library';
import { GamePlatformApiService } from '../../../data-source/game-platform-api.service';
import { ToastrService } from 'ngx-toastr';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'gameq-actions-administration',
    templateUrl: './actions.component.html',
    styleUrl: './actions.component.scss',
    imports: [
        InternalizationPipe,
        LibCustomButtonDirective,
        MatButton
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
    ]
})
export class ActionsComponent {

    readonly #gamePlatformApiService = inject(GamePlatformApiService);
    readonly #i18nService = inject(I18nService);
    readonly #toastr = inject(ToastrService);
    readonly #mf = inject(MF_FRONTEND);

    readonly isLoading = signal(false);

    onForceGamesUpdate() {
        this.isLoading.set(true);
        this.#gamePlatformApiService.forceGameSynchronization()
            .then(() => {
                this.isLoading.set(false);
                const successMsg = this.#i18nService.translate(this.#mf, "game.vault.game.sync.success");
                this.#toastr.success(successMsg);
            });
    }

}

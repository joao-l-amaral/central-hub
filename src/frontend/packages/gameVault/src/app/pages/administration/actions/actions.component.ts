import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService, InternalizationPipe, MF_FRONTEND } from '@portal/library';
import { MatButton } from '@angular/material/button';
import { GamePlatformApiService } from '../../../data-source/game-platform-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'actions-administration',
    templateUrl: './actions.component.html',
    styleUrl: './actions.component.scss',
    imports: [
        InternalizationPipe,
        MatButton
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
    ]
})
export class ActionsComponent {

    private readonly gamePlatformApiService = inject(GamePlatformApiService);
    private readonly i18nService = inject(I18nService);
    private readonly toastr = inject(ToastrService);
    private readonly mf = inject(MF_FRONTEND);

    onForceGamesUpdate() {
        this.gamePlatformApiService.forceGameSynchronization()
            .then(() => {
                console.log("------");
                const successMsg = this.i18nService.translate(this.mf, "game.vault.game.sync.success");
                this.toastr.success(successMsg);
            });
    }

}

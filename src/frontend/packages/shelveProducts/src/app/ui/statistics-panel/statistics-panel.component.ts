import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { StatisticsPanelService } from './statistics-panel.service';
import { InternalizationPipe, KeyValueComponent } from '@portal/library';

@Component({
    selector: 'app-statistics-panel-component',
    templateUrl: './statistics-panel.component.html',
    styleUrl: './statistics-panel.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        MatExpansionModule,
        InternalizationPipe,
        KeyValueComponent
    ],
    providers: []
})
export class StatisticsPanelComponent {

    private readonly statisticsPanelService = inject(StatisticsPanelService);

    readonly panelOpenState = signal(false);

    statistics = computed(() => {
        return this.statisticsPanelService.statistics()
    });

    totalCalories = computed(() => {
       const shelveProductCounts = this.statisticsPanelService.statistics();
       let total = 0;

       for(const statistic of shelveProductCounts) {
           let calories = statistic.calories ?? 0;

           total += calories;
       }

       return `${total}`;
    });

    totalCaloriesStatus = computed(() => {
        const totalCalories = +this.totalCalories();

        const daysToInConsideration = 7;
        const minCalories = 1200*daysToInConsideration;
        const maxCalories = 2400*daysToInConsideration;

        let state = "";

        if (totalCalories < minCalories) {
            state = "bg-danger";
        } else if (totalCalories > minCalories && totalCalories <= maxCalories) {
            state = "bg-warning";
        } else {
            state = "bg-success";
        }

        return state + ' force-white-color';
    })

    constructor() {
        this.statisticsPanelService.getStatistics();
    }

}

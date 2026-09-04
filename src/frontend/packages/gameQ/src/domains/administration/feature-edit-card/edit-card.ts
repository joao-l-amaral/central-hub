import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gameq-administration-edit-card',
  templateUrl: './edit-card.html',
  styleUrl: 'edit-card.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCard {}

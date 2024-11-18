import { CommonModule, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-metrics',
    standalone: true,
    imports: [CommonModule, NgFor, NgIf, DecimalPipe],
    templateUrl: './metrics.component.html',
    styleUrl: './metrics.component.scss',
})
export class MetricsComponent {
    @Input() metrics: { name: string; value: number }[] = [];

    convertToTitleCase(str: string): string {
      return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
    }
}

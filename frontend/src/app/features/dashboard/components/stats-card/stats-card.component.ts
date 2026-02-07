// src/app/features/dashboard/components/stats-card/stats-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Statistic } from '../../models/dashboard.model';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div class="flex items-center justify-between mb-4">
        <div>
          <p class="text-sm text-gray-500">{{ stat.title }}</p>
          <p class="text-2xl font-bold text-gray-800 mt-1">{{ stat.value }}</p>
        </div>
        <div class="{{ stat.color }} p-3 rounded-full">
          <i class="{{ stat.icon }} text-white text-xl"></i>
        </div>
      </div>
      
      <div class="flex items-center text-sm">
        <span [class]="stat.change && stat.change >= 0 ? 'text-green-600' : 'text-red-600'">
          <i [class]="stat.change && stat.change >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
          {{ stat.change && stat.change >= 0 ? '+' : '' }}{{ stat.change }}%
        </span>
        <span class="text-gray-500 ml-2">{{ stat.description }}</span>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class StatsCardComponent {
  @Input() stat!: Statistic;
}
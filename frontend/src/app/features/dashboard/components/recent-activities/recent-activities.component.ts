// src/app/features/dashboard/components/recent-activities/recent-activities.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { Activity } from '../../models/dashboard.model';

@Component({
  selector: 'app-recent-activities',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-md p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-gray-800">Activités Récentes</h2>
        <a href="#" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Voir tout
        </a>
      </div>
      
      <div class="space-y-4">
        <div *ngFor="let activity of activities" class="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div [ngClass]="getActivityIconClass(activity.type)" class="p-2 rounded-full mr-4">
            <i [class]="getActivityIcon(activity.type)" class="text-white"></i>
          </div>
          
          <div class="flex-1">
            <div class="flex justify-between">
              <h4 class="font-medium text-gray-800">{{ activity.title }}</h4>
              <span class="text-sm text-gray-500">{{ activity.time | date:'HH:mm' }}</span>
            </div>
            <p class="text-sm text-gray-600 mt-1">{{ activity.description }}</p>
            <div class="flex items-center mt-2">
              <i class="fas fa-user text-gray-400 mr-2"></i>
              <span class="text-sm text-gray-500">{{ activity.user }}</span>
              <span *ngIf="activity.amount" class="ml-4 text-sm font-medium text-green-600">
                {{ activity.amount | currency:'DT ' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class RecentActivitiesComponent implements OnInit {
  activities: Activity[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getRecentActivities().subscribe(activities => {
      this.activities = activities;
    });
  }

  getActivityIcon(type: string): string {
    const icons: { [key: string]: string } = {
      donation: 'fas fa-donate',
      family_assigned: 'fas fa-home',
      aid_distributed: 'fas fa-box-open',
      volunteer_joined: 'fas fa-hands-helping'
    };
    return icons[type] || 'fas fa-info-circle';
  }

  getActivityIconClass(type: string): string {
    const classes: { [key: string]: string } = {
      donation: 'bg-blue-100',
      family_assigned: 'bg-green-100',
      aid_distributed: 'bg-yellow-100',
      volunteer_joined: 'bg-purple-100'
    };
    return classes[type] || 'bg-gray-100';
  }
}
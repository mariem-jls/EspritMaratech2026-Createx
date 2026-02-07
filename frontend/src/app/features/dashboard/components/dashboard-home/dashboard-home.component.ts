import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { StatsCardComponent } from '../stats-card/stats-card.component';
import { RecentActivitiesComponent } from '../recent-activities/recent-activities.component';
import { DashboardService } from '../../services/dashboard.service';
import { Statistic, DashboardSummary } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterModule, StatsCardComponent, RecentActivitiesComponent],
  templateUrl: './dashboard-home.component.html',  // ← Fichier HTML externe
  styleUrls: ['./dashboard-home.component.css']    // ← Fichier CSS externe
})
export class DashboardHomeComponent implements OnInit {
  statistics: Statistic[] = [];
  private monthlyChart?: Chart;
  private distributionChart?: Chart;
  currentDate = new Date();
  
  // Données pour les événements et familles (à ajouter)
  upcomingEvents: any[] = [];
  recentFamilies: any[] = [];
  distributionItems: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadStatistics();
    
    // Charger les graphiques seulement dans le navigateur
    if (isPlatformBrowser(this.platformId)) {
      this.loadCharts();
    }
    
    this.loadMockData();
  }

  private loadStatistics(): void {
    this.statistics = this.dashboardService.getStatistics();
  }

  private loadCharts(): void {
    // Attendre que le DOM soit prêt
    setTimeout(() => {
      this.dashboardService.getDashboardSummary().subscribe(summary => {
        if (summary.monthlyDonations) {
          this.createMonthlyDonationsChart(summary.monthlyDonations);
        }
        if (summary.aidDistribution) {
          this.createAidDistributionChart(summary.aidDistribution);
        }
      });
    }, 100);
  }

  private createMonthlyDonationsChart(chartData: any): void {
    const canvas = document.getElementById('monthlyDonationsChart') as HTMLCanvasElement;
    if (!canvas) return;
    
    if (this.monthlyChart) {
      this.monthlyChart.destroy();
    }

    this.monthlyChart = new Chart(canvas, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true
            },
            ticks: {
              callback: function(value: number | string) {
                return Number(value).toLocaleString('fr-TN') + ' DT';
              }
            }
          }
        }
      }
    });
  }

  private createAidDistributionChart(chartData: any): void {
    const canvas = document.getElementById('aidDistributionChart') as HTMLCanvasElement;
    if (!canvas) return;
    
    if (this.distributionChart) {
      this.distributionChart.destroy();
    }

    this.distributionChart = new Chart(canvas, {
      type: 'doughnut',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    });
  }

  private loadMockData(): void {
    // Données pour les événements
    this.upcomingEvents = [
      {
        title: 'Distribution alimentaire',
        date: new Date('2024-02-20'),
        time: '09:00 - 12:00',
        location: 'Centre Nord',
        status: 'confirmed'
      },
      {
        title: 'Réunion des bénévoles',
        date: new Date('2024-02-22'),
        time: '14:00 - 16:00',
        location: 'Siège principal',
        status: 'planned'
      }
    ];

    // Données pour les familles récentes
    this.recentFamilies = [
      {
        name: 'Famille Ben Salah',
        members: 5,
        location: 'Tunis',
        status: 'active'
      },
      {
        name: 'Famille Trabelsi',
        members: 4,
        location: 'Sousse',
        status: 'pending'
      }
    ];

    // Items de distribution
    this.distributionItems = [
      { label: 'Nourriture', value: 40, color: 'rgba(255, 99, 132, 0.6)' },
      { label: 'Vêtements', value: 25, color: 'rgba(54, 162, 235, 0.6)' },
      { label: 'Médicaments', value: 15, color: 'rgba(255, 206, 86, 0.6)' }
    ];
  }

  refreshData(): void {
    this.loadStatistics();
    this.loadCharts();
  }

  onTimeFilterChange(event: any): void {
    console.log('Filter changed:', event.target.value);
    // Implémenter la logique de filtrage
  }
}
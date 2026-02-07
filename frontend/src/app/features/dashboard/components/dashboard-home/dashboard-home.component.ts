import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  // Données du dashboard
  currentDate = new Date();
  totalFamilies = 156;
  totalDonations = 125000;
  annualTotal = 285000;
  growthRate = 18.5;
  pendingFamilies = 12;
  urgentNeeds = 7;
  completedDistributions = 43;
  activeVolunteers = 28;
  
  // Graphiques
  private monthlyChart?: Chart;
  private distributionChart?: Chart;
  private conversionChart?: Chart;
  
  // Événements
  upcomingEvents = [
    {
      title: 'Distribution alimentaire Nord',
      date: new Date(),
      time: '09:00 - 12:00',
      location: 'Centre communautaire Nord',
      status: 'confirmed' as 'confirmed' | 'planned'
    },
    {
      title: 'Réunion des bénévoles',
      date: new Date(Date.now() + 86400000), // Demain
      time: '14:30 - 16:00',
      location: 'Siège OMNIA',
      status: 'planned' as 'confirmed' | 'planned'
    },
    {
      title: 'Collecte de fonds mensuelle',
      date: new Date(Date.now() + 2 * 86400000), // Après-demain
      time: '10:00 - 18:00',
      location: 'Centre-ville',
      status: 'planned' as 'confirmed' | 'planned'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    console.log('Dashboard initialisé');
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initCharts();
    }
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }

  // Méthodes pour formater les dates dans le template
  getFormattedDate(): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return this.currentDate.toLocaleDateString('fr-FR', options);
  }

  formatDay(date: Date): string {
    return date.getDate().toString().padStart(2, '0');
  }

  formatMonth(date: Date): string {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    return months[date.getMonth()];
  }

  private initCharts(): void {
    setTimeout(() => {
      this.initMonthlyDonationsChart();
      this.initDistributionChart();
      this.initConversionChart();
    }, 100);
  }

  private initMonthlyDonationsChart(): void {
    const canvas = document.getElementById('monthlyDonationsChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');

    this.monthlyChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
        datasets: [{
          label: 'Dons (DT)',
          data: [18500, 22100, 19500, 27400, 25200, 31800, 28900, 34100, 31200, 37500, 34200, 41000],
          borderColor: '#3b82f6',
          backgroundColor: gradient,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(30, 41, 59, 0.95)',
            titleColor: '#f1f5f9',
            bodyColor: '#f1f5f9',
            callbacks: {
              label: (context) => {
                const value = context.parsed.y;
                if (value === null || value === undefined) return '';
                return `Dons: ${new Intl.NumberFormat('fr-TN', {
                  style: 'currency',
                  currency: 'TND'
                }).format(value)}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#64748b' }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(226, 232, 240, 0.5)' },
            ticks: {
              color: '#64748b',
              callback: (value) => {
                const numValue = Number(value);
                if (isNaN(numValue)) return '';
                return new Intl.NumberFormat('fr-TN', {
                  style: 'currency',
                  currency: 'TND',
                  minimumFractionDigits: 0
                }).format(numValue);
              }
            }
          }
        }
      }
    });
  }

  private initDistributionChart(): void {
    const canvas = document.getElementById('distributionChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.distributionChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Alimentaire', 'Vêtements', 'Médical', 'Éducation', 'Logement'],
        datasets: [{
          data: [45, 25, 15, 10, 5],
          backgroundColor: [
            '#3b82f6',
            '#10b981',
            '#8b5cf6',
            '#f59e0b',
            '#ef4444'
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          }
        },
        cutout: '70%'
      }
    });
  }

  private initConversionChart(): void {
    const canvas = document.getElementById('conversionChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.conversionChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [{
          label: 'Taux de Conversion (%)',
          data: [65, 72, 68, 75, 78, 82],
          backgroundColor: '#10b981',
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: (value) => `${value}%`
            }
          }
        }
      }
    });
  }

  private destroyCharts(): void {
    [this.monthlyChart, this.distributionChart, this.conversionChart].forEach(chart => {
      if (chart) {
        chart.destroy();
      }
    });
  }

  // Méthodes d'actions
  refreshData(): void {
    console.log('Rafraîchissement des données...');
    this.destroyCharts();
    this.initCharts();
    
    // Simuler un chargement de nouvelles données
    this.totalFamilies = Math.floor(156 + Math.random() * 10);
    this.totalDonations = Math.floor(125000 + Math.random() * 5000);
  }

  onPeriodChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const period = select.value;
    console.log('Période sélectionnée:', period);
  }

  // Méthodes des actions rapides
  addFamily(): void {
    console.log('Ajouter une famille');
  }

  recordDonation(): void {
    console.log('Enregistrer un don');
  }

  distributeAid(): void {
    console.log('Distribuer de l\'aide');
  }

  generateReport(): void {
    console.log('Générer un rapport');
  }

  scheduleEvent(): void {
    console.log('Planifier un événement');
  }

  manageInventory(): void {
    console.log('Gérer le stock');
  }

  addEvent(): void {
    console.log('Ajouter un événement');
  }
}
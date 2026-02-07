// src/app/features/dashboard/services/dashboard.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DashboardSummary, Statistic, Activity, ChartData } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private mockSummary: DashboardSummary = {
    statistics: [],
    activities: [],
    totalDonations: 125430,
    recentActivities: [
      {
        id: '1',
        type: 'donation',
        title: 'Nouveau don',
        description: 'Don reçu de la société ABC Corp',
        timestamp: new Date('2024-01-15T10:30:00'),
        time: new Date('2024-01-15T10:30:00'),
        user: 'Mohamed Ali',
        amount: 5000,
        icon: 'fas fa-donate',
        color: 'text-green-600'
      },
      {
        id: '2',
        type: 'family_assigned',
        title: 'Famille assignée',
        description: 'Famille Ben Salah ajoutée au programme',
        timestamp: new Date('2024-01-15T09:15:00'),
        time: new Date('2024-01-15T09:15:00'),
        user: 'Fatima Zohra',
        icon: 'fas fa-home',
        color: 'text-blue-600'
      },
      {
        id: '3',
        type: 'aid_distributed',
        title: 'Aide distribuée',
        description: 'Colis alimentaire distribué à la région Nord',
        timestamp: new Date('2024-01-14T16:45:00'),
        time: new Date('2024-01-14T16:45:00'),
        user: 'Karim B.',
        amount: 1200,
        icon: 'fas fa-box-open',
        color: 'text-yellow-600'
      },
      {
        id: '4',
        type: 'volunteer_joined',
        title: 'Nouveau bénévole',
        description: 'Sarah M. a rejoint l\'équipe des bénévoles',
        timestamp: new Date('2024-01-14T14:20:00'),
        time: new Date('2024-01-14T14:20:00'),
        user: 'Sarah M.',
        icon: 'fas fa-hands-helping',
        color: 'text-purple-600'
      }
    ],
    monthlyDonations: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Dons (DT)',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 32000, 29000, 35000, 40000, 45000],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    aidDistribution: {
      labels: ['Nourriture', 'Vêtements', 'Médicaments', 'Éducation', 'Logement'],
      datasets: [{
        label: 'Distribution d\'aide (%)',
        data: [40, 25, 15, 12, 8],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    }
  };

  getDashboardSummary(): Observable<DashboardSummary> {
    // Simuler une requête API avec un délai
    return of(this.mockSummary).pipe(delay(500));
  }

  getStatistics(): Statistic[] {
    return [
      {
        title: 'Total des Dons',
        value: '125,430 DT',
        icon: 'fas fa-donate',
        color: 'bg-blue-500',
        change: 12.5,
        description: '+12.5% par rapport au mois dernier'
      },
      {
        title: 'Familles Assistées',
        value: '248',
        icon: 'fas fa-home',
        color: 'bg-green-500',
        change: 8.3,
        description: '8 nouvelles familles ce mois-ci'
      },
      {
        title: 'Aide Distribuée',
        value: '892 Colis',
        icon: 'fas fa-box-open',
        color: 'bg-yellow-500',
        change: 15.2,
        description: 'Distribution accrue cette semaine'
      },
      {
        title: 'Bénévoles Actifs',
        value: '56',
        icon: 'fas fa-hands-helping',
        color: 'bg-purple-500',
        change: 5.6,
        description: '5 nouveaux bénévoles inscrits'
      }
    ];
  }

  getRecentActivities(): Observable<Activity[]> {
    return of(this.mockSummary.recentActivities || []).pipe(delay(300));
  }
}
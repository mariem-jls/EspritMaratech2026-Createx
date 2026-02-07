// src/app/features/dashboard/models/dashboard.model.ts
export interface Statistic {
  title: string;
  value: number | string;
  icon: string;
  color: string;
  change?: number;
  description?: string;
}

export interface Activity {
  id: number;
  type: 'donation' | 'family_assigned' | 'aid_distributed' | 'volunteer_joined';
  title: string;
  description: string;
  time: Date;
  user: string;
  amount?: number;
  familyName?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

export interface DashboardSummary {
  totalDonations: number;
  familiesAssisted: number;
  aidDistributed: number;
  activeVolunteers: number;
  recentActivities: Activity[];
  monthlyDonations: ChartData;
  aidDistribution: ChartData;
}
export interface Statistic {
  title: string;
  value: string | number;
  change?: number;
  icon?: string;
  color?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: Date | string;
  user?: string;
  icon?: string;
  color?: string;
  title?: string;
  time?: Date | string;
  amount?: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }[];
}

export interface DashboardSummary {
  statistics: Statistic[];
  activities: Activity[];
  chartData?: ChartData;
  totalDonations?: number;
  monthlyDonations?: ChartData;
  aidDistribution?: ChartData;
  recentActivities?: Activity[];
}
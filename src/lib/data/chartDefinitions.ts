import { ReactNode } from 'react';

// Definición de un gráfico
export interface ChartDefinition {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'area' | 'pie';
  height: number;
  series: ChartSeries[];
  description?: string;
  icon?: ReactNode;
  defaultVisible?: boolean;
}

// Definición de una serie de datos para un gráfico
export interface ChartSeries {
  key: string;
  name: string;
  color: string;
  strokeDasharray?: string;
}

// Gráficos disponibles en la aplicación
export const availableCharts: ChartDefinition[] = [
  {
    id: 'efficiency-trend',
    title: 'Tendencia de Eficiencia por Value Stream',
    type: 'line',
    height: 300,
    defaultVisible: true,
    series: [
      { key: 'efficiency', name: 'Eficiencia Real', color: '#10b981' },
      { key: 'target', name: 'Meta', color: '#6366f1', strokeDasharray: '5 5' }
    ],
    description: 'Muestra la tendencia de eficiencia para cada Value Stream comparada con la meta.'
  },
  {
    id: 'production-by-stream',
    title: 'Producción por Value Stream',
    type: 'bar',
    height: 200,
    defaultVisible: true,
    series: [
      { key: 'production', name: 'Producción Real', color: '#10b981' },
      { key: 'productionTarget', name: 'Meta', color: '#6366f1' }
    ],
    description: 'Compara la producción real con la meta para cada Value Stream.'
  },
  {
    id: 'downtime-distribution',
    title: 'Distribución de Downtime',
    type: 'bar',
    height: 200,
    defaultVisible: true,
    series: [
      { key: 'downtime', name: 'Downtime (min)', color: '#f43f5e' }
    ],
    description: 'Muestra la distribución del tiempo de inactividad por Value Stream.'
  },
  {
    id: 'paid-vs-earned-hours',
    title: 'Horas Pagadas vs Ganadas',
    type: 'bar',
    height: 300,
    defaultVisible: false,
    series: [
      { key: 'paidHours', name: 'Horas Pagadas', color: '#10b981' },
      { key: 'earnedHours', name: 'Horas Ganadas', color: '#6366f1' }
    ],
    description: 'Compara las horas pagadas con las horas ganadas para cada Value Stream.'
  },
  {
    id: 'downtime-comparison',
    title: 'Comparativa de Downtime',
    type: 'bar',
    height: 300,
    defaultVisible: false,
    series: [
      { key: 'downtime', name: 'Downtime Total', color: '#f43f5e' },
      { key: 'netDowntime', name: 'Downtime Neto', color: '#eab308' }
    ],
    description: 'Compara el downtime total con el downtime neto para cada Value Stream.'
  },
  {
    id: 'production-trend',
    title: 'Tendencia de Producción',
    type: 'line',
    height: 300,
    defaultVisible: false,
    series: [
      { key: 'production', name: 'Producción Real', color: '#10b981' },
      { key: 'productionTarget', name: 'Meta', color: '#6366f1' }
    ],
    description: 'Muestra la tendencia de producción para cada Value Stream comparada con la meta.'
  },
  {
    id: 'efficiency-vs-downtime',
    title: 'Eficiencia vs Downtime',
    type: 'bar',
    height: 300,
    defaultVisible: false,
    series: [
      { key: 'efficiency', name: 'Eficiencia (%)', color: '#10b981' },
      { key: 'downtime', name: 'Downtime (min)', color: '#f43f5e' }
    ],
    description: 'Compara la eficiencia con el downtime para identificar correlaciones.'
  }
]; 
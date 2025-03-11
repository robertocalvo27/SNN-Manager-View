import React from 'react';
import { HierarchyMetric } from '@/components/ui/hierarchy-metric-selector';
import { 
  TrendingUp, 
  Factory, 
  Clock, 
  DollarSign,
  Timer,
  TimerOff,
  Clock4
} from 'lucide-react';

// Métricas disponibles para la vista jerárquica
export const hierarchyMetrics: HierarchyMetric[] = [
  {
    id: "efficiency",
    label: "Eficiencia",
    icon: React.createElement(TrendingUp, { className: "h-4 w-4" }),
    isHigherBetter: true,
    target: 90
  },
  {
    id: "production",
    label: "Producción",
    icon: React.createElement(Factory, { className: "h-4 w-4" }),
    isHigherBetter: true
  },
  {
    id: "downtime",
    label: "Downtime",
    icon: React.createElement(Clock, { className: "h-4 w-4" }),
    isHigherBetter: false,
    target: 8500
  },
  {
    id: "absorption",
    label: "Absorción",
    icon: React.createElement(DollarSign, { className: "h-4 w-4" }),
    isHigherBetter: true,
    target: 100
  },
  {
    id: "paidHours",
    label: "Horas Pagadas",
    icon: React.createElement(Timer, { className: "h-4 w-4" }),
    isHigherBetter: false,
    target: 13000
  },
  {
    id: "earnedHours",
    label: "Horas Ganadas",
    icon: React.createElement(TimerOff, { className: "h-4 w-4" }),
    isHigherBetter: true,
    target: 13000
  },
  {
    id: "netDowntime",
    label: "Downtime Neto",
    icon: React.createElement(Clock4, { className: "h-4 w-4" }),
    isHigherBetter: false,
    target: 7500
  }
];

// Función para obtener el valor de una métrica específica para un Value Stream o línea
export const getMetricValue = (
  item: any, 
  metricId: string
): { value: number; showPercentage: boolean } => {
  switch (metricId) {
    case "efficiency":
      return { value: item.efficiency, showPercentage: true };
    case "production":
      return { value: item.production || 0, showPercentage: false };
    case "downtime":
      return { value: item.downtime || 0, showPercentage: false };
    case "absorption":
      // Calcular absorción si no está disponible directamente
      if (item.absorption) return { value: item.absorption, showPercentage: true };
      if (item.earnedHours && item.paidHours) {
        return { value: (item.earnedHours / item.paidHours) * 100, showPercentage: true };
      }
      return { value: 0, showPercentage: true };
    case "paidHours":
      return { value: item.paidHours || 0, showPercentage: false };
    case "earnedHours":
      return { value: item.earnedHours || 0, showPercentage: false };
    case "netDowntime":
      return { value: item.netDowntime || 0, showPercentage: false };
    default:
      return { value: 0, showPercentage: true };
  }
}; 
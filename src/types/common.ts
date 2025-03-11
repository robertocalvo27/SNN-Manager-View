// Interfaz para opciones de selección
export interface Option {
  label: string;
  value: string;
}

// Interfaz para datos de turnos
export interface ShiftOption extends Option {
  // Propiedades adicionales específicas de turnos si son necesarias
}

// Interfaz para rangos de fechas
export interface DateRange {
  from: Date;
  to: Date;
}

// Interfaz para estadísticas
export interface Stat {
  id: string;
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  // Datos para comparación
  previousValue?: string | number;
  percentageChange?: number;
  // Datos para indicadores de color
  target?: number;
  isHigherBetter?: boolean; // true si un valor más alto es mejor, false si un valor más bajo es mejor
  numericValue?: number; // valor numérico para comparar con la meta
}

// Interfaz para líneas de producción
export interface ProductionLine {
  name: string;
  efficiency: number;
  production: number;
  // Otras propiedades específicas de líneas
}

// Interfaz para Value Streams
export interface ValueStream {
  name: string;
  efficiency: number;
  target: number;
  production: number;
  productionTarget: number;
  downtime: number;
  paidHours: number;
  earnedHours: number;
  netDowntime: number;
  realDowntime: number;
  lines: ProductionLine[];
}

// Tipos de comparación
export type ComparisonPeriod = 'none' | 'day' | 'week' | 'month' | 'year'; 
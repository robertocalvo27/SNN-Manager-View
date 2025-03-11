import { Stat } from "@/types/common";

// Datos de comparación para el día anterior
export const previousDayData: Record<string, { value: string | number, percentageChange: number }> = {
  "efficiency": { 
    value: "220.45%", 
    percentageChange: 8.28 // (238.71 - 220.45) / 220.45 * 100
  },
  "production": { 
    value: "42,890", 
    percentageChange: 6.12 // (45516 - 42890) / 42890 * 100
  },
  "downtime": { 
    value: "10,120.55 min", 
    percentageChange: -6.61 // (9451.88 - 10120.55) / 10120.55 * 100, negativo porque menos downtime es mejor
  },
  "absorption": { 
    value: "118.2%", 
    percentageChange: 5.58 // (124.8 - 118.2) / 118.2 * 100
  },
  "paidHours": { 
    value: "12,200", 
    percentageChange: 2.46 // (12500 - 12200) / 12200 * 100
  },
  "earnedHours": { 
    value: "14,420", 
    percentageChange: 8.18 // (15600 - 14420) / 14420 * 100
  },
  "netDowntime": { 
    value: "8,950 min", 
    percentageChange: -8.38 // (8200 - 8950) / 8950 * 100, negativo porque menos downtime es mejor
  }
};

// Datos de comparación para la semana anterior
export const previousWeekData: Record<string, { value: string | number, percentageChange: number }> = {
  "efficiency": { 
    value: "215.32%", 
    percentageChange: 10.86 
  },
  "production": { 
    value: "40,120", 
    percentageChange: 13.45 
  },
  "downtime": { 
    value: "11,250.30 min", 
    percentageChange: -15.99
  },
  "absorption": { 
    value: "112.5%", 
    percentageChange: 10.93
  },
  "paidHours": { 
    value: "11,800", 
    percentageChange: 5.93
  },
  "earnedHours": { 
    value: "13,275", 
    percentageChange: 17.51
  },
  "netDowntime": { 
    value: "9,450 min", 
    percentageChange: -13.23
  }
};

// Datos de comparación para el mes anterior
export const previousMonthData: Record<string, { value: string | number, percentageChange: number }> = {
  "efficiency": { 
    value: "198.65%", 
    percentageChange: 20.17
  },
  "production": { 
    value: "38,750", 
    percentageChange: 17.46
  },
  "downtime": { 
    value: "12,350.45 min", 
    percentageChange: -23.47
  },
  "absorption": { 
    value: "105.3%", 
    percentageChange: 18.52
  },
  "paidHours": { 
    value: "11,250", 
    percentageChange: 11.11
  },
  "earnedHours": { 
    value: "11,850", 
    percentageChange: 31.65
  },
  "netDowntime": { 
    value: "10,120 min", 
    percentageChange: -18.97
  }
};

// Función para obtener datos de comparación según el período
export const getComparisonData = (period: 'day' | 'week' | 'month'): Record<string, { value: string | number, percentageChange: number }> => {
  switch (period) {
    case 'day':
      return previousDayData;
    case 'week':
      return previousWeekData;
    case 'month':
      return previousMonthData;
    default:
      return previousDayData;
  }
};

// Función para aplicar datos de comparación a las estadísticas
export const applyComparisonData = (
  stats: Stat[], 
  period: 'none' | 'day' | 'week' | 'month'
): Stat[] => {
  if (period === 'none') {
    return stats.map(stat => ({
      ...stat,
      previousValue: undefined,
      percentageChange: undefined
    }));
  }

  const comparisonData = getComparisonData(period as 'day' | 'week' | 'month');
  
  return stats.map(stat => {
    const comparison = comparisonData[stat.id];
    if (!comparison) return stat;
    
    return {
      ...stat,
      previousValue: comparison.value,
      percentageChange: comparison.percentageChange
    };
  });
}; 
import React from 'react';
import { cn } from '@/lib/utils';

interface HierarchyMetricValueProps {
  value: number;
  target?: number;
  isHigherBetter?: boolean;
  className?: string;
  showPercentage?: boolean;
}

export function HierarchyMetricValue({ 
  value, 
  target, 
  isHigherBetter = true,
  className,
  showPercentage = true
}: HierarchyMetricValueProps) {
  // Si no hay meta, mostrar sin color especial
  if (target === undefined) {
    return (
      <span className={cn("text-sm font-medium", className)}>
        {showPercentage ? `${value.toFixed(2)}%` : value.toLocaleString()}
      </span>
    );
  }

  // Determinar si el valor está por encima o por debajo de la meta
  const isAboveTarget = value > target;
  const isBelowTarget = value < target;
  
  // Determinar si el rendimiento es bueno o malo
  const isGood = (isHigherBetter && isAboveTarget) || (!isHigherBetter && isBelowTarget);
  const isBad = (isHigherBetter && isBelowTarget) || (!isHigherBetter && isAboveTarget);
  
  return (
    <span 
      className={cn(
        "text-sm font-medium",
        isGood ? "text-green-600" : "",
        isBad ? "text-red-600" : "",
        !isGood && !isBad ? "text-gray-500" : "", // Si es igual a la meta, color neutral
        className
      )}
    >
      {showPercentage ? `${value.toFixed(2)}%` : value.toLocaleString()}
    </span>
  );
} 
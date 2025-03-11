import React from 'react';
import { cn } from '@/lib/utils';

interface MetricValueProps {
  value: string | number;
  numericValue?: number;
  target?: number;
  isHigherBetter?: boolean;
  className?: string;
}

export function MetricValue({ 
  value, 
  numericValue, 
  target, 
  isHigherBetter = true,
  className 
}: MetricValueProps) {
  // Si no hay valor numérico o meta, o si no se puede comparar, mostrar sin color especial
  if (numericValue === undefined || target === undefined) {
    return <div className={cn("text-2xl font-bold", className)}>{value}</div>;
  }

  // Determinar si el valor está por encima o por debajo de la meta
  const isAboveTarget = numericValue > target;
  const isBelowTarget = numericValue < target;
  
  // Determinar si el rendimiento es bueno o malo
  const isGood = (isHigherBetter && isAboveTarget) || (!isHigherBetter && isBelowTarget);
  const isBad = (isHigherBetter && isBelowTarget) || (!isHigherBetter && isAboveTarget);
  
  return (
    <div 
      className={cn(
        "text-2xl font-bold",
        isGood ? "text-green-600" : "",
        isBad ? "text-red-600" : "",
        !isGood && !isBad ? "text-gray-900" : "", // Si es igual a la meta, color neutral
        className
      )}
    >
      {value}
    </div>
  );
} 
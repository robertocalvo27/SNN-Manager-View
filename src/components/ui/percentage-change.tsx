import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PercentageChangeProps {
  value: number;
  // Para algunos indicadores como downtime, un valor negativo es positivo (menos downtime es mejor)
  invertColors?: boolean;
  className?: string;
}

export function PercentageChange({ 
  value, 
  invertColors = false,
  className 
}: PercentageChangeProps) {
  const isPositive = invertColors ? value < 0 : value > 0;
  const isNegative = invertColors ? value > 0 : value < 0;
  const absValue = Math.abs(value);
  
  return (
    <div 
      className={cn(
        "flex items-center text-xs font-medium",
        isPositive ? "text-green-600" : "",
        isNegative ? "text-red-600" : "",
        value === 0 ? "text-gray-500" : "",
        className
      )}
    >
      {isPositive && <ArrowUpIcon className="h-3 w-3 mr-1" />}
      {isNegative && <ArrowDownIcon className="h-3 w-3 mr-1" />}
      {absValue.toFixed(2)}%
    </div>
  );
} 
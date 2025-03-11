import React, { ReactElement } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartDefinition } from '@/lib/data/chartDefinitions';
import { cn } from "@/lib/utils";

interface DynamicChartProps {
  chartDefinition: ChartDefinition;
  data: any[];
  xAxisConfig: any;
  yAxisConfig: any;
  onRemove: () => void;
  className?: string;
}

export function DynamicChart({ 
  chartDefinition, 
  data, 
  xAxisConfig, 
  yAxisConfig, 
  onRemove,
  className 
}: DynamicChartProps) {
  const renderChart = (): ReactElement => {
    switch (chartDefinition.type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis {...xAxisConfig} />
            <YAxis {...yAxisConfig} />
            <Tooltip />
            <Legend />
            {chartDefinition.series.map((serie, i) => (
              <Line
                key={i}
                type="monotone"
                dataKey={serie.key}
                stroke={serie.color}
                name={serie.name}
                strokeDasharray={serie.strokeDasharray}
              />
            ))}
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis {...xAxisConfig} />
            <YAxis {...yAxisConfig} />
            <Tooltip />
            <Legend />
            {chartDefinition.series.map((serie, i) => (
              <Bar
                key={i}
                dataKey={serie.key}
                fill={serie.color}
                name={serie.name}
              />
            ))}
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis {...xAxisConfig} />
            <YAxis {...yAxisConfig} />
            <Tooltip />
            <Legend />
            {chartDefinition.series.map((serie, i) => (
              <Area
                key={i}
                type="monotone"
                dataKey={serie.key}
                fill={serie.color}
                stroke={serie.color}
                name={serie.name}
              />
            ))}
          </AreaChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Tooltip />
            <Legend />
            {chartDefinition.series.map((serie, i) => (
              <Pie
                key={i}
                data={data}
                dataKey={serie.key}
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill={serie.color}
                label
                name={serie.name}
              />
            ))}
          </PieChart>
        );
      default:
        // Fallback para evitar retornar null
        return <div className="text-center p-4">Gráfico no disponible</div>;
    }
  };

  // Determinar la altura del gráfico
  const chartHeight = chartDefinition.height || 300;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base">{chartDefinition.title}</CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={onRemove}
          title="Quitar gráfico"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="w-full" style={{ height: `${chartHeight}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 
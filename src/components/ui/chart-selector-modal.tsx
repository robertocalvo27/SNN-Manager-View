import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BarChart3, Plus } from "lucide-react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartDefinition } from '@/lib/data/chartDefinitions';

interface ChartSelectorModalProps {
  data: any[];
  xAxisConfig: any;
  yAxisConfig: any;
  availableCharts: ChartDefinition[];
  selectedChartIds: string[];
  onChartSelectionChange: (chartIds: string[]) => void;
}

export function ChartSelectorModal({ 
  data, 
  xAxisConfig, 
  yAxisConfig, 
  availableCharts,
  selectedChartIds,
  onChartSelectionChange
}: ChartSelectorModalProps) {
  const [localSelectedCharts, setLocalSelectedCharts] = React.useState<string[]>(selectedChartIds);

  // Actualizar la selección local cuando cambian las props
  React.useEffect(() => {
    setLocalSelectedCharts(selectedChartIds);
  }, [selectedChartIds]);

  const handleChartToggle = (chartId: string) => {
    setLocalSelectedCharts(prev => {
      if (prev.includes(chartId)) {
        return prev.filter(id => id !== chartId);
      } else {
        return [...prev, chartId];
      }
    });
  };

  const handleApplySelection = () => {
    onChartSelectionChange(localSelectedCharts);
  };

  // Renderizar una vista previa del gráfico
  const renderChartPreview = (chart: ChartDefinition) => {
    switch (chart.type) {
      case 'line':
        return (
          <LineChart data={data.slice(0, 3)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis {...xAxisConfig} />
            <YAxis {...yAxisConfig} />
            {chart.series.map((serie, i) => (
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
          <BarChart data={data.slice(0, 3)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis {...xAxisConfig} />
            <YAxis {...yAxisConfig} />
            {chart.series.map((serie, i) => (
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
          <AreaChart data={data.slice(0, 3)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis {...xAxisConfig} />
            <YAxis {...yAxisConfig} />
            {chart.series.map((serie, i) => (
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
            {chart.series.map((serie, i) => (
              <Pie
                key={i}
                data={data.slice(0, 3)}
                dataKey={serie.key}
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill={serie.color}
                label
                name={serie.name}
              />
            ))}
          </PieChart>
        );
      default:
        return <div className="text-center p-4">Vista previa no disponible</div>;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Ver más gráficos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Seleccionar Gráficos</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-120px)]">
          <div className="grid grid-cols-2 gap-6 p-6">
            {availableCharts.map((chart) => (
              <Card key={chart.id} className={`overflow-hidden transition-all ${localSelectedCharts.includes(chart.id) ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{chart.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`chart-${chart.id}`} 
                        checked={localSelectedCharts.includes(chart.id)}
                        onCheckedChange={() => handleChartToggle(chart.id)}
                      />
                      <Label htmlFor={`chart-${chart.id}`}>Mostrar</Label>
                    </div>
                  </div>
                  {chart.description && (
                    <CardDescription>{chart.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="h-[150px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      {renderChartPreview(chart)}
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => setLocalSelectedCharts(selectedChartIds)}>
            Cancelar
          </Button>
          <Button onClick={handleApplySelection}>
            Aplicar Cambios
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
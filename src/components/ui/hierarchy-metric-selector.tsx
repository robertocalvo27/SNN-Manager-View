import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart3, ChevronDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export interface HierarchyMetric {
  id: string;
  label: string;
  icon: React.ReactNode;
  isHigherBetter: boolean;
  target?: number;
}

interface HierarchyMetricSelectorProps {
  metrics: HierarchyMetric[];
  selectedMetric: string;
  onMetricChange: (metricId: string) => void;
}

export function HierarchyMetricSelector({
  metrics,
  selectedMetric,
  onMetricChange,
}: HierarchyMetricSelectorProps) {
  const selectedMetricObj = metrics.find(m => m.id === selectedMetric);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-2">
            {selectedMetricObj?.icon}
            <span>{selectedMetricObj?.label || 'Seleccionar métrica'}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="start">
        <div className="space-y-4">
          <h4 className="font-medium leading-none">Métrica a visualizar</h4>
          <p className="text-sm text-muted-foreground">
            Selecciona la métrica que deseas ver en la jerarquía.
          </p>
          <ScrollArea className="h-[200px] pr-4">
            <RadioGroup 
              value={selectedMetric} 
              onValueChange={onMetricChange}
              className="space-y-2"
            >
              {metrics.map((metric) => (
                <div key={metric.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={metric.id} id={`metric-${metric.id}`} />
                  <Label 
                    htmlFor={`metric-${metric.id}`}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    {metric.icon}
                    {metric.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
} 
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
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3 } from "lucide-react";

interface ChartModalProps {
  data: any[];
  xAxisConfig: any;
  yAxisConfig: any;
}

export function ChartModal({ data, xAxisConfig, yAxisConfig }: ChartModalProps) {
  const additionalCharts = [
    {
      title: "Horas Pagadas vs Ganadas",
      type: "bar",
      height: 300,
      series: [
        { key: "paidHours", name: "Horas Pagadas", color: "#10b981" },
        { key: "earnedHours", name: "Horas Ganadas", color: "#6366f1" }
      ]
    },
    {
      title: "Comparativa de Downtime",
      type: "bar",
      height: 300,
      series: [
        { key: "downtime", name: "Downtime Total", color: "#f43f5e" },
        { key: "netDowntime", name: "Downtime Neto", color: "#eab308" }
      ]
    },
    {
      title: "Tendencia de Producción",
      type: "line",
      height: 300,
      series: [
        { key: "production", name: "Producción Real", color: "#10b981" },
        { key: "productionTarget", name: "Meta", color: "#6366f1" }
      ]
    }
  ];

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
          <DialogTitle>Gráficos Adicionales</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-120px)]">
          <div className="grid grid-cols-2 gap-6 p-6">
            {additionalCharts.map((chart, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-medium">{chart.title}</h3>
                <div className="rounded-lg border p-4">
                  <ResponsiveContainer width="100%" height={chart.height}>
                    {chart.type === "line" ? (
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis {...xAxisConfig} />
                        <YAxis {...yAxisConfig} />
                        <Tooltip />
                        <Legend />
                        {chart.series.map((serie, i) => (
                          <Line
                            key={i}
                            type="monotone"
                            dataKey={serie.key}
                            stroke={serie.color}
                            name={serie.name}
                          />
                        ))}
                      </LineChart>
                    ) : (
                      <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis {...xAxisConfig} />
                        <YAxis {...yAxisConfig} />
                        <Tooltip />
                        <Legend />
                        {chart.series.map((serie, i) => (
                          <Bar
                            key={i}
                            dataKey={serie.key}
                            fill={serie.color}
                            name={serie.name}
                          />
                        ))}
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
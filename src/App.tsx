import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MultiSelect } from "@/components/ui/multi-select";
import { DateRangeSelect } from "@/components/ui/date-range-select";
import { StatsCardSelector } from "@/components/ui/stats-card-selector";
import { ChartModal } from "@/components/ui/chart-modal";
import { PercentageChange } from "@/components/ui/percentage-change";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { 
  Factory, 
  TrendingUp, 
  Clock, 
  DollarSign,
  ChevronRight,
  ChevronDown,
  BarChart3,
  Table as TableIcon,
  TreePine,
  SlidersHorizontal,
  Download,
  Timer,
  TimerOff,
  Clock4,
  X,
  Settings2,
  BarChart2,
  ArrowLeftRight
} from 'lucide-react';

// Importar tipos y datos desde archivos separados
import { Option, ValueStream, ProductionLine, ComparisonPeriod } from "@/types/common";
import { valueStreamData, getFilteredLines } from "@/lib/data/valueStreams";
import { shiftOptions } from "@/lib/data/shifts";
import { applyComparisonData } from "@/lib/data/comparisonData";

// Datos de ejemplo actualizados con todos los value streams
const valueStreams = [
  {
    name: "Sports Medicine",
    efficiency: 238.71,
    target: 90,
    production: 45516,
    productionTarget: 57286,
    downtime: 9451.88,
    paidHours: 12500,
    earnedHours: 15600,
    netDowntime: 8200,
    realDowntime: 9451.88,
    lines: [
      { name: "L09", efficiency: 244.46, production: 45516 },
      { name: "L10", efficiency: 215.32, production: 38925 }
    ]
  },
  {
    name: "Joint Repair",
    efficiency: 195.32,
    target: 90,
    production: 38925,
    productionTarget: 42000,
    downtime: 7245.33,
    lines: [
      { name: "L11", efficiency: 198.45, production: 39876 }
    ]
  },
  {
    name: "ENT",
    efficiency: 178.45,
    target: 90,
    production: 32456,
    productionTarget: 35000,
    downtime: 5678.90,
    lines: [
      { name: "L12", efficiency: 182.34, production: 33456 }
    ]
  },
  {
    name: "Fixation",
    efficiency: 205.67,
    target: 90,
    production: 41234,
    productionTarget: 44000,
    downtime: 6789.12,
    lines: [
      { name: "L13", efficiency: 208.90, production: 42123 }
    ]
  },
  {
    name: "Apolo",
    efficiency: 167.89,
    target: 90,
    production: 28765,
    productionTarget: 31000,
    downtime: 4567.89,
    lines: [
      { name: "L14", efficiency: 170.23, production: 29876 }
    ]
  },
  {
    name: "External Areas",
    efficiency: 189.34,
    target: 90,
    production: 35678,
    productionTarget: 38000,
    downtime: 5432.10,
    lines: [
      { name: "L15", efficiency: 192.45, production: 36789 }
    ]
  },
  {
    name: "Wound",
    efficiency: 156.78,
    target: 90,
    production: 25432,
    productionTarget: 28000,
    downtime: 3456.78,
    lines: [
      { name: "L16", efficiency: 159.89, production: 26543 }
    ]
  }
];

// Estadísticas disponibles
const availableStats = [
  {
    id: "efficiency",
    title: "Eficiencia",
    value: "238.71%",
    description: "Meta: 90%",
    icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />
  },
  {
    id: "production",
    title: "Producción",
    value: "45,516",
    description: "Meta: 57,286",
    icon: <Factory className="h-4 w-4 text-muted-foreground" />
  },
  {
    id: "downtime",
    title: "Downtime",
    value: "9,451.88 min",
    description: "157.53 horas",
    icon: <Clock className="h-4 w-4 text-muted-foreground" />
  },
  {
    id: "absorption",
    title: "Absorción",
    value: "124.8%",
    description: "Horas ganadas vs pagadas",
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />
  },
  {
    id: "paidHours",
    title: "Horas Pagadas",
    value: "12,500",
    description: "Total de horas pagadas",
    icon: <Timer className="h-4 w-4 text-muted-foreground" />
  },
  {
    id: "earnedHours",
    title: "Horas Ganadas",
    value: "15,600",
    description: "Total de horas ganadas",
    icon: <TimerOff className="h-4 w-4 text-muted-foreground" />
  },
  {
    id: "netDowntime",
    title: "Downtime Neto",
    value: "8,200 min",
    description: "136.67 horas",
    icon: <Clock4 className="h-4 w-4 text-muted-foreground" />
  }
];

function App() {
  const [expandedStream, setExpandedStream] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<string>("tree");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [comparisonPeriod, setComparisonPeriod] = useState<ComparisonPeriod>("none");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("day"); // 'day', 'week', 'month'
  
  // Multi-select states
  const [selectedValueStreams, setSelectedValueStreams] = useState<Option[]>([]);
  const [selectedLines, setSelectedLines] = useState<Option[]>([]);
  const [selectedShifts, setSelectedShifts] = useState<Option[]>([]);

  // Stats card selection state
  const [selectedStats, setSelectedStats] = useState<string[]>([
    "efficiency",
    "production",
    "downtime",
    "absorption"
  ]);

  // Filtrar líneas basadas en los Value Streams seleccionados
  const [filteredLineOptions, setFilteredLineOptions] = useState<Option[]>(getFilteredLines([]));

  // Actualizar las líneas disponibles cuando cambian los Value Streams seleccionados
  useEffect(() => {
    const filteredLines = getFilteredLines(selectedValueStreams);
    setFilteredLineOptions(filteredLines);
    
    // Filtrar las líneas seleccionadas para mantener solo las que están disponibles
    const availableLineValues = new Set(filteredLines.map(line => line.value));
    const updatedSelectedLines = selectedLines.filter(line => 
      availableLineValues.has(line.value)
    );
    
    // Actualizar las líneas seleccionadas si hay cambios
    if (updatedSelectedLines.length !== selectedLines.length) {
      setSelectedLines(updatedSelectedLines);
    }
  }, [selectedValueStreams]);

  // Función para alternar el período de comparación
  const toggleComparison = () => {
    // Si no hay comparación activa, establecer según el rango de fecha seleccionado
    if (comparisonPeriod === "none") {
      setComparisonPeriod(selectedDateRange as ComparisonPeriod);
    } else {
      // Si ya hay una comparación activa, desactivarla
      setComparisonPeriod("none");
    }
  };

  // Función para manejar el cambio en el rango de fechas
  const handleDateRangeChange = (range: any) => {
    console.log('Date range changed:', range);
    // Actualizar el rango de fechas seleccionado
    if (range.preset) {
      setSelectedDateRange(range.preset);
      // Si hay una comparación activa, actualizarla según el nuevo rango
      if (comparisonPeriod !== "none") {
        setComparisonPeriod(range.preset as ComparisonPeriod);
      }
    }
  };

  // Common chart axis configuration
  const xAxisConfig = {
    dataKey: "name",
    height: 60,
    tick: { angle: -45, textAnchor: 'end', dominantBaseline: 'ideographic' },
    tickMargin: 20
  };

  const yAxisConfig = {
    width: 80
  };

  // Aplicar datos de comparación a las estadísticas si es necesario
  const statsWithComparison = applyComparisonData(
    availableStats, 
    comparisonPeriod === "none" ? "none" : (comparisonPeriod as 'day' | 'week' | 'month')
  );
  
  const visibleStats = statsWithComparison.filter(stat => selectedStats.includes(stat.id));

  // Determinar el texto del período de comparación
  const getComparisonText = () => {
    switch (comparisonPeriod) {
      case "day":
        return "vs Ayer";
      case "week":
        return "vs Semana Anterior";
      case "month":
        return "vs Mes Anterior";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Encabezado del Dashboard */}
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard de Gerencia</h1>
              <p className="text-sm text-gray-500">Vista general de todos los indicadores</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="p-4">
          <Tabs defaultValue="tree" onValueChange={setActiveView}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="tree" className="flex items-center gap-2">
                <TreePine className="h-4 w-4" />
                Jerárquica
              </TabsTrigger>
              <TabsTrigger value="metrics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Métricas
              </TabsTrigger>
              <TabsTrigger value="table" className="flex items-center gap-2">
                <TableIcon className="h-4 w-4" />
                Tabla
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Filtros - Mostrar/Ocultar */}
      {showFilters && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
              </CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => setShowFilters(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Value Stream</label>
                <MultiSelect
                  options={valueStreamData}
                  value={selectedValueStreams}
                  onChange={setSelectedValueStreams}
                  placeholder="Seleccionar Value Streams"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Línea</label>
                <MultiSelect
                  options={filteredLineOptions}
                  value={selectedLines}
                  onChange={setSelectedLines}
                  placeholder="Seleccionar Líneas"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Turno</label>
                <MultiSelect
                  options={shiftOptions}
                  value={selectedShifts}
                  onChange={setSelectedShifts}
                  placeholder="Seleccionar Turnos"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Rango de Fechas</label>
                <DateRangeSelect
                  onRangeChange={handleDateRangeChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* KPIs Generales */}
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Métricas Principales</h2>
          <div className="flex items-center gap-2">
            <Button 
              variant={comparisonPeriod !== "none" ? "default" : "outline"}
              size="sm" 
              className="flex items-center gap-1"
              onClick={toggleComparison}
            >
              <ArrowLeftRight className="h-4 w-4" />
              {comparisonPeriod === "none" ? "Comparar" : "Comparando"}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => {
                // Este botón solo sirve como indicador visual
                // La funcionalidad real está en el StatsCardSelector
                const selectorButton = document.querySelector('[data-stats-selector-trigger]');
                if (selectorButton instanceof HTMLElement) {
                  selectorButton.click();
                }
              }}
            >
              <Settings2 className="h-4 w-4" />
              Configurar Métricas
            </Button>
          </div>
        </div>
        <div className="absolute right-2 top-12 z-10">
          <StatsCardSelector
            availableCards={availableStats}
            selectedCards={selectedStats}
            onSelectionChange={setSelectedStats}
            triggerProps={{ 'data-stats-selector-trigger': true }}
          />
        </div>
        
        {/* Texto de comparación */}
        {comparisonPeriod !== "none" && (
          <div className="mb-2 text-sm font-medium text-gray-500 flex items-center">
            <BarChart2 className="h-4 w-4 mr-1" />
            Comparando con: {getComparisonText()}
          </div>
        )}
        
        <div className="grid grid-cols-4 gap-4">
          {visibleStats.map(stat => (
            <Card key={stat.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                  
                  {/* Mostrar cambio porcentual si hay comparación */}
                  {comparisonPeriod !== "none" && stat.percentageChange !== undefined && (
                    <div className="flex flex-col items-end">
                      <PercentageChange 
                        value={stat.percentageChange} 
                        invertColors={stat.id === "downtime" || stat.id === "netDowntime"}
                      />
                      <span className="text-xs text-gray-500">{stat.previousValue}</span>
                    </div>
                  )}
                </div>
                
                {stat.id === 'efficiency' && (
                  <div className="mt-4 h-2 w-full bg-secondary">
                    <div 
                      className="h-2 bg-primary" 
                      style={{ width: `${Math.min(238.71, 100)}%` }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Tabs value={activeView} defaultValue="tree">
        <TabsContent value="tree" className="mt-0">
          <div className="grid grid-cols-12 gap-6">
            {/* Árbol Jerárquico */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Jerarquía de Producción</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <button className="w-full flex items-center justify-between p-2 bg-accent rounded-md">
                        <div className="flex items-center gap-2">
                          <Factory className="h-4 w-4" />
                          <span className="font-medium">Planta Costa Rica</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      <div className="ml-6 space-y-2">
                        {valueStreams.map((stream) => (
                          <div key={stream.name} className="space-y-2">
                            <button
                              onClick={() => setExpandedStream(stream.name === expandedStream ? null : stream.name)}
                              className="w-full flex items-center justify-between p-2 hover:bg-accent rounded-md"
                            >
                              <div className="flex items-center gap-2">
                                <Factory className="h-4 w-4" />
                                <span>{stream.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">{stream.efficiency}%</span>
                                {expandedStream === stream.name ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </div>
                            </button>
                            
                            {expandedStream === stream.name && (
                              <div className="ml-6 space-y-2">
                                {stream.lines.map((line) => (
                                  <div key={line.name} className="flex items-center justify-between p-2 text-sm">
                                    <div className="flex items-center gap-2">
                                      <BarChart3 className="h-4 w-4" />
                                      <span>{line.name}</span>
                                    </div>
                                    <span className="text-muted-foreground">{line.efficiency}%</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Gráficos y Métricas */}
            <div className="col-span-8 space-y-6">
              <div className="flex justify-between items-center">
                <CardTitle>Gráficos de Rendimiento</CardTitle>
                <ChartModal
                  data={valueStreams}
                  xAxisConfig={xAxisConfig}
                  yAxisConfig={yAxisConfig}
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Tendencia de Eficiencia por Value Stream</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={valueStreams}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis {...xAxisConfig} />
                      <YAxis {...yAxisConfig} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="efficiency" 
                        stroke="#10b981" 
                        name="Eficiencia Real"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="#6366f1" 
                        name="Meta"
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Producción por Value Stream</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={valueStreams}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis {...xAxisConfig} />
                        <YAxis {...yAxisConfig} />
                        <Tooltip />
                        <Bar dataKey="production" fill="#10b981" name="Producción Real" />
                        <Bar dataKey="productionTarget" fill="#6366f1" name="Meta" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Distribución de Downtime</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={valueStreams}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis {...xAxisConfig} />
                        <YAxis {...yAxisConfig} />
                        <Tooltip />
                        <Bar dataKey="downtime" fill="#f43f5e" name="Downtime (min)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="table" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Vista Detallada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Value Stream</TableHead>
                      <TableHead>Línea</TableHead>
                      <TableHead className="text-right">Eficiencia Real</TableHead>
                      <TableHead className="text-right">Meta</TableHead>
                      <TableHead className="text-right">Producción</TableHead>
                      <TableHead className="text-right">Meta Producción</TableHead>
                      <TableHead className="text-right">Downtime (min)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {valueStreams.flatMap(stream => [
                      <TableRow key={stream.name} className="bg-muted/50">
                        <TableCell className="font-medium">{stream.name}</TableCell>
                        <TableCell>Todas</TableCell>
                        <TableCell className="text-right">{stream.efficiency}%</TableCell>
                        <TableCell className="text-right">{stream.target}%</TableCell>
                        <TableCell className="text-right">{stream.production}</TableCell>
                        <TableCell className="text-right">{stream.productionTarget}</TableCell>
                        <TableCell className="text-right">{stream.downtime}</TableCell>
                      </TableRow>,
                      ...stream.lines.map(line => (
                        <TableRow key={`${stream.name}-${line.name}`}>
                          <TableCell className="text-muted-foreground">{stream.name}</TableCell>
                          <TableCell>{line.name}</TableCell>
                          <TableCell className="text-right">{line.efficiency}%</TableCell>
                          <TableCell className="text-right">{stream.target}%</TableCell>
                          <TableCell className="text-right">{line.production}</TableCell>
                          <TableCell className="text-right">-</TableCell>
                          <TableCell className="text-right">-</TableCell>
                        </TableRow>
                      ))
                    ])}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
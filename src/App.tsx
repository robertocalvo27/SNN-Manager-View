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
  X
} from 'lucide-react';

// Datos de Value Streams y Líneas de Producción desde el CSV
const valueStreamData = [
  { value: "APOLLO", label: "APOLLO" },
  { value: "ENT", label: "ENT" },
  { value: "EXTERNAS", label: "EXTERNAS" },
  { value: "FIXATION", label: "FIXATION" },
  { value: "JOINT REPAIR", label: "JOINT REPAIR" },
  { value: "SPM", label: "SPM" },
  { value: "WOUND", label: "WOUND" }
];

const lineaProduccionData = [
  { value: "Auto BB", label: "Auto BB" },
  { value: "BB Manual", label: "BB Manual" },
  { value: "Banda 1", label: "Banda 1" },
  { value: "Banda 2", label: "Banda 2" },
  { value: "Celda 4", label: "Celda 4" },
  { value: "Celda 5", label: "Celda 5" },
  { value: "Celda 6", label: "Celda 6" },
  { value: "Celda 7", label: "Celda 7" },
  { value: "Celda 8", label: "Celda 8" },
  { value: "Cer 3", label: "Cer 3" },
  { value: "Corte", label: "Corte" },
  { value: "Flow", label: "Flow" },
  { value: "GAL", label: "GAL" },
  { value: "HASS", label: "HASS" },
  { value: "L03", label: "L03" },
  { value: "L04", label: "L04" },
  { value: "L05", label: "L05" },
  { value: "L06", label: "L06" },
  { value: "L07", label: "L07" },
  { value: "L08 celda 1", label: "L08 celda 1" },
  { value: "L08 celda 10", label: "L08 celda 10" },
  { value: "L08 celda 12", label: "L08 celda 12" },
  { value: "L08 celda 13", label: "L08 celda 13" },
  { value: "L08 celda 14", label: "L08 celda 14" },
  { value: "L08 celda 3", label: "L08 celda 3" },
  { value: "L08 celda 4", label: "L08 celda 4" },
  { value: "L08 celda 5", label: "L08 celda 5" },
  { value: "L08 celda 6", label: "L08 celda 6" },
  { value: "L08 celda 7", label: "L08 celda 7" },
  { value: "L08 celda 8", label: "L08 celda 8" },
  { value: "L09", label: "L09" },
  { value: "L12", label: "L12" },
  { value: "L13", label: "L13" },
  { value: "L14", label: "L14" },
  { value: "L14.5", label: "L14.5" },
  { value: "Lavado Opus", label: "Lavado Opus" },
  { value: "Lavado de Qfix", label: "Lavado de Qfix" },
  { value: "Marking", label: "Marking" },
  { value: "Micromolding", label: "Micromolding" },
  { value: "Moldeadora 1", label: "Moldeadora 1" },
  { value: "Multiwires", label: "Multiwires" },
  { value: "Opus laser 1", label: "Opus laser 1" },
  { value: "Opus laser 2", label: "Opus laser 2" },
  { value: "Opus laser 3", label: "Opus laser 3" },
  { value: "Opus laser 4", label: "Opus laser 4" },
  { value: "Pico", label: "Pico" },
  { value: "Plug Assy", label: "Plug Assy" },
  { value: "Returnos-Celda", label: "Returnos-Celda" },
  { value: "Returns-Cocinado", label: "Returns-Cocinado" },
  { value: "Returns-Corte", label: "Returns-Corte" },
  { value: "Returns-Soldadura", label: "Returns-Soldadura" },
  { value: "TIC", label: "TIC" },
  { value: "Torno 1", label: "Torno 1" },
  { value: "Torno 2", label: "Torno 2" },
  { value: "Torno 3", label: "Torno 3" },
  { value: "Torno 4", label: "Torno 4" },
  { value: "Torno 5", label: "Torno 5" },
  { value: "Torno 6", label: "Torno 6" },
  { value: "Triming", label: "Triming" },
  { value: "Welding", label: "Welding" },
  { value: "Whiteroom 1", label: "Whiteroom 1" },
  { value: "Whiteroom 2", label: "Whiteroom 2" },
  { value: "Whiteroom 3", label: "Whiteroom 3" },
  { value: "ambient", label: "ambient" },
  { value: "mangueras", label: "mangueras" },
  { value: "termocuples", label: "termocuples" }
];

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

interface Option {
  label: string;
  value: string;
}

const availableStats = [
  {
    id: "efficiency",
    title: "Eficiencia Global",
    icon: <TrendingUp className="h-4 w-4" />,
    value: "238.71%",
    description: "vs. Meta 90%"
  },
  {
    id: "production",
    title: "Producción Total",
    icon: <Factory className="h-4 w-4" />,
    value: "248,006",
    description: "Meta: 275,286"
  },
  {
    id: "downtime",
    title: "Downtime",
    icon: <Clock className="h-4 w-4" />,
    value: "42,622 min",
    description: "Promedio: 6,089 min/VS"
  },
  {
    id: "absorption",
    title: "Absorción",
    icon: <DollarSign className="h-4 w-4" />,
    value: "$847,320",
    description: "42,366 horas × $20/h"
  },
  {
    id: "paidHours",
    title: "Horas Pagadas",
    icon: <Timer className="h-4 w-4" />,
    value: "42,366",
    description: "Total acumulado"
  },
  {
    id: "earnedHours",
    title: "Horas Ganadas",
    icon: <Clock4 className="h-4 w-4" />,
    value: "52,958",
    description: "+10,592 vs pagadas"
  },
  {
    id: "netDowntime",
    title: "Downtime Neto",
    icon: <TimerOff className="h-4 w-4" />,
    value: "28,415 min",
    description: "67% del downtime total"
  }
];

function App() {
  const [expandedStream, setExpandedStream] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<string>("tree");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
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

  // Options for multi-selects
  const valueStreamOptions = valueStreamData;
  const lineOptions = lineaProduccionData;

  const shiftOptions = [
    { label: 'Turno 1', value: '1' },
    { label: 'Turno 2', value: '2' },
    { label: 'Turno 3', value: '3' }
  ];

  // Filtrar líneas basadas en los Value Streams seleccionados
  const [filteredLineOptions, setFilteredLineOptions] = useState<Option[]>(lineOptions);

  // Actualizar las líneas disponibles cuando cambian los Value Streams seleccionados
  useEffect(() => {
    // Aquí se implementaría la lógica para filtrar las líneas según los Value Streams seleccionados
    // Por ahora, mostramos todas las líneas
    setFilteredLineOptions(lineOptions);
  }, [selectedValueStreams]);

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

  const visibleStats = availableStats.filter(stat => selectedStats.includes(stat.id));

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
                  options={valueStreamOptions}
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
                  onRangeChange={(range) => console.log('Date range changed:', range)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* KPIs Generales */}
      <div className="relative">
        <div className="absolute right-2 top-2 z-10">
          <StatsCardSelector
            availableCards={availableStats}
            selectedCards={selectedStats}
            onSelectionChange={setSelectedStats}
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {visibleStats.map(stat => (
            <Card key={stat.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
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
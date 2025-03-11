import { Option } from "@/types/common";

// Datos de Value Streams desde el CSV
export const valueStreamData: Option[] = [
  { value: "APOLLO", label: "APOLLO" },
  { value: "ENT", label: "ENT" },
  { value: "EXTERNAS", label: "EXTERNAS" },
  { value: "FIXATION", label: "FIXATION" },
  { value: "JOINT REPAIR", label: "JOINT REPAIR" },
  { value: "SPM", label: "SPM" },
  { value: "WOUND", label: "WOUND" }
];

// Mapeo de Value Streams a sus líneas de producción
export const valueStreamToLines: Record<string, Option[]> = {
  "APOLLO": [
    { value: "L03", label: "L03" },
    { value: "L04", label: "L04" },
    { value: "L05", label: "L05" }
  ],
  "ENT": [
    { value: "L06", label: "L06" },
    { value: "L07", label: "L07" },
    { value: "L09", label: "L09" }
  ],
  "EXTERNAS": [
    { value: "Corte", label: "Corte" },
    { value: "Welding", label: "Welding" },
    { value: "Triming", label: "Triming" }
  ],
  "FIXATION": [
    { value: "L12", label: "L12" },
    { value: "L13", label: "L13" },
    { value: "L14", label: "L14" },
    { value: "L14.5", label: "L14.5" }
  ],
  "JOINT REPAIR": [
    { value: "L08 celda 1", label: "L08 celda 1" },
    { value: "L08 celda 3", label: "L08 celda 3" },
    { value: "L08 celda 4", label: "L08 celda 4" },
    { value: "L08 celda 5", label: "L08 celda 5" },
    { value: "L08 celda 6", label: "L08 celda 6" },
    { value: "L08 celda 7", label: "L08 celda 7" },
    { value: "L08 celda 8", label: "L08 celda 8" },
    { value: "L08 celda 10", label: "L08 celda 10" },
    { value: "L08 celda 12", label: "L08 celda 12" },
    { value: "L08 celda 13", label: "L08 celda 13" },
    { value: "L08 celda 14", label: "L08 celda 14" }
  ],
  "SPM": [
    { value: "Auto BB", label: "Auto BB" },
    { value: "BB Manual", label: "BB Manual" },
    { value: "Banda 1", label: "Banda 1" },
    { value: "Banda 2", label: "Banda 2" },
    { value: "Celda 4", label: "Celda 4" },
    { value: "Celda 5", label: "Celda 5" },
    { value: "Celda 6", label: "Celda 6" },
    { value: "Celda 7", label: "Celda 7" },
    { value: "Celda 8", label: "Celda 8" }
  ],
  "WOUND": [
    { value: "Cer 3", label: "Cer 3" },
    { value: "Flow", label: "Flow" },
    { value: "GAL", label: "GAL" },
    { value: "HASS", label: "HASS" },
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
    { value: "Whiteroom 1", label: "Whiteroom 1" },
    { value: "Whiteroom 2", label: "Whiteroom 2" },
    { value: "Whiteroom 3", label: "Whiteroom 3" },
    { value: "ambient", label: "ambient" },
    { value: "mangueras", label: "mangueras" },
    { value: "termocuples", label: "termocuples" }
  ]
};

// Función para obtener todas las líneas de producción
export const getAllLines = (): Option[] => {
  return Object.values(valueStreamToLines).flat();
};

// Función para obtener líneas de producción filtradas por Value Streams seleccionados
export const getFilteredLines = (selectedValueStreams: Option[]): Option[] => {
  if (selectedValueStreams.length === 0) {
    return getAllLines();
  }
  
  const selectedValues = selectedValueStreams.map(vs => vs.value);
  const filteredLines: Option[] = [];
  
  selectedValues.forEach(value => {
    if (valueStreamToLines[value]) {
      filteredLines.push(...valueStreamToLines[value]);
    }
  });
  
  // Eliminar duplicados si hay líneas que pertenecen a múltiples Value Streams
  return filteredLines.filter((line, index, self) => 
    index === self.findIndex(l => l.value === line.value)
  );
}; 
import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateRangeSelectProps {
  onRangeChange: (range: DateRange) => void;
}

const presetRanges = [
  { label: 'Hoy', value: 'today' },
  { label: 'Ayer', value: 'yesterday' },
  { label: 'Esta semana', value: 'thisWeek' },
  { label: 'Este mes', value: 'thisMonth' },
  { label: 'Year to Date', value: 'ytd' },
  { label: 'Personalizado', value: 'custom' }
];

export function DateRangeSelect({ onRangeChange }: DateRangeSelectProps) {
  const [date, setDate] = React.useState<DateRange>({ from: undefined, to: undefined });
  const [preset, setPreset] = React.useState('today');
  const [isOpen, setIsOpen] = React.useState(false);

  const handlePresetChange = (value: string) => {
    setPreset(value);
    const now = new Date();
    let newRange: DateRange = { from: undefined, to: undefined };

    switch (value) {
      case 'today':
        newRange = { from: now, to: now };
        break;
      case 'yesterday':
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        newRange = { from: yesterday, to: yesterday };
        break;
      case 'thisWeek':
        const monday = new Date(now);
        monday.setDate(monday.getDate() - monday.getDay() + 1);
        newRange = { from: monday, to: now };
        break;
      case 'thisMonth':
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        newRange = { from: firstDay, to: now };
        break;
      case 'ytd':
        const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
        newRange = { from: firstDayOfYear, to: now };
        break;
      case 'custom':
        return; // Don't update the range for custom selection
    }

    setDate(newRange);
    onRangeChange(newRange);
    if (value !== 'custom') setIsOpen(false);
  };

  const formatDateRange = () => {
    if (!date.from) return "Seleccionar fechas";
    if (!date.to) return format(date.from, 'PP', { locale: es });
    if (date.from === date.to) return format(date.from, 'PP', { locale: es });
    return `${format(date.from, 'PP', { locale: es })} - ${format(date.to, 'PP', { locale: es })}`;
  };

  return (
    <div className="flex gap-2">
      <Select value={preset} onValueChange={handlePresetChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccionar período" />
        </SelectTrigger>
        <SelectContent>
          {presetRanges.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-[280px] justify-start text-left font-normal ${!date.from && "text-muted-foreground"}`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date.from}
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate || { from: undefined, to: undefined });
              if (newDate?.from && newDate?.to) {
                onRangeChange(newDate);
                setIsOpen(false);
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
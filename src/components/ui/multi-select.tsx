import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  placeholder?: string;
}

export function MultiSelect({ options, value, onChange, placeholder }: MultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (option: Option) => {
    const isSelected = value.some((item) => item.value === option.value);
    if (isSelected) {
      onChange(value.filter((item) => item.value !== option.value));
    } else {
      onChange([...value, option]);
    }
  };

  const handleRemove = (optionToRemove: Option) => {
    onChange(value.filter((option) => option.value !== optionToRemove.value));
  };

  return (
    <div className="relative">
      <div 
        className="w-full min-h-[2.5rem] bg-background border rounded-md flex flex-wrap gap-1 p-1 items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value.length > 0 ? (
          value.map((option) => (
            <Badge 
              key={option.value} 
              variant="secondary"
              className="flex items-center gap-1"
            >
              {option.label}
              <X 
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(option);
                }}
              />
            </Badge>
          ))
        ) : (
          <span className="text-muted-foreground text-sm px-2">{placeholder || "Seleccionar..."}</span>
        )}
      </div>
      
      {isOpen && (
        <div className="absolute w-full z-50 top-[100%] mt-1 bg-popover border rounded-md shadow-md">
          <ScrollArea className="h-[200px]">
            <div className="p-2 space-y-1">
              {options.map((option) => {
                const isSelected = value.some((item) => item.value === option.value);
                return (
                  <div
                    key={option.value}
                    className={`
                      flex items-center justify-between px-2 py-1.5 rounded-sm text-sm
                      ${isSelected ? 'bg-accent' : 'hover:bg-accent/50'}
                      cursor-pointer
                    `}
                    onClick={() => handleSelect(option)}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check className="h-4 w-4" />}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
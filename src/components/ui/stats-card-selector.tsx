import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface StatCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  value: string;
  description: string;
}

interface StatsCardSelectorProps {
  availableCards: StatCard[];
  selectedCards: string[];
  onSelectionChange: (selected: string[]) => void;
  triggerProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export function StatsCardSelector({
  availableCards,
  selectedCards,
  onSelectionChange,
  triggerProps = {},
}: StatsCardSelectorProps) {
  const toggleCard = (cardId: string) => {
    if (selectedCards.includes(cardId)) {
      onSelectionChange(selectedCards.filter(id => id !== cardId));
    } else {
      onSelectionChange([...selectedCards, cardId]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" {...triggerProps}>
          <Settings2 className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <h4 className="font-medium leading-none">Configurar Métricas</h4>
          <p className="text-sm text-muted-foreground">
            Selecciona las métricas que deseas mostrar en el dashboard.
          </p>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {availableCards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={card.id}
                    checked={selectedCards.includes(card.id)}
                    onCheckedChange={() => toggleCard(card.id)}
                  />
                  <label
                    htmlFor={card.id}
                    className="flex items-center gap-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {card.icon}
                    {card.title}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}
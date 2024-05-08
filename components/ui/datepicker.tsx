import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { de } from "date-fns/locale";

export type DatePickerProps = {
  date: Date | undefined;
  onSelect: (payload: Date) => void;
};

export function DatePicker({ date, onSelect }: DatePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

  const handleSelect = (payload: Date) => {
    onSelect(payload);
    setIsCalendarOpen(false);
  };

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd.MM.yyyy") : <span>Bitte auswählen</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onDayClick={handleSelect}
          initialFocus
          locale={de}
        />
      </PopoverContent>
    </Popover>
  );
}

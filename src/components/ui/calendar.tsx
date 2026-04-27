"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { ptBR } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={ptBR}
      showOutsideDays={showOutsideDays}
      className={cn("p-6 bg-[#0c0c0c] border border-white/10 rounded-2xl shadow-2xl animate-calendar-fade", className)}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center gap-2",
        caption_label: "hidden", // Escondemos o label padrão pois usaremos dropdowns
        caption_dropdowns: "flex gap-2 w-full mb-4",
        nav: "hidden", // Escondemos as setas padrão para focar nos dropdowns como na ref
        table: "w-full border-collapse",
        head_row: "flex justify-between mb-4",
        head_cell: "text-white/30 rounded-md w-9 font-normal text-[13px] lowercase",
        row: "flex w-full mt-1 justify-between",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-transparent",
          "h-10 w-10"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 font-normal text-white/90 aria-selected:opacity-100 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-white/5"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white animate-day-select shadow-[0_0_20px_rgba(225,29,72,0.4)] font-bold",
        day_today: "text-primary font-bold",
        day_outside:
          "day-outside text-white/5 opacity-50 cursor-default",
        day_disabled: "text-white/10 opacity-50",
        day_hidden: "invisible",
        // Dropdown styling
        dropdown_container: "flex-1",
        dropdown: "w-full bg-black text-white border-2 border-white/5 rounded-xl px-3 py-2.5 text-sm font-bold appearance-none cursor-pointer outline-none transition-all hover:border-primary/50 hover:shadow-[0_0_10px_rgba(225,29,72,0.2)]",
        dropdown_icon: "hidden", // Escondemos o ícone do dropdown padrão do react-day-picker
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      captionLayout="dropdown"
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

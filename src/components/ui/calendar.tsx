"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type CalendarProps = {
  selected?: Date
  onSelect?: (date: Date) => void
  className?: string
}

const months = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
]

function Calendar({ selected, onSelect, className }: CalendarProps) {
  // Estado inicial baseado no que o usuário enviou ou na data selecionada
  const initialDate = selected || new Date(2026, 3, 16)
  const [currentMonth, setCurrentMonth] = React.useState(initialDate.getMonth())
  const [currentYear, setCurrentYear] = React.useState(initialDate.getFullYear())
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(selected)

  const years = React.useMemo(() => {
    const arr = []
    for (let i = 2026; i >= 1920; i--) arr.push(i)
    return arr
  }, [])

  const days = React.useMemo(() => {
    const result = []
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const prevLastDay = new Date(currentYear, currentMonth, 0).getDate()

    // Dias do mês anterior
    for (let i = firstDay; i > 0; i--) {
      result.push({
        day: prevLastDay - i + 1,
        type: 'other-month',
        date: new Date(currentYear, currentMonth - 1, prevLastDay - i + 1)
      })
    }

    // Dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      result.push({
        day: i,
        type: 'current-month',
        date: new Date(currentYear, currentMonth, i)
      })
    }

    // Dias do próximo mês (preenchimento visual até 42 slots - 6 semanas)
    const remaining = 42 - result.length
    for (let i = 1; i <= remaining; i++) {
      result.push({
        day: i,
        type: 'other-month',
        date: new Date(currentYear, currentMonth + 1, i)
      })
    }

    return result
  }, [currentMonth, currentYear])

  const handleDayClick = (date: Date) => {
    setSelectedDate(date)
    if (onSelect) onSelect(date)
  }

  const isSelected = (date: Date) => {
    return selectedDate && 
           date.getDate() === selectedDate.getDate() && 
           date.getMonth() === selectedDate.getMonth() && 
           date.getFullYear() === selectedDate.getFullYear()
  }

  return (
    <div className={cn(
      "bg-[#0c0c0c] border border-white/10 rounded-[16px] p-6 w-[340px] shadow-2xl animate-calendar-fade",
      className
    )}>
      {/* Header com os Selects */}
      <div className="flex gap-3 mb-6">
        <select 
          value={currentMonth}
          onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
          className="bg-black text-white border-2 border-white/5 rounded-[10px] px-4 py-2.5 flex-1 cursor-pointer outline-none font-bold text-sm hover:border-primary transition-all appearance-none"
        >
          {months.map((m, i) => (
            <option key={m} value={i}>{m}</option>
          ))}
        </select>
        
        <select 
          value={currentYear}
          onChange={(e) => setCurrentYear(parseInt(e.target.value))}
          className="bg-black text-white border-2 border-white/5 rounded-[10px] px-4 py-2.5 flex-1 cursor-pointer outline-none font-bold text-sm hover:border-primary transition-all appearance-none"
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Grid do Calendário */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'].map((d) => (
          <div key={d} className="text-white/30 text-[13px] font-normal pb-4">{d}</div>
        ))}

        {days.map((item, idx) => {
          const selected = isSelected(item.date) && item.type === 'current-month'
          
          return (
            <div
              key={idx}
              onClick={() => item.type === 'current-month' && handleDayClick(item.date)}
              className={cn(
                "aspect-square flex items-center justify-center text-sm cursor-pointer rounded-[10px] transition-all duration-300 relative select-none",
                item.type === 'other-month' && "text-white/5 cursor-default pointer-events-none",
                item.type === 'current-month' && !selected && "hover:bg-white/5 hover:scale-110 z-10",
                selected && "bg-primary text-white font-bold animate-day-select shadow-[0_0_20px_rgba(225,29,72,0.4)]"
              )}
            >
              {item.day}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { Calendar }

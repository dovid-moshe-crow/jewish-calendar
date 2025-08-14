"use client"

import * as React from "react"
import { Button } from "@/registry/new-york/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york/ui/card"
import { Label } from "@/registry/new-york/ui/label"
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Languages,
} from "lucide-react"
import {
  toJewishDate,
  toHebrewJewishDate,
  formatJewishDate,
  formatJewishDateInHebrew,
} from "jewish-date"

type Language = "en" | "he"

export type JewishDatePickerProps = {
  value?: Date
  onChange?: (date: Date) => void
  language?: Language
  startOfWeek?: 0 | 1
  showOutsideDays?: boolean
  id?: string
  className?: string
}

function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function JewishDatePicker({
  value,
  onChange,
  language: controlledLanguage,
  startOfWeek = 0,
  showOutsideDays = true,
  id,
  className,
}: JewishDatePickerProps) {
  const [selected, setSelected] = React.useState<Date | undefined>(value)
  const [displayDate, setDisplayDate] = React.useState<Date>(() => selected ?? new Date())
  const [uncontrolledLanguage, setUncontrolledLanguage] = React.useState<Language>("en")
  const language = controlledLanguage ?? uncontrolledLanguage

  React.useEffect(() => {
    if (value) {
      setSelected(value)
      setDisplayDate(value)
    }
  }, [value])

  const firstOfMonth = React.useMemo(
    () => new Date(displayDate.getFullYear(), displayDate.getMonth(), 1),
    [displayDate]
  )
  const lastOfMonth = React.useMemo(
    () => new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0),
    [displayDate]
  )
  const gridStart = React.useMemo(() => {
    const weekday = firstOfMonth.getDay()
    const offset = (weekday - startOfWeek + 7) % 7
    return addDays(firstOfMonth, -offset)
  }, [firstOfMonth, startOfWeek])
  const gridEnd = React.useMemo(() => {
    const weekday = lastOfMonth.getDay()
    const offset = 6 - ((weekday - startOfWeek + 7) % 7)
    return addDays(lastOfMonth, offset)
  }, [lastOfMonth, startOfWeek])

  const days: Date[] = []
  for (let d = new Date(gridStart); d <= gridEnd; d = addDays(d, 1)) {
    days.push(new Date(d))
  }

  const jew = toJewishDate(displayDate)
  const jewHe = toHebrewJewishDate(jew)

  const headerEn = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(firstOfMonth)
  const headerHe = `${jewHe.monthName} ${jewHe.year}`

  const dayNamesEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const dayNamesHe = ["א", "ב", "ג", "ד", "ה", "ו", "ש"]
  const headers = language === "en" ? dayNamesEn : dayNamesHe
  const rotatedHeaders = [
    ...headers.slice(startOfWeek),
    ...headers.slice(0, startOfWeek),
  ]

  function select(date: Date) {
    setSelected(date)
    onChange?.(date)
  }

  const [open, setOpen] = React.useState(false)
  const inputLabel = selected
    ? new Intl.DateTimeFormat("en-CA").format(selected)
    : "Select date"

  return (
    <div className={["w-full max-w-sm", className].filter(Boolean).join(" ") }>
      <Label htmlFor={id ?? "jdate"} className="sr-only">
        Date
      </Label>
      <button
        id={id ?? "jdate"}
        className="w-full inline-flex items-center justify-between border rounded-md h-9 px-3 text-sm bg-background"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="truncate">
          {language === "en"
            ? selected
              ? `${inputLabel} • ${formatJewishDate(toJewishDate(selected))}`
              : "Select date"
            : selected
            ? formatJewishDateInHebrew(toJewishDate(selected))
            : "בחר תאריך"}
        </span>
        <CalendarIcon className="size-4 opacity-70" />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          className="mt-2 border rounded-md shadow-md bg-background"
        >
          <div className="flex items-center justify-between p-2">
            <div className="text-sm font-medium">
              {language === "en" ? headerEn : headerHe}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Previous year"
                onClick={() =>
                  setDisplayDate((d) => new Date(d.getFullYear() - 1, d.getMonth(), 1))
                }
              >
                <ChevronsLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setDisplayDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
                aria-label="Prev"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setDisplayDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
                aria-label="Next"
              >
                <ChevronRight className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Next year"
                onClick={() =>
                  setDisplayDate((d) => new Date(d.getFullYear() + 1, d.getMonth(), 1))
                }
              >
                <ChevronsRight className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle language"
                onClick={() => setUncontrolledLanguage(language === "en" ? "he" : "en")}
                title={language === "en" ? "עברית" : "English"}
              >
                <Languages className="size-4" />
              </Button>
            </div>
          </div>
          <div className="p-2">
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted-foreground mb-1">
              {rotatedHeaders.map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((date) => {
                const isCurrentMonth = date.getMonth() === displayDate.getMonth()
                if (!isCurrentMonth && !showOutsideDays) {
                  return <div key={date.toISOString()} className="min-h-9" />
                }
                const jewD = toJewishDate(date)
                const jewHeD = toHebrewJewishDate(jewD)
                const isSelected = selected && date.toDateString() === selected.toDateString()
                const isToday = new Date().toDateString() === date.toDateString()
                return (
                  <button
                    key={date.toISOString()}
                    className={[
                      "text-left border rounded-md px-2 py-1 text-xs min-h-9",
                      isCurrentMonth ? "bg-background" : "bg-muted/20 text-muted-foreground",
                      isSelected ? "ring-2 ring-primary" : "",
                      isToday ? "ring-2 ring-ring" : "",
                    ].join(" ")}
                    onClick={() => {
                      select(date)
                      setOpen(false)
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{date.getDate()}</span>
                      <span className="text-[10px]">
                        {language === "en" ? jewD.day : jewHeD.day}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
            <div className="flex items-center justify-between mt-2">
              <Button variant="ghost" size="sm" onClick={() => setDisplayDate(new Date())}>
                Today
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => selected && setDisplayDate(selected)}
                disabled={!selected}
              >
                Go to Selected
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default JewishDatePicker



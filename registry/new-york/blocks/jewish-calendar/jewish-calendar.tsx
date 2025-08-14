"use client"

import * as React from "react"
import {
  toJewishDate,
  toHebrewJewishDate,
  formatJewishDate,
  formatJewishDateInHebrew,
} from "jewish-date"
import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/registry/new-york/ui/card"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Languages,
} from "lucide-react"

type Language = "en" | "he"

export type JewishCalendarProps = {
  language?: Language
  onLanguageChange?: (language: Language) => void
  startOfWeek?: 0 | 1
  showOutsideDays?: boolean
}

function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function JewishCalendar({
  language: controlledLanguage,
  onLanguageChange,
  startOfWeek = 0,
  showOutsideDays = true,
}: JewishCalendarProps) {
  const [displayDate, setDisplayDate] = React.useState(() => new Date())
  const [uncontrolledLanguage, setUncontrolledLanguage] = React.useState<Language>(
    "en"
  )
  const language = controlledLanguage ?? uncontrolledLanguage
  const setLanguage = (lang: Language) => {
    setUncontrolledLanguage(lang)
    onLanguageChange?.(lang)
  }

  const firstOfMonth = React.useMemo(
    () => new Date(displayDate.getFullYear(), displayDate.getMonth(), 1),
    [displayDate]
  )

  const lastOfMonth = React.useMemo(
    () => new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0),
    [displayDate]
  )

  const gridStart = React.useMemo(() => {
    const weekday = firstOfMonth.getDay() // 0..6 (Sun..Sat)
    const offset = (weekday - startOfWeek + 7) % 7
    return addDays(firstOfMonth, -offset)
  }, [firstOfMonth, startOfWeek])

  const gridEnd = React.useMemo(() => {
    const weekday = lastOfMonth.getDay() // 0..6 (Sun..Sat)
    const offset = (6 - ((weekday - startOfWeek + 7) % 7))
    return addDays(lastOfMonth, offset)
  }, [lastOfMonth, startOfWeek])

  const days: Date[] = []
  for (let d = new Date(gridStart); d <= gridEnd; d = addDays(d, 1)) {
    days.push(new Date(d))
  }

  const today = React.useMemo(() => new Date(), [])
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  const midMonth = new Date(displayDate.getFullYear(), displayDate.getMonth(), 15)
  const midJewish = toJewishDate(midMonth)
  const headerHe = toHebrewJewishDate(midJewish)

  const headerEnGregorian = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(firstOfMonth)

  const headerHeJewish = `${headerHe.monthName} ${headerHe.year}`

  const dayNamesEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const dayNamesHe = ["א", "ב", "ג", "ד", "ה", "ו", "ש"]
  const headers = language === "en" ? dayNamesEn : dayNamesHe
  const rotatedHeaders = [
    ...headers.slice(startOfWeek),
    ...headers.slice(0, startOfWeek),
  ]

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-col">
          <CardTitle>
            {language === "en" ? headerEnGregorian : headerHeJewish}
          </CardTitle>
          <CardDescription>
            {language === "en"
              ? formatJewishDate(midJewish)
              : formatJewishDateInHebrew(midJewish)}
          </CardDescription>
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
            aria-label="Previous month"
            onClick={() =>
              setDisplayDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
            }
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next month"
            onClick={() =>
              setDisplayDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
            }
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
          <div className="w-px h-6 bg-border mx-1" />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle language"
            onClick={() => setLanguage(language === "en" ? "he" : "en")}
            title={language === "en" ? "עברית" : "English"}
          >
            <Languages className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground mb-2">
          {rotatedHeaders.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((date) => {
            const isCurrentMonth = date.getMonth() === displayDate.getMonth()
            const jewish = toJewishDate(date)
            const heb = toHebrewJewishDate(jewish)
            const gregDay = date.getDate()
            const jewishDayEn = jewish.day
            const jewishDayHe = heb.day
            const isToday = isSameDay(date, today)

            if (!isCurrentMonth && !showOutsideDays) {
              return <div key={date.toISOString()} className="min-h-20" />
            }

            return (
              <div
                key={date.toISOString()}
                className={[
                  "border rounded-md p-2 text-sm flex flex-col items-start gap-1 min-h-20",
                  isCurrentMonth ? "bg-background" : "bg-muted/20 text-muted-foreground",
                  isToday ? "ring-2 ring-ring" : "",
                ].join(" ")}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">{gregDay}</span>
                  <span className="text-xs">
                    {language === "en" ? jewishDayEn : jewishDayHe}
                  </span>
                </div>
                <div className="text-[10px] opacity-70">
                  {language === "en" ? jewish.monthName : heb.monthName}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default JewishCalendar



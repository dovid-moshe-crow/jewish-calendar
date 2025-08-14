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

type Language = "en" | "he"

function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function JewishCalendar() {
  const [displayDate, setDisplayDate] = React.useState(() => new Date())
  const [language, setLanguage] = React.useState<Language>("en")

  const firstOfMonth = React.useMemo(
    () => new Date(displayDate.getFullYear(), displayDate.getMonth(), 1),
    [displayDate]
  )

  const lastOfMonth = React.useMemo(
    () => new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0),
    [displayDate]
  )

  const gridStart = React.useMemo(() => {
    const day = firstOfMonth.getDay() // 0=Sun
    return addDays(firstOfMonth, -day)
  }, [firstOfMonth])

  const gridEnd = React.useMemo(() => {
    const day = lastOfMonth.getDay() // 0=Sun
    return addDays(lastOfMonth, 6 - day)
  }, [lastOfMonth])

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
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous month"
            onClick={() =>
              setDisplayDate(
                (d) => new Date(d.getFullYear(), d.getMonth() - 1, 1)
              )
            }
          >
            ‹
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next month"
            onClick={() =>
              setDisplayDate(
                (d) => new Date(d.getFullYear(), d.getMonth() + 1, 1)
              )
            }
          >
            ›
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button
            variant={language === "en" ? "secondary" : "outline"}
            onClick={() => setLanguage("en")}
          >
            English
          </Button>
          <Button
            variant={language === "he" ? "secondary" : "outline"}
            onClick={() => setLanguage("he")}
          >
            עברית
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground mb-2">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
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



import * as React from "react"
import { JewishCalendar } from "@/registry/new-york/blocks/jewish-calendar/jewish-calendar"

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Jewish Calendar</h1>
        <p className="text-muted-foreground">
          Toggle between English and Hebrew dates.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <JewishCalendar />
      </main>
    </div>
  )
}

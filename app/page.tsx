"use client"


import * as React from "react"
import { JewishCalendar } from "@/registry/new-york/blocks/jewish-calendar/jewish-calendar"
import { JewishDatePicker } from "@/registry/new-york/blocks/jewish-datepicker/jewish-datepicker"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { Input } from "@/registry/new-york/ui/input"
import { Button } from "@/registry/new-york/ui/button"
import { Copy, Check } from "lucide-react"

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
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Calendar</h2>
          <OpenInV0Button name="jewish-calendar" />
        </div>
        <CLICommand name="jewish-calendar" />
        <div className="grid gap-6">
          <ToolbarDemo />
          <JewishCalendar />
        </div>

        <div className="h-px bg-border my-2" />

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Date Picker</h2>
          <OpenInV0Button name="jewish-datepicker" />
        </div>
        <CLICommand name="jewish-datepicker" />
        <ExampleForm />
      </main>
    </div>
  )
}

function ToolbarDemo() {
  const [language, setLanguage] = React.useState<"en" | "he">("en")
  const [startOfWeek, setStartOfWeek] = React.useState<0 | 1>(0)
  const [showOutside, setShowOutside] = React.useState(true)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        className={`border rounded px-3 py-1 text-sm ${
          language === "en" ? "bg-primary text-primary-foreground" : ""
        }`}
        onClick={() => setLanguage("en")}
      >
        English Labels
      </button>
      <button
        className={`border rounded px-3 py-1 text-sm ${
          language === "he" ? "bg-primary text-primary-foreground" : ""
        }`}
        onClick={() => setLanguage("he")}
      >
        Hebrew Labels
      </button>
      <button
        className={`border rounded px-3 py-1 text-sm ${
          startOfWeek === 0 ? "bg-primary text-primary-foreground" : ""
        }`}
        onClick={() => setStartOfWeek(0)}
      >
        Start Sunday
      </button>
      <button
        className={`border rounded px-3 py-1 text-sm ${
          startOfWeek === 1 ? "bg-primary text-primary-foreground" : ""
        }`}
        onClick={() => setStartOfWeek(1)}
      >
        Start Monday
      </button>
      <button
        className={`border rounded px-3 py-1 text-sm ${
          showOutside ? "bg-primary text-primary-foreground" : ""
        }`}
        onClick={() => setShowOutside((s) => !s)}
      >
        {showOutside ? "Hide outside days" : "Show outside days"}
      </button>

      <div className="w-full">
        <JewishCalendar
          language={language}
          startOfWeek={startOfWeek}
          showOutsideDays={showOutside}
        />
      </div>
    </div>
  )
}

function ExampleForm() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  return (
    <form
      className="grid gap-4 border rounded-lg p-4"
      onSubmit={(e) => {
        e.preventDefault()
        alert(date ? date.toISOString() : "No date selected")
      }}
    >
      <div className="grid gap-2 max-w-sm">
        <label className="text-sm font-medium">Date</label>
        <JewishDatePicker value={date} onChange={setDate} id="example-date" />
        <p className="text-xs text-muted-foreground">
          Compact input with popover calendar.
        </p>
      </div>

      <div>
        <button
          type="submit"
          className="border rounded-md px-4 py-2 text-sm bg-primary text-primary-foreground"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

function CLICommand({ name }: { name: string }) {
  const [copied, setCopied] = React.useState(false)
  const cmd = `npx shadcn@latest add https://jewish-calendar.vercel.app/r/${name}.json --yes`
  return (
    <div className="flex items-center gap-2">
      <Input readOnly value={cmd} className="font-mono" />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => {
          navigator.clipboard.writeText(cmd)
          setCopied(true)
          setTimeout(() => setCopied(false), 1200)
        }}
        aria-label="Copy command"
        title="Copy command"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
    </div>
  )
}

# Jewish Calendar

Production-ready shadcn components for a Hebrew/Gregorian calendar and a compact date picker, powered by the `jewish-date` library.

- Live demo: `https://jewish-calendar.vercel.app/`
- GitHub: `https://github.com/dovid-moshe-crow/jewish-calendar`

## Install via shadcn CLI

Quick add (direct component URLs):

```
npx shadcn@latest add https://jewish-calendar.vercel.app/r/jewish-calendar.json --yes
npx shadcn@latest add https://jewish-calendar.vercel.app/r/jewish-datepicker.json --yes
```

Or add the registry once, then install by name:

```
npx shadcn@latest add --registry "https://jewish-calendar.vercel.app/r/registry.json" --yes
npx shadcn@latest add jewish-calendar --registry "https://jewish-calendar.vercel.app/r/registry.json" --yes
npx shadcn@latest add jewish-datepicker --registry "https://jewish-calendar.vercel.app/r/registry.json" --yes
```

Dependency:

```
pnpm add jewish-date
# or: npm i jewish-date --save
# or: yarn add jewish-date
```

## Features

- Hebrew and English display; 1-click language toggle
- Start-of-week configuration (Sunday/Monday)
- Optional outside-month days
- Date picker with compact input + popover, month/year navigation

## Develop

- `pnpm dev` (or `npm run dev`/`yarn dev`)
- Open http://localhost:3000

## Registry

- Defined in `registry.json`
- Build JSON artifacts: `pnpm registry:build`
- Emitted to `public/r/*.json` for the `shadcn` CLI

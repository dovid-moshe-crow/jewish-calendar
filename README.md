# Jewish Calendar (shadcn registry app)

This app is a minimal shadcn registry scaffold customized to showcase a Jewish calendar component powered by the `jewish-date` library.

GitHub: `https://github.com/dovid-moshe-crow/jewish-calendar`

## Develop

- `pnpm dev` (or `npm run dev`/`yarn dev`)
- Open http://localhost:3000

## Registry

- The registry is defined in `registry.json`.
- Build registry items with: `pnpm registry:build`
- Static JSONs are emitted under `public/r/*.json` for consumption by the `shadcn` CLI.

## Install components via shadcn CLI

You can install components into your own project using the `shadcn` CLI by pointing to this registry URL.

1) Initialize shadcn in your project (if you haven't):

```
npx shadcn@latest init --yes
```

2) Add the registry:

```
npx shadcn@latest add --registry "https://raw.githubusercontent.com/dovid-moshe-crow/jewish-calendar/refs/heads/main/public/r/registry.json" --yes
```

3) Install the Jewish Calendar component:

```
npx shadcn@latest add jewish-calendar --registry "https://raw.githubusercontent.com/dovid-moshe-crow/jewish-calendar/refs/heads/main/public/r/registry.json" --yes
```

4) Install the Jewish Date Picker component:

```
npx shadcn@latest add jewish-datepicker --registry "https://raw.githubusercontent.com/dovid-moshe-crow/jewish-calendar/refs/heads/main/public/r/registry.json" --yes
```

Note: The components depend on `jewish-date`, ensure it is installed in your project:

```
pnpm add jewish-date
# or: npm i jewish-date --save
# or: yarn add jewish-date
```

## Jewish calendar component

- Uses `jewish-date` for conversions and formatting. See docs: `https://www.npmjs.com/package/jewish-date` and `https://github.com/Shmulik-Kravitz/jewish-date#readme`.
- Toggle between English and Hebrew rendering.
- Navigate months.

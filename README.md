# Jewish Calendar (shadcn registry app)

This app is a minimal shadcn registry scaffold customized to showcase a Jewish calendar component powered by the `jewish-date` library.

## Develop

- `pnpm dev` (or `npm run dev`/`yarn dev`)
- Open http://localhost:3000

## Registry

- The registry is defined in `registry.json`.
- Build registry items with: `pnpm registry:build`
- Static JSONs are emitted under `public/r/*.json` for consumption by the `shadcn` CLI.

## Jewish calendar component

- Uses `jewish-date` for conversions and formatting. See docs: `https://www.npmjs.com/package/jewish-date` and `https://github.com/Shmulik-Kravitz/jewish-date#readme`.
- Toggle between English and Hebrew rendering.
- Navigate months.

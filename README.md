# Jewish Calendar

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> A comprehensive TypeScript library for Jewish calendar calculations, date conversions, and Zmanim (Jewish time calculations).

## Features

- Convert between Gregorian and Hebrew dates
- Calculate Jewish holidays and special dates
- Determine Zmanim (halachic times) for any location
- Support for Parsha of the week calculations
- Hebrew date formatting
- Comprehensive handling of Jewish calendar rules
- Written in TypeScript with full type safety
- Well-documented API
- Thoroughly tested

## Install

```bash
npm install jewish-calendar
```

## Usage

```ts
import { HebrewDate, GregorianDate, Zmanim } from 'jewish-calendar';

// Convert Gregorian to Hebrew date
const hebrewDate = HebrewDate.fromGregorian(new Date());
console.log(hebrewDate.toString()); // Returns Hebrew date in English or Hebrew

// Get Zmanim for a location
const zmanim = new Zmanim({
  latitude: 31.7767,
  longitude: 35.2345,
  elevation: 754,
  timeZone: 'Asia/Jerusalem'
});
console.log(zmanim.getSunrise()); // Get sunrise time
console.log(zmanim.getSunset());  // Get sunset time

// Get upcoming holidays
const holidays = HebrewDate.getUpcomingHolidays();
```

## API

### HebrewDate

#### fromGregorian(date: Date): HebrewDate

Converts a Gregorian date to a Hebrew date.

#### toGregorian(): Date

Converts a Hebrew date to a Gregorian date.

### Zmanim

#### constructor(options: ZmanimOptions)

Creates a new Zmanim calculator with the specified location options.

#### getSunrise(): Date
#### getSunset(): Date
#### getCandleLighting(): Date
#### getHavdalah(): Date

And many more methods for various halachic times.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Make sure to read the contributing guidelines first.

## License

MIT © Dovid

[build-img]:https://github.com/dovidmoishe/jewish-calendar/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/dovidmoishe/jewish-calendar/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/jewish-calendar
[downloads-url]:https://www.npmtrends.com/jewish-calendar
[npm-img]:https://img.shields.io/npm/v/jewish-calendar
[npm-url]:https://www.npmjs.com/package/jewish-calendar
[issues-img]:https://img.shields.io/github/issues/dovidmoishe/jewish-calendar
[issues-url]:https://github.com/dovidmoishe/jewish-calendar/issues
[codecov-img]:https://codecov.io/gh/dovidmoishe/jewish-calendar/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/dovidmoishe/jewish-calendar
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release

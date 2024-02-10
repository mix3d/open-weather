# OpenWeatherMap API example

A simple Next.js v14 app-router based example website to fetch weather forcast data from a given zipcode. Has light/dark mode (based on PC / browser preference)

It is hosted on Vercel at [weather.mjkd.dev](https://weather.mjkd.dev)

## Known issues

- Assumes US zipcodes. Doesn't Validate before navigating or fetching.
- Time is in UTC, does not account for the timezone of the zipcode itself
- Would be good to learn how to do server-side form submission to route with server components instead of the client-component hack I did.

## Getting Started

First, create a `.env.local` file and enter `OPENWEATHER_API_KEY=<yourkeyvalue>`. If deploying to Vercel, add this environment variable to the deploy config.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

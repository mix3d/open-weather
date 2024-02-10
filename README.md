# OpenWeatherMap API example

A simple Next.js v14 app-router based example website to fetch weather forcast data from a given zipcode. Has light/dark mode (based on PC / browser preference)

It is hosted on Vercel at [weather.mjkd.dev](https://weather.mjkd.dev)

## What I learned

This was my first project with Next v14. I initially tried to use my prior understanding of SSR-first principles and wanted to focus on Incremental Static Regeneration, but this unfortunately led me down the wrong path.

The first google results were for something called `unstable_cache()`, so I started with that approach even though Next has already baked-in cache invalidation (something I learned only MUCH later into development). App Router's system of magic exports and `fetch` wrapper allows it to cache all fetches automatically and does ISR by default now. Very much "standing on the shoulders of giants".

This is both REALLY cool and also dangerous, as newer developers might adopt this in Next and not realize everything Next is doing under the hood, thinking that this behavior is to be expected with all Web Frameworks and not realizing all the time and energy that went into building such a simple DX. On the flip side, it also makes it harder to debug issues or relearn older Next projects.

The concept of Server and Client components is also a big shift in my experience of React development, and I ran into at least one "oh, how am I supposed to do this now" problem, particularly around Routing. I solved it with the interesting-but-definitely-not-obvious pattern of sending server-rendered JSX through as children to a client component, but there is more to learn here.

## Known issues

- Assumes US zipcodes. Doesn't Validate before navigating or fetching.
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

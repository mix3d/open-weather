/**
 * This code was generated by v0 by Vercel and heavily modified for reactivity.
 * @see https://v0.dev/t/nrUO8T1y5L4
 */
import { SunIcon, CloudSunIcon, CloudIcon, CloudRainIcon, CloudSnowIcon, MoonIcon, UmbrellaIcon, ExternalLink } from "lucide-react"
import { ClientForm } from "@/components/client-form"

const icons = [SunIcon, CloudSunIcon, CloudIcon, CloudRainIcon, CloudSnowIcon, MoonIcon, UmbrellaIcon]

// Intentionally low revalidate to get the random icon to show more often
export const revalidate = 10
export default function Home() {

  // Randomize the icon because that's fun
  const RandIcon = icons[Math.floor(Math.random() * icons.length)]

  return (
    <div className="grid w-full h-full place-items-center">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 py-12 mx-auto text-center md:py-24">
        <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl lg:text-7xl">Weather Forecast</h1>
        <p className="max-w-[600px] text-gray-800 md:text-base/relaxed lg:text-base/relaxed xl:text-lg/relaxed dark:text-gray-400">
          Enter your ZIP code to get the latest 5-day forecast for your area.
        </p>
        {/* Because I couldn't figure out server component form routing, 
            here's a client component getting passed a server-rendered random icon */}
        <ClientForm>
          <RandIcon></RandIcon><span>Get Weather</span>
        </ClientForm>
        <div className="py-8 mt-8 text-gray-700 dark:text-gray-400">
          Fork me on{" "}
          <a href="https://github.com/mix3d/open-weather" className="text-blue-800 hover:text-blue-600 dark:text-gray-300 dark:hover:text-gray-100 hover:underline ">
            Github
            <ExternalLink className="inline-block w-6 h-6 p-1 align-text-bottom"></ExternalLink>
          </a>
        </div>
      </div>
    </div>
  )
}



import { Button } from "@/components/ui/button";
import { Weather } from "@/components/weather";
import { getWeatherFromZip } from "@/lib/weather";
import { Metadata } from "next";
import Link from "next/link";

export const dynamic = "error"
export const revalidate = 120

export default async function Page({ params }: { params: { zipcode: string } }) {
  // TODO: validate zipcode before fetching
  // TODO: Better support for more international locales?
  const weather = await getWeatherFromZip(params.zipcode)
  if (!weather?.cnt) {
    return (
      <div className="py-12 lg:py-24">
        <div className="container flex flex-col items-center px-4 py-6 mx-auto space-y-8 lg:py-12 lg:px-6">
          <h1 className="text-3xl font-bold tracking-tight text-center">Could not find Forecast for &apos;{params.zipcode}&apos;</h1>
          <Button asChild ><Link href="/">Go Back</Link></Button>
        </div>
      </div>)
  }

  return (
    <Weather forecast={weather} zipcode={params.zipcode}></Weather>
  )
}
export async function generateMetadata(
  { params }: { params: { zipcode: string } },
): Promise<Metadata> {
  // read route params
  const zipcode = params.zipcode

  // fetch data
  const weather = await getWeatherFromZip(zipcode)

  if (!weather?.cnt)
    return {
      title: `Could not find Forecast for '${params.zipcode}'`
    }

  return {
    title: `5-day forecast for ${weather?.city?.name ?? zipcode}`,

    openGraph: {
      images: [`https://openweathermap.org/img/wn/${weather.list?.[0]?.weather?.[0]?.icon}@2x.png`],
    },
  }
}
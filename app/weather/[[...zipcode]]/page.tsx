import { Button } from "@/components/ui/button";
import { Weather } from "@/components/weather";
import { getWeatherFromZip } from "@/lib/weather";
import Link from "next/link";

export default async function Page({ params }: { params: { zipcode: string } }) {
  // TODO: validate zipcode before fetching
  // TODO: Better support for more international locales?B
  const weather = await getWeatherFromZip(params.zipcode)
  if (!weather?.cnt) {
    return (
      <div className="py-12 lg:py-24">
        <div className="container flex flex-col items-center px-4 py-6 mx-auto space-y-8 lg:py-12 lg:px-6">
          <h1 className="text-3xl font-bold tracking-tight text-center">Could not find Forecast for {params.zipcode}</h1>
          <Button asChild ><Link href="/">Go Back</Link></Button>
        </div>
      </div>)
  }

  return (
    <Weather forecast={weather} zipcode={params.zipcode}></Weather>
  )
}

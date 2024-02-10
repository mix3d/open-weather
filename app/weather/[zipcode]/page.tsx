import { Weather } from "@/components/weather";
import { getWeatherFromZip } from "@/lib/weather";

export default async function Page({ params }: { params: { zipcode: string } }) {
  // TODO: validate zipcode before fetching
  // TODO: Better support for more international locales?
  // TODO: Back Button?
  const weather = await getWeatherFromZip(params.zipcode)
  if (!weather?.cnt) {
    return (
      <div className="py-12 lg:py-24">
        <div className="container px-4 py-6 mx-auto lg:py-12 lg:px-6 ">
          <h1 className="text-3xl font-bold tracking-tight">Could not find Forecast for {params.zipcode}</h1>
        </div>
      </div>)
  }

  return (
    <Weather forecast={weather} zipcode={params.zipcode}></Weather>
  )
}

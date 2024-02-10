import { Weather } from "@/components/weather";
import { getCachedWeatherFromZip } from "@/lib/weather";

export default async function Page({ params }: { params: { zipcode: string } }) {
  // todo: validate zipcode
  const weather = await getCachedWeatherFromZip(params.zipcode)
  if (!weather?.cnt) {
    // 404
    return (<h2>Zipcode not found</h2>)
  }

  return (
    <Weather forecast={weather} zipcode={params.zipcode}></Weather>
  )
}

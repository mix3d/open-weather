import { Weather } from "@/components/weather";
import { getCachedWeatherFromZip, getWeatherFromZip } from "./utils";



export default async function Page({ params }: { params: { zipcode: string } }) {
  // todo: validate zipcode
  const weather = await getCachedWeatherFromZip(params.zipcode)
  return (
    <>
      <p>{params.zipcode}</p>
      <pre>{JSON.stringify(weather, null, 2)}</pre>
      {/* <Weather></Weather> */}
    </>
  )
}

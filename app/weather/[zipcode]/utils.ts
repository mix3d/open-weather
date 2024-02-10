import { unstable_cache } from "next/cache";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// For the near-term, just use US zipcode
export const validateZip = (zipcode: string) => {
  // Regular expression to match a 5-digit zipcode
  const zipcodeRegex = /^\d{5}$/;

  // Check if the pathname matches the zipcode pattern
  return zipcodeRegex.test(zipcode);
};

const getCoordByZip = async (zipcode: string) =>
  (await (
    await fetch(
      `https://api.openweathermap.org/geo/1.0/zip?zip=${zipcode}&appid=${OPENWEATHER_API_KEY}`
    )
  ).json()) as Coord;

const getCachedCoordByZip = unstable_cache(
  async (zipcode: string) => await getCoordByZip(zipcode),
  ["zipcodes"],
  { revalidate: 60 * 60 * 24 } // save zip to coordinates for 24 hours
);
const getWeatherFromCoords = async (geoData: Coord) =>
  (await (
    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${geoData.lat}&lon=${geoData.lon}&appid=${OPENWEATHER_API_KEY}`
    )
  ).json()) as WeatherForecast;

export const getWeatherFromZip = async (zipcode: string) =>
  (await (
    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&appid=${OPENWEATHER_API_KEY}`
    )
  ).json()) as WeatherForecast;

export const getCachedWeatherFromZip = unstable_cache(
  async (zipcode: string) => {
    console.log(zipcode);
    const coord = await getCachedCoordByZip(zipcode);
    console.log(coord);
    const weather = await getWeatherFromCoords(coord);
    return weather;
  },
  ["weather-by-zip"],
  { revalidate: 60 * 30 } // cache values every 30 minutes
);

export type Coord = {
  zip: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
};

// NOTE: Generated with ChatGPT
// prompt: "Can you create a typescript type that captures the API response of the openweatherAPI's 5day forecast listed here https://openweathermap.org/forecast5"
export type WeatherForecast = {
  cod: string; // Internal parameter
  message: number; // Internal parameter
  cnt: number; // Number of lines returned by this API call
  list: {
    dt: number; // Time of data forecasted, unix, UTC
    main: {
      temp: number; // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
      feels_like: number; // Temperature. This temperature parameter accounts for the human perception of weather.
      temp_min: number; // Minimum temperature at the moment of calculation. This is deviation from 'temp' that is possible for large cities and megalopolises geographically expanded
      temp_max: number; // Maximum temperature at the moment of calculation. This is deviation from 'temp' that is possible for large cities and megalopolises geographically expanded
      pressure: number; // Atmospheric pressure on the sea level by default, hPa
      sea_level: number; // Atmospheric pressure on the sea level, hPa
      grnd_level: number; // Atmospheric pressure on the ground level, hPa
      humidity: number; // Humidity, %
      temp_kf: number; // Internal parameter
    };
    weather: {
      id: number; // Weather condition id
      main: string; // Group of weather parameters (Rain, Snow, Extreme etc.)
      description: string; // Weather condition within the group
      icon: string; // Weather icon id
    }[];
    clouds: {
      all: number; // Cloudiness, %
    };
    wind: {
      speed: number; // Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
      deg: number; // Wind direction, degrees (meteorological)
    };
    visibility: number; // Visibility, meter
    pop: number; // Probability of precipitation
    rain?: {
      "3h": number; // Rain volume for last 3 hours, mm
    };
    snow?: {
      "3h": number; // Snow volume for last 3 hours
    };
    sys: {
      pod: string; // Part of the day (d - day, n - night)
    };
    dt_txt: string; // Time of data forecasted, ISO, UTC
  }[];
  city: {
    id: number; // City ID
    name: string; // City name
    coord: {
      lat: number; // City geo location, latitude
      lon: number; // City geo location, longitude
    };
    country: string; // Country code (GB, JP etc.)
    timezone: number; // Shift in seconds from UTC
    sunrise: number; // Sunrise time, unix, UTC
    sunset: number; // Sunset time, unix, UTC
  };
};

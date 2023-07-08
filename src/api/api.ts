export const ninjaCityApiConfig = {
  headers: {
    "X-Api-Key": import.meta.env.VITE_APP_NINJA_API_KEY,
  },
};
export const ninjaCityApi = "https://api.api-ninjas.com/v1/city";

export const weatherApiForecaseUrl = "http://api.weatherapi.com/v1/forecast.json";

export const weatherApiKey = import.meta.env.VITE_APP_WEATHER_API_KEY;
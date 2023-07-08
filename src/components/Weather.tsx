import { Skeleton } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { weatherApiForecaseUrl, weatherApiKey } from "../api/api";
import { LocationContext } from "../contexts/LocationContext";
import { WeatherContext } from "../contexts/WeatherContext";
import "./styles/weather.scss";

export default function Weather() {
  const [date, setDate] = useState<string>("");
  const [statusImg, setStatusImg] = useState<string>("");
  const [statusIcon, setStatusIcon] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { selectedCityInfos, data, setData } = useContext(WeatherContext);
  const { city } = useContext(LocationContext);

  const getIconPath = (url: string): string => {
    const iconId = url.substring("//cdn.weatherapi.com/weather/64x64".length);
    return `./src/static${iconId}`;
  }

  useEffect(() => {
    const getImgAndIcon = () => {
      setStatusIcon(getIconPath(data.current!.condition.icon));

      let timeOfTheDay = "day";
      if (!data.current!.is_day) timeOfTheDay = "night";
      const code = data.current!.condition.code;
      if (code === 1000) setStatusImg(`${timeOfTheDay}/clear.avif`);
      else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        setStatusImg(`${timeOfTheDay}/cloudy.avif`);
      } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        setStatusImg(`${timeOfTheDay}/rainy.avif`);
      } else {
        setStatusImg(`${timeOfTheDay}/snowy.avif`);
      }
    };

    Object.entries(data).length !== 0 && getImgAndIcon();
  }, [data]); // get the background img for quick_preview

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const url = `${weatherApiForecaseUrl}?key=${weatherApiKey}&q=${city === "" ? selectedCityInfos.name : city.trim()}&days=5`
        console.log(url)
        await axios.get(url).then(res => {
          setData(res.data);
          console.log(res)
        });
      } catch (error) {
        toast.error("Something Went Wrong, " + error);
      } finally {
        setLoading(false);
      }
    };

    selectedCityInfos.name !== "" && getData();
  }, [selectedCityInfos, city]); // get data when user selects a new city

  useEffect(() => {
    const options = {
      weekday: "long" as const,
      month: "long" as const,
      day: "numeric" as const,
      hour: "numeric" as const,
      minute: "numeric" as const,
    };
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", options);
    setDate(formattedDate);
  }, []); // get today formatted day

  return (
    <Skeleton isLoaded={!loading}>
      {selectedCityInfos.name !== "" ? (
        <div className="weather_app">
          <div className="weather_wrapper">
            <article
              className="weather_quickview"
              style={{ backgroundImage: `url(./src/static/${statusImg})` }}
            >
              <div className="weather_city">
                <p className="weather_city_name">
                  {data.location?.name}, {data.location?.country}
                </p>
                <p>{date}</p>
              </div>

              <div className="weather_infos">
                <img src={statusIcon} alt="rainy" />
                <h1>{data.current?.temp_c}°</h1>
              </div>
            </article>

            <div className="forecast_container">
              <h1>Daily Forecast</h1>
              <div className="forecast_wrapper">
                {data.forecast?.forecastday.map(currDay => {
                  return (
                    <div className="forecast" key={currDay.date}>

                      <div className="forecast_first">
                        <img src={getIconPath(currDay.day.condition.icon)} alt={currDay.day.condition.code as unknown as string} />
                        <h1>{Math.ceil(currDay.day.avgtemp_c)}</h1>
                      </div>
                      
                      <div className="forecast_second">
                        <p>{currDay.day.condition.text}</p>
                      </div>

                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="nocity">No City Selected</h1>
      )}
    </Skeleton>
  );
}

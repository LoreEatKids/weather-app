import { createContext, useState } from "react";
import { ChildrenType, Forecast } from "../utilities/interfaces";

interface City {
  name: string;
  country: string;
}

type WeatherContextType = {
  data: {
    current?: {
      is_day: number;
      condition: { code: number; icon: string };
      temp_c: number,
      temp_f: number
    };
    
    location?: {
      name: string
      country: string
    };

    forecast?: {
      forecastday: Forecast[]
    }
  };
  setData: React.Dispatch<any>;

  selectedCityInfos: City;
  setSelectedCityInfos: React.Dispatch<any>;
};

const WeatherContextState: WeatherContextType = {
  data: {},
  setData: () => {},
  selectedCityInfos: { name: "", country: "" },
  setSelectedCityInfos: () => {},
};

export const WeatherContext = createContext(WeatherContextState);
export const WeatherContextProvier = ({ children }: ChildrenType) => {
  const [data, setData] = useState<object>({});
  const [selectedCityInfos, setSelectedCityInfos] = useState<City>({
    name: "",
    country: "",
  });

  return (
    <WeatherContext.Provider
      value={{ data, setData, selectedCityInfos, setSelectedCityInfos }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

import { createContext, useState } from "react";
import { ChildrenType } from "../utilities/interfaces";

type LocationContextStateType = {
  city: string;
  setCity: React.Dispatch<any>;
};

const LocationContextState: LocationContextStateType = {
  city: "",
  setCity: () => {}
};

export const LocationContext = createContext(LocationContextState);

export const LocationContextProvider = ({children}: ChildrenType) => {
  const [city, setCity] = useState<string>("");

  return (
    <LocationContext.Provider value={{ city, setCity }}>
      {children}
    </LocationContext.Provider>
  );
};
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from 'react-dom/client';
import { Toaster } from "react-hot-toast";
import App from './App.tsx';
import { LocationContextProvider } from "./contexts/LocationContext.tsx";
import { WeatherContextProvier } from "./contexts/WeatherContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <WeatherContextProvier>
      <LocationContextProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <App />
      </LocationContextProvider>
    </WeatherContextProvier>
  </ChakraProvider>
);
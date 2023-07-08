import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { LocationContext } from "../contexts/LocationContext";
import "./styles/search.scss";

export default function GetLocation() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const { city, setCity } = useContext(LocationContext);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);

          try {
            const res = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=${import.meta.env.VITE_APP_GEOCODE_API_KEY}&q=${latitude},${longitude}&pretty=1`);
            const cityName = res.data.results[0]?.components?.county;
            setCity(cityName);
            toast.success("You Are in: " + cityName);
          } catch (error) {
            toast.error("Something Went Wrong");
          }
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              toast.error("You denied the location request");
              break;
            case error.POSITION_UNAVAILABLE:
              toast.error("Location information is unavailable");
              break;
            case error.TIMEOUT:
              toast.error("The request to get location timed out");
              break;
            default:
              toast.error("Unknown Error While Getting Your Location");
          }
        }
      );
    } else {
      toast.error("Your Browser Doesn't Support Geolocation");
    }
  };

  return (
    <>
      {city === "" ? <button type="button" onClick={handleGetLocation} className="navbar_comp">
        Get My Location
      </button> : "You are in: " + city}
    </>
  );
}
import { Input, ListItem, Spinner, UnorderedList } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ninjaCityApi, ninjaCityApiConfig } from "../api/api";
import { LocationContext } from "../contexts/LocationContext";
import { WeatherContext } from "../contexts/WeatherContext";
import Navbar from "./Navbar";
import "./styles/search.scss";

interface City {
  name: string
  country: string
}

export default function Search() {
    const [searchResults, setSearchResults] = useState<City[]>([]);
    const [searchInput, setSearchInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { setSelectedCityInfos } = useContext(WeatherContext);
    const { setCity } = useContext(LocationContext);

    const handleResetStates = () => {
      setSearchResults([]);
      setSearchInput("");
      setCity("");
    } 
    
    useEffect(() => {
      const unsub = async () => {
        if(searchInput === "") return;
        try {
          setIsLoading(true);
          const url = `${ninjaCityApi}?name=${searchInput.trim()}&min_population=10000`;
          await axios
            .get(url, ninjaCityApiConfig)
            .then((res) => setSearchResults(res.data));
        } catch(error) {
          toast.error("Something Went Wrong: " + error);
        } finally {
          setIsLoading(false);
        }        
      }

      unsub();
    }, [searchInput]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
    }

    const handleSelectCity = (city: City) => {
      setSelectedCityInfos(city);
      handleResetStates();
    }

    return (
      <div>
        <Navbar />
        <div className="input_container">
          <Input placeholder="Search for a city" value={searchInput} onChange={(e) => handleSearch(e)} />

          <UnorderedList className="cities_list">
            {searchResults.length > 0 && !isLoading &&
              searchResults.map((city) => (
                <ListItem key={city.name} onClick={() => handleSelectCity(city)}>
                  {city.name}, {city.country}
                </ListItem>
              ))}

            {isLoading && <Spinner />}
          </UnorderedList>
        </div>
      </div>
    );
};

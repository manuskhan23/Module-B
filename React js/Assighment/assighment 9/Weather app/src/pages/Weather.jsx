import { useState } from "react";
import axios from "axios";
import { Container, Button } from "@mui/material";

import Navbar from "../components/Navbar";
import CityInput from "../components/CityInput";
import WeatherCard from "../components/WeatherCard";
import Loader from "../components/Loader";
import PageNotFound from "./PageNotFound";

const API_KEY = "c0ef75261a97cb8945e927fb43a01d09";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async () => {
    if (!search.trim()) return;

    setLoading(true);
    setWeather(null);
    setNotFound(false);

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`
      );
      setWeather(res.data);
      console.log(res.data);
    } catch {
      setNotFound(true);
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="sm">
        <CityInput value={search} onChange={setSearch} />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={fetchWeather}
        >
          Search
        </Button>

        {loading && <Loader />}
        {notFound && <PageNotFound />}
        {weather && !notFound && <WeatherCard data={weather} />}
      </Container>
    </>
  );
};

export default Weather;

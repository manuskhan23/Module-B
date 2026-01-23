import { Card, CardContent, Typography, Box } from "@mui/material";

const WeatherCard = ({ data }) => {
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5">{data.name}</Typography>

        <Box display="flex" alignItems="center" gap={2} mt={2}>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="weather icon"
          /><br/>
          <Typography variant="h4">
            {Math.round(data.main.temp - 273.15)}°C
          </Typography>
        </Box>

        <Typography sx={{ mt: 1, textTransform: "capitalize" }}>
          {data.weather[0].description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
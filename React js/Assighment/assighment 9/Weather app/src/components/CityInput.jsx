import { TextField } from "@mui/material";

const CityInput = ({ value, onChange }) => {
  return (
    <TextField
      label="Enter city or country"
      variant="outlined"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ mt: 3, backgroundColor: "#fff" }}
    />
  );
};

export default CityInput;
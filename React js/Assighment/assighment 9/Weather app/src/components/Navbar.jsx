import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(90deg, #2193b0, #6dd5ed)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6" fontWeight={600}>
            Weather App
          </Typography>
        </Box>

        <Typography variant="body2">
          Real-time Weather
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
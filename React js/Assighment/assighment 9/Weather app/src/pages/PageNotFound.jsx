import { Box, Typography } from "@mui/material";

const PageNotFound = () => {
  return (
    <Box
      height="60vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Typography variant="h3">404</Typography>
      <Typography variant="h6">
        Location not found
      </Typography>
    </Box>
  );
};

export default PageNotFound;

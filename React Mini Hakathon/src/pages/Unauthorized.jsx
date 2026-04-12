import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          textAlign: "center",
          gap: 3
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main" }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Unauthorized
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          You do not have permission to access this page. Please check your account role or contact the administrator.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/login")}>
          Go to Login
        </Button>
      </Box>
    </Container>
  );
}

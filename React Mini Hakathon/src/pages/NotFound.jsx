import { Box, Typography, Button } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom"; // Replace with your globe image path
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fafafa",
      }}
    >
      <Box textAlign="center">

        {/* 4 🌍 4 */}
        <Box display="flex" alignItems="center" justifyContent="center" gap={3}>
          <Typography sx={{ fontSize: 90, color: "#444", fontWeight: 500 }}>
            4
          </Typography>
          <Typography sx={{ fontSize: 90, color: "#444", fontWeight: 500 }}>
            <img src="../../globe.png" alt="" />
          </Typography>
          
          <Typography sx={{ fontSize: 90, color: "#444", fontWeight: 500 }}>
            4
          </Typography>
        </Box>

        {/* Text */}
        <Typography sx={{ mt: 2, fontSize: 30, fontWeight: 500 }}>
          Ups! Lost in space
        </Typography>

        <Typography sx={{ mt: 1, color: "#888", fontSize: 14 }}>
          We couldn’t find the page you’re looking for. It might have been moved or deleted.
        </Typography>

        {/* Button */}
        <Button
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
          sx={{
            mt: 4,
            background: "#111",
            color: "#fff",
            px: 3,
            py: 1,
            borderRadius: "6px",
            textTransform: "none",
            "&:hover": { background: "#222" },
          }}
        >
          Go Back
        </Button>

        {/* Animations */}
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-6px); }
            }
          `}
        </style>
      </Box>
    </Box>
  );
};

export default NotFound;
import { Box, Paper, Typography } from "@mui/material";
import Navbar from "../Components/Navbar";

export default function HomePage() {
  return (
    <Paper sx={{ height: "90vh" }}>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography sx={{ fontSize: "32px" }}>
          Welcome to Tailor, Resume Generator!!
        </Typography>
      </Box>
    </Paper>
  );
}

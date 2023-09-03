import { Box, Typography } from "@mui/material";
import AlertBox from "../Components/AlertBox";
import LoadingScreen from "../Components/LoadingScreen";
import Navbar from "../Components/Navbar";
import ResumerForm from "../Components/Resume/Resumeform";

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <AlertBox />
      <LoadingScreen />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography fontSize={{ xs: 24, md: 36 }} mb={2}>
            RESUME GENERATOR
          </Typography>
          <ResumerForm />
        </Box>
      </Box>
    </>
  );
}

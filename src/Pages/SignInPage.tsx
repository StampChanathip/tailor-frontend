import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import loginApi from "../Api/loginApi";
import { useDispatch } from "react-redux";
import { closeAlertBox, openAlertBoxType1 } from "../Redux/alertBoxSlice";
import AlertBox from "../Components/AlertBox";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const yupFormSchema = yup.object().shape({
    username: yup.string().required("username is required"),
    password: yup.string().required("password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(yupFormSchema),
  });

  const handleClose = () => {
    dispatch(closeAlertBox());
  };

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const response = await loginApi(data);
    if (response.message) {
      dispatch(
        openAlertBoxType1({
          alertTitle: response.message,
          alertMessage:
            "Please try again, make sure you enter correct username and password",
          cancelHandler: handleClose,
        })
      );
    } else {
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: { xs: 2, md: 4 },
      }}
    >
      <AlertBox />
      <Box>
        <Link to="/">Back to home</Link>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography fontSize={36} my={2}>
          SIGN IN
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "300px", sm: "450px", md: "800px" },
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            {...register("username")}
          />
          <FormHelperText sx={{ px: 1, mb: 2, color: "red" }}>
            {errors.username?.message}
          </FormHelperText>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            {...register("password")}
          />
          <FormHelperText sx={{ px: 1, mb: 2, color: "red" }}>
            {errors.password?.message}
          </FormHelperText>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              width: { xs: "300px", sm: "450px", md: "800px" },
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: { sm: "100%", md: "50%" },
                alignItems: "center",
                justifyContent: { xs: "center" },
                mb: { xs: 1, md: 0 },
              }}
            >
              <Typography fontSize={{ xs: 14, sm: 16, md: 18 }} sx={{ mr: 1 }}>
                Don't have an account?
              </Typography>
              <Link to="/signUp">
                <Typography fontSize={{ xs: 14, sm: 16, md: 18 }}>
                  Create one!
                </Typography>
              </Link>
            </Box>
            <Button
              variant="contained"
              type="submit"
              sx={{ width: { sm: "100%", md: "50%" } }}
            >
              <Typography fontSize={{ xs: 14, sm: 16, md: 18 }}>
                Sign In
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

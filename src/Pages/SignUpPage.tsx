import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import signUpApi from "../Api/signUpApi";
import AlertBox from "../Components/AlertBox";
import { useDispatch } from "react-redux";
import { closeAlertBox, openAlertBoxType1 } from "../Redux/alertBoxSlice";

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const yupFormSchema = yup.object().shape({
    username: yup.string().required("username is required"),
    password: yup
      .string()
      .required("password is required")
      .min(8, "Password is too short - should be 8 chars minimum."),
    displayName: yup.string().required("Display Name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(yupFormSchema),
  });

  const handleClose = () => {
    dispatch(closeAlertBox());
  };

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    const response = await signUpApi(data);
    if (response.message) {
      dispatch(
        openAlertBoxType1({
          alertTitle: response.message,
          alertMessage: "Please try new username",
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
          SIGN UP
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
          <TextField
            label="Display Name"
            variant="outlined"
            {...register("displayName")}
          />
          <FormHelperText sx={{ px: 1, mb: 2, color: "red" }}>
            {errors.displayName?.message}
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
                Already have an account?
              </Typography>
              <Link to="/signIn">
                <Typography fontSize={{ xs: 14, sm: 16, md: 18 }}>
                  Sign In
                </Typography>
              </Link>
            </Box>
            <Button
              variant="contained"
              type="submit"
              sx={{ width: { sm: "100%", md: "50%" } }}
            >
              <Typography fontSize={{ xs: 14, sm: 16, md: 18 }}>
                Sign Up
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

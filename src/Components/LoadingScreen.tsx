import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { closeLoadingScreen } from "../Redux/loadingScreenSlice";

export default function LoadingScreen() {
  const isOpen = useSelector((state: RootState) => state.loadingScreen.isOpen);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeLoadingScreen());
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpen}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

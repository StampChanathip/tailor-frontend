import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { closeAlertBox } from "../Redux/alertBoxSlice";
import { Box } from "@mui/material";

export default function AlertBox() {
  const alertState = useSelector((state: RootState) => state.alertBox);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeAlertBox());
  };

  return (
    <div>
      <Dialog
        open={alertState.isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {alertState.alertTitle}
        </DialogTitle>
        {alertState.alertMessage && (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {alertState.alertMessage}
            </DialogContentText>
          </DialogContent>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {alertState.alertType === "2" && (
            <DialogActions>
              <Button onClick={alertState.cancelHandler}>Cancel</Button>
            </DialogActions>
          )}
          <DialogActions>
            {alertState.alertType === "1" ? (
              <Button onClick={alertState.cancelHandler}>OK</Button>
            ) : (
              <Button onClick={alertState.confirmHandler}>Confirm</Button>
            )}
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

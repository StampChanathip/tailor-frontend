import { FormHelperText, FormLabel } from "@mui/material";
import { Controller, useWatch } from "react-hook-form";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function DateInput({ name, label, error, control }: InputProps) {
  const inputValue = useWatch({ control, name: name });
  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ref } }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
              <DatePicker
                sx={{ width: "100%" }}
                onChange={onChange}
                value={dayjs(inputValue)}
                inputRef={ref}
              />
            </DemoContainer>
          </LocalizationProvider>
        )}
      />
      <FormHelperText sx={{ px: 1, mb: 2, color: "red" }}>
        {error}
      </FormHelperText>
    </>
  );
}

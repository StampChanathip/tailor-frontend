import { FormHelperText, FormLabel, TextField } from "@mui/material";
import { Controller, useWatch } from "react-hook-form";

export default function TextInput({ name, label, error, control }: InputProps) {
  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, ref } }) => (
          <TextField
            onBlur={onBlur}
            onChange={onChange}
            value={useWatch({ control, name: name })}
            inputRef={ref}
            variant="outlined"
            fullWidth
          />
        )}
      />
      <FormHelperText sx={{ px: 1, mb: 2, color: "red" }}>
        {error}
      </FormHelperText>
    </>
  );
}

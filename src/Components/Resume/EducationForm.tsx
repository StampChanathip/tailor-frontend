import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import TextInput from "../Input/TextInput";
import { TextAreaInput } from "../Input/TextAreaInput";
import DateInput from "../Input/DateInput";
import ClearIcon from "@mui/icons-material/Clear";

const Educationform = ({
  fieldName,
  errors,
  control,
  order,
  handleDelete,
  setValue,
}: any) => {
  const formOrder = `education.${fieldName}`;
  let orderText = "";

  if (order === 0) {
    orderText = "1st";
  } else if (order === 1) {
    orderText = "2nd";
  } else if (order === 2) {
    orderText = "3rd";
  }

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, md: 2 }}
      sx={{ width: { xs: "300px", sm: "450px", md: "800px" } }}
    >
      <Grid
        item
        xs={12}
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Typography>{orderText} Education</Typography>
        <Tooltip title="Delete">
          <IconButton
            sx={{
              mr: 1,
            }}
            onClick={() => handleDelete()}
          >
            <ClearIcon
              sx={{
                fontSize: { xs: 20, sm: 24, md: 28 },
              }}
            />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={6}>
        <TextInput
          name={formOrder + "[school]"}
          label="School"
          control={control}
          error={errors}
        />
      </Grid>
      <Grid item xs={6}>
        <TextInput
          name={formOrder + "[fieldOfStudy]"}
          label="Field of Study"
          control={control}
          error={errors}
        />
      </Grid>
      <Grid item xs={6}>
        <DateInput
          name={formOrder + "[startDate]"}
          label="Start Date"
          control={control}
          error={errors}
        />
      </Grid>
      <Grid item xs={6}>
        <DateInput
          name={formOrder + "[endDate]"}
          label="End Date"
          control={control}
          error={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <TextAreaInput
          name="education"
          fieldName={`${fieldName}.summary`}
          order={order}
          label="Summary"
          control={control}
          error={errors}
          setValue={(fieldName: any, value: any) => setValue(fieldName, value)}
        />
      </Grid>
    </Grid>
  );
};

export default Educationform;

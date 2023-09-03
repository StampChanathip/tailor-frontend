import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import { TextAreaInput } from "../Input/TextAreaInput";
import Educationform from "./EducationForm";
import Experienceform from "./ExperienceForm";
import ActivityForm from "./ActivityForm";
import TextInput from "../Input/TextInput";
import {
  closeAlertBox,
  openAlertBoxType1,
  openAlertBoxType2,
} from "../../Redux/alertBoxSlice";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ResumeMock from "../../MockData/ResumeMock";
import createResumePDF from "../../Api/Functions/createResumePDF";

const ResumerForm = () => {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    personal: yup.object().shape({
      name: yup.string().required("Name is required"),
      surname: yup.string().required("Surname is required"),
      city: yup.string().required("City is required"),
      country: yup.string().required("Country is required"),
      email: yup
        .string()
        .email("Email format is invalid")
        .required("Email is required"),
      telephone: yup.string().required("Telephone is required"),
      personalProfile: yup.string().required("Personal Profile is required"),
    }),
    education: yup
      .array()
      .of(
        yup.object().shape({
          school: yup.string().required(),
          fieldOfStudy: yup.string().required(),
          startDate: yup.date().required(),
          endDate: yup.date().required(),
          summary: yup.string().required(),
        })
      )
      .required(),
    experience: yup
      .array()
      .of(
        yup.object().shape({
          company: yup.string().required(),
          title: yup.string().required(),
          startDate: yup.date().required(),
          endDate: yup.date().required(),
          summary: yup.string().required(),
        })
      )
      .required(),
    activity: yup
      .array()
      .of(
        yup.object().shape({
          organization: yup.string().required(),
          role: yup.string().required(),
          startDate: yup.date().required(),
          endDate: yup.date().required(),
          summary: yup.string().required(),
        })
      )
      .required(),
  });

  const form = useForm<ResumeFormData>({
    defaultValues: {
      personal: {
        name: "",
        surname: "",
        city: "",
        country: "",
        email: "",
        telephone: "",
        personalProfile: "",
      },
      education: [
        {
          school: "",
          fieldOfStudy: "",
          startDate: new Date(),
          endDate: new Date(),
          summary: "",
        },
      ],
      experience: [
        {
          company: "",
          title: "",
          startDate: new Date(),
          endDate: new Date(),
          summary: "",
        },
      ],
      activity: [
        {
          organization: "",
          role: "",
          startDate: new Date(),
          endDate: new Date(),
          summary: "",
        },
      ],
    },
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = form;

  const {
    fields: educations,
    append: addEducation,
    remove: deleteEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: experiences,
    append: addExperience,
    remove: deleteExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });

  const {
    fields: activities,
    append: addActivity,
    remove: deleteActivity,
  } = useFieldArray({
    control,
    name: "activity",
  });

  const openAlertDelete = (formType: string, formKey: number) => {
    if (
      educations.length != 1 ||
      experiences.length != 1 ||
      activities.length != 1
    ) {
      dispatch(
        openAlertBoxType2({
          alertTitle: `Are you sure want to delete this ${formType}?`,
          alertMessage: "",
          confirmHandler: () => handleDelete(formType, formKey),
          cancelHandler: handleClose,
        })
      );
    } else {
      dispatch(
        openAlertBoxType1({
          alertTitle: `Must have at least one ${formType}.`,
          alertMessage: "",
          cancelHandler: handleClose,
        })
      );
    }
  };

  const handleClose = () => {
    dispatch(closeAlertBox());
  };

  const handleAdd = (formType: string) => {
    if (formType === "education" && educations.length != 3) {
      addEducation({
        school: "",
        fieldOfStudy: "",
        startDate: new Date(),
        endDate: new Date(),
        summary: "",
      });
    } else if (formType === "experience" && experiences.length != 4) {
      addExperience({
        company: "",
        title: "",
        startDate: new Date(),
        endDate: new Date(),
        summary: "",
      });
    } else if (formType === "activity" && activities.length != 4) {
      addActivity({
        organization: "",
        role: "",
        startDate: new Date(),
        endDate: new Date(),
        summary: "",
      });
    }
    handleClose();
  };

  const handleDelete = (formType: string, formKey: number) => {
    if (formType === "education") {
      deleteEducation(formKey);
    } else if (formType === "experience") {
      deleteExperience(formKey);
    } else if (formType === "activity") {
      deleteActivity(formKey);
    }
    handleClose();
  };

  const onSubmit = (data: ResumeFormData) => {
    createResumePDF(data);
    // console.log("create");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { xs: "300px", sm: "450px", md: "800px" },
      }}
    >
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, md: 2 }}
        sx={{ width: { xs: "300px", sm: "450px", md: "800px" } }}
      >
        <Grid item xs={6}>
          <TextInput
            name="personal.name"
            label="Name"
            control={control}
            error={errors.personal?.name?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextInput
            name="personal.surname"
            label="Surname"
            control={control}
            error={errors.personal?.surname?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextInput
            name="personal.city"
            label="City"
            control={control}
            error={errors.personal?.city?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextInput
            name="personal.country"
            label="Country"
            control={control}
            error={errors.personal?.country?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextInput
            name="personal.email"
            label="Email"
            control={control}
            error={errors.personal?.email?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextInput
            name="personal.telephone"
            label="Telephone"
            control={control}
            error={errors.personal?.telephone?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextAreaInput
            name="personal"
            fieldName="personalProfile"
            label="Personal Profile"
            order={-1}
            control={control}
            error={errors.personal?.personalProfile?.message ?? ""}
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography>Educations</Typography>
            <Button
              variant="contained"
              sx={{ ml: 1 }}
              onClick={() => handleAdd("education")}
            >
              <Typography fontSize={10}>add Education</Typography>
            </Button>
          </Box>
          {educations.map((_education, idx) => {
            return (
              <Educationform
                key={`edu${idx}`}
                fieldName={idx}
                form={form}
                control={control}
                error={errors}
                order={idx}
                handleDelete={() => openAlertDelete("education", idx)}
                setValue={(fieldName: any, value: any) =>
                  setValue(fieldName, value)
                }
              />
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography>Work Experience</Typography>
            <Button
              variant="contained"
              sx={{ ml: 1 }}
              onClick={() => handleAdd("experience")}
            >
              <Typography fontSize={10}>add Experience</Typography>
            </Button>
          </Box>
          {experiences.map((_experience, idx) => {
            return (
              <Experienceform
                key={`exp${idx}`}
                fieldName={idx}
                form={form}
                control={control}
                error={errors}
                order={idx}
                handleDelete={() => openAlertDelete("experience", idx)}
                setValue={(fieldName: any, value: any) =>
                  setValue(fieldName, value)
                }
              />
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography>Extra Curriculum Activity</Typography>
            <Button
              variant="contained"
              sx={{ ml: 1 }}
              onClick={() => handleAdd("activity")}
            >
              <Typography fontSize={10}>add Activity</Typography>
            </Button>
          </Box>
          {activities.map((_activity, idx) => {
            return (
              <ActivityForm
                key={`act${idx}`}
                fieldName={idx}
                form={form}
                control={control}
                error={errors}
                order={idx}
                handleDelete={() => openAlertDelete("activity", idx)}
                setValue={(fieldName: any, value: any) =>
                  setValue(fieldName, value)
                }
              />
            );
          })}
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: { xs: "300px", sm: "450px", md: "800px" },
          justifyContent: "flex-end",
        }}
      >
        <Tooltip title="Save Data">
          <IconButton
            sx={{
              mr: { xs: 1, md: 2 },
            }}
            onClick={() => {
              // reset(ResumeMock);
            }}
          >
            <SaveIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Generate resume as pdf">
          <Button
            variant="contained"
            type="submit"
            sx={{ width: { sm: "100px", md: "150px" } }}
          >
            <Typography fontSize={{ xs: 14, sm: 16, md: 18 }}>
              Generate
            </Typography>
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ResumerForm;

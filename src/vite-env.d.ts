/// <reference types="vite/client" />

type SignUpFormData = {
  username: string;
  password: string;
  displayName: string;
};

type LoginFormData = {
  username: string;
  password: string;
};

type ResumeFormData = {
  personal: {
    name: string;
    surname: string;
    city: string;
    country: string;
    email: string;
    telephone: string;
    personalProfile: string;
  };
  education: Array<EducationFormData>;
  experience: Array<ExperienceFormData>;
  activity: Array<ActivityFormData>;
};

type EducationFormData = {
  school: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate: Date;
  summary: string;
};

type ExperienceFormData = {
  company: string;
  title: string;
  startDate: Date;
  endDate: Date;
  summary: string;
};

type ActivityFormData = {
  organization: string;
  role: string;
  startDate: Date;
  endDate: Date;
  summary: string;
};

type TextAreaProps = {
  fieldName: string;
  name: string;
  order: number;
  label: string;
  error: string | undefined;
  control: Control<FieldValues> | undefined;
  setInputvalue: (string) => void;
};

type InputProps = {
  name: string;
  label: string;
  error: string | undefined;
  control: Control<FieldValues> | undefined;
};

type AlertBoxState = {
  alertType: string; // "1" = "confirm", "2" = "confirm & cancel"
  isOpen: boolean;
  alertMessage: string;
  alertTitle: string;
  confirmHandler: () => void;
  cancelHandler: () => void;
};

type LoadingScreenState = {
  isOpen: boolean;
};

type SpellSuggestion = {
  position: number;
  token: string;
  bestSuggest: string;
};

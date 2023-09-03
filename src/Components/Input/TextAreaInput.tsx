import { Textarea } from "@mui/joy";
import {
  Box,
  FormHelperText,
  FormLabel,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import spellCheckApi from "../../Api/spellCheckApi";
import { useDispatch } from "react-redux";
import { Controller, useWatch } from "react-hook-form";
import { closeAlertBox, openAlertBoxType2 } from "../../Redux/alertBoxSlice";
import paraphraseApi from "../../Api/paraphraseApi";
import {
  closeLoadingScreen,
  openLoadingScreen,
} from "../../Redux/loadingScreenSlice";

export function TextAreaInput({
  name,
  fieldName,
  label,
  error,
  control,
  setValue,
}: any) {
  const dispatch = useDispatch();
  const formName = `${name}.${fieldName}`;

  const text = useWatch({ control, name: formName });

  const handleClose = () => {
    dispatch(closeAlertBox());
  };

  const handleSpellCheck = async () => {
    const response = await spellCheckApi(text);
    if (response.length) {
      let correctText = "";
      const suggestion: Array<SpellSuggestion> = response.map((item: any) => {
        const position = item.offset;
        const token = item.token;
        const bestSuggest = item.suggestions[0].suggestion;
        return { position, bestSuggest, token };
      });

      suggestion.forEach((item: SpellSuggestion) => {
        if (correctText) {
          correctText = correctText.replace(item.token, item.bestSuggest);
        } else {
          correctText = text.replace(item.token, item.bestSuggest);
        }
      });
      setValue(formName, correctText);
    } else {
      console.log("No spell wrong");
    }
  };

  const handleParaphrase = async () => {
    handleClose();
    dispatch(openLoadingScreen());
    const response = await paraphraseApi(text);
    setValue(formName, response);
    console.log(response);
    dispatch(closeLoadingScreen());
  };

  const openAlertParaphrase = async () => {
    dispatch(
      openAlertBoxType2({
        alertTitle: "Want to paraphrase?",
        alertMessage: "",
        confirmHandler: handleParaphrase,
        cancelHandler: handleClose,
      })
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {label && <FormLabel>{label}</FormLabel>}
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Controller
          name={formName}
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <Textarea
              onBlur={onBlur}
              onChange={onChange}
              value={text}
              variant="outlined"
              size="lg"
              sx={{
                width: "100%",
                backgroundColor: "white",
              }}
            />
          )}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <FormHelperText sx={{ px: 1, mb: 2, color: "red" }}>
          {error}
        </FormHelperText>
        <Box>
          <Tooltip title="Paraphrase">
            <IconButton
              sx={{
                mr: 1,
              }}
              onClick={openAlertParaphrase}
            >
              <EditIcon
                sx={{
                  fontSize: { xs: 20, sm: 24, md: 28 },
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Spell Check">
            <IconButton onClick={handleSpellCheck}>
              <SpellcheckIcon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

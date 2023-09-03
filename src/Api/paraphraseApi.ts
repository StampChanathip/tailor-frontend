import axios, { AxiosError } from "axios";

const paraphraseApi = async (text: string) => {
  const url =
    "https://rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com/rewrite";

  const data = {
    language: "en",
    strength: 3,
    text: text,
  };

  const config = {
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "3e92c908demshde3a5362b116c60p1018e4jsn06a4357c8dc7",
      "X-RapidAPI-Host":
        "rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.post(url, data, config);
    return response.data.rewrite;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
    // return err.response?.data;
  }
};

export default paraphraseApi;

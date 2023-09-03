import axios, { AxiosError } from "axios";
// import SpellCheckMockData from "../MockData/SpellCheckMockData";

const spellCheckApi = async (text: string) => {
  const url = "https://api.bing.microsoft.com/v7.0/spellcheck";
  const api_key = "b3f2cd056ec74bfda60fbb04c95c0027"; //change into .env
  const data = null;
  const config = {
    params: {
      mkt: "en-US",
      text: text,
    },
    headers: {
      "Ocp-Apim-Subscription-Key": api_key,
    },
  };

  try {
    const response = await axios.post(url, data, config);
    return response.data.flaggedTokens;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
    // return err.response?.data;
  }

  //   return SpellCheckMockData.flaggedTokens ?? [];
};

export default spellCheckApi;

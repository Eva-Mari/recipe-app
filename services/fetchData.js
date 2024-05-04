import * as cheerio from "cheerio";
import axios from "axios";

export const fetchData = async (url) => {
  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    return $;
  } catch (error) {
    console.error("Error when fetching data");
    raise;
  }
};

export const fetchRecipe = async (url) => {
  try {
    //'https://recept.se/recept/glutenfri-ror-ihop-kaka-i-liten-langpanna'
    //const response = await axios.get(url);

    const $ = await fetchData(url); //cheerio.load(response.data);

    let scriptContent = $('script[type="application/ld+json"]').html();

    scriptContent = JSON.parse(scriptContent);

    console.log(scriptContent);

    return scriptContent;
  } catch (error) {
    console.error("FETCH DATA ERROR!:", error);
    raise;
  }
};

export const fetchSearchResults = async (url) => {
  //"https://recept.se/sok?q=fisk
  try {
    const $ = await fetchData(url);
    let scriptContent = $("advanced-search");

    const initialData = scriptContent.attr(":initial-data");

    const jsonData = JSON.parse(initialData);

    return jsonData;
  } catch (error) {
    console.error("FETCH DATA ERROR!:", error);
    raise;
  }
};

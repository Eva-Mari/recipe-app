import * as cheerio from "cheerio";
import axios from "axios";

export const fetchData = async (url) => {
  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    return $;
  } catch (error) {
    console.error("Error when fetching data");
    throw error;
  }
};

export const fetchRecipeDetails = async (url) => {
  try {
    const $ = await fetchData(url);

    // titel
    const title = $("h1").text().trim();

    // bilden
    const firstImage = "https://www.recepten.se/" + $(".mainImage").attr("src");

    // ingredienser
    const ingredientsList = [];
    $(".list.ingredients .ingredient").each((index, element) => {
      const ingredient = $(element).text().trim();
      ingredientsList.push(ingredient);
    });

    // instruktioner
    const instructionsList = [];
    $(".instructions .instructionItem li.instruction").each(
      (index, element) => {
        const instruction = $(element).find("p").text().trim();
        instructionsList.push(instruction);
      }
    );

    const recipeDetails = {
      title,
      firstImage,
      ingredients: ingredientsList,
      instructions: instructionsList,
    };

    return recipeDetails;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    throw error;
  }
};

export const fetchRecipesResults = async (url) => {
  try {
    const $ = await fetchData(url);

    const listItems = $(".listItem");

    const recipeItems = [];

    listItems.each((index, element) => {
      const linkElement = $(element).find(".listItemImage");
      const onclickAttribute = linkElement.attr("onclick");
      const link = onclickAttribute
        ? onclickAttribute.match(/'([^']+)'/)[1]
        : "";
      // Extract recipe information from each list item
      const recipe = {
        title: $(element).find(".searchResultItemTitle").text().trim(),
        description: $(element)
          .find(".listItemDescription p:last-child")
          .text()
          .trim(),
        // Create the full URL and link to the image and detail screen

        image:
          "https://www.recepten.se" +
          $(element).find(".listItemImage img").attr("src"),
        slug: "https://www.recepten.se" + link,
      };
      recipeItems.push(recipe);
    });
    return recipeItems;
  } catch (error) {
    console.error("FETCH DATA ERROR from receoten. se bloggen!:", error);
    throw error;
  }
};

export const fetchRecipe = async (url) => {
  try {
    const $ = await fetchData(url);

    let scriptContent = $('script[type="application/ld+json"]').html();

    scriptContent = JSON.parse(scriptContent);

    console.log(scriptContent);

    return scriptContent;
  } catch (error) {
    console.error("FETCH DATA ERROR!:", error);
    throw error;
  }
};

export const fetchSearchResults = async (url) => {
  try {
    const $ = await fetchData(url);
    let scriptContent = $("advanced-search");

    const initialData = scriptContent.attr(":initial-data");

    const jsonData = JSON.parse(initialData);

    return jsonData;
  } catch (error) {
    console.error("FETCH DATA ERROR!:", error);
    throw error;
  }
};

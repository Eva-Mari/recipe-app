# Recipe App

The project is a recipe app for searching recipes and displaying them. The data is scraped from two different web pages, [recepten.se](recept.se) and [recept.se](recept.se).

### Project overview

The program contains of three screens.

1. Home screen where one can search by either typing in what to search for and/or by pressing the chip/button. One then has to press search to actually make the search.

2. Search Result Screen displays the result if either one of the pages return any. If there aren't any results, or if an error occured an animation is displayed. To see the recipe details one can press the button.

3. Recipe Screen displays the actual recipe. Different outputs depending on the data source.

I have also made several components used for displaying the results. For the web scraping I'm using axios and Cheerios.

The main goal for my project was to familiarize myself with web scraping. I haven't had any precise plan for what I would have done if I had had more time.

## Running the Project

This project requires Node.js and npm.

To run the project using Expo, follow these steps:

Clone the repository
Navigate to the root folder
Install dependencies by running npm install
Start the Expo development server by running npx expo start

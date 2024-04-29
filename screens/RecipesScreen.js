import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import cheerio from 'cheerio';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchData } from '../services/fetchData';
import { RecipeComponent } from '../components/CardComponent';

export const RecipesScreen = () => {
const [scrapedData, setScrapedData] = useState(null);

useEffect(() => {
  const fetchAndSetData = async () => {
    try {
      const scriptData = await fetchData('https://recept.se/recept/marangtarta-med-rice-krispies');
      setScrapedData(scriptData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchAndSetData();
}, []);


return (
  <ScrollView>
    <Text>Scraped Data:</Text>
    {scrapedData && (
      //<Image source={{ uri: scrapedData.image }} style={{ width: 200, height: 200 }} />
      <RecipeComponent recipe_json={scrapedData} />

    )}
  </ScrollView>
);
};


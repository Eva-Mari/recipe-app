import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import cheerio from 'cheerio';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchData } from '../services/fetchData';

export const RecipesScreen = () => {
const [scrapedData, setScrapedData] = useState(null);

useEffect(() => {
  const fetchAndSetData = async () => {
    try {
      const scriptData = await fetchData('https://recept.se/recept/blabarssaft');
      setScrapedData(scriptData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchAndSetData();
}, []);


return (
  <View>
    <Text>Scraped Data:</Text>
    {scrapedData && (
      <Image source={{ uri: scrapedData.image }} style={{ width: 200, height: 200 }} />
    )}
  </View>
);
};


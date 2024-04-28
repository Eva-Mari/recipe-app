import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import cheerio from 'cheerio';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

export const RecipesScreen = () => {
const [scrapedData, setScrapedData] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {

      'https://recept.se/recept/glutenfri-ror-ihop-kaka-i-liten-langpanna'
      const response = await axios.get('https://recept.se/recept/blabarssaft');
      const html = response.data;

      // Extract JavaScript object containing the relevant info from the html
      const startIndex = html.indexOf('<script type="application/ld+json">') + '<script type="application/ld+json">'.length;
      const endIndex = html.indexOf('</script>', startIndex);
      const jsonString = html.substring(startIndex, endIndex);
      
      const data = JSON.parse(jsonString);
      console.log(typeof data.image)
      //console.log('Parsed Data:', data);
      setScrapedData(JSON.stringify(data, null, 2)); 
    } catch (error) {
      console.error('ERROR!:', error);
    }
  };
  console.log(JSON.parse(scrapedData).image)
  

  /*
  
useEffect(() => {
  console.log('Scraped Data:', scrapedData);
}, [scrapedData]); // Include scrapedData in the dependency array

*/

  fetchData();
}, []);

  return (
    <View>
      <Text>Scraped Data:</Text>
      {scrapedData && (
        //<Text>{JSON.parse(scrapedData).image}</Text>
        <Image source={{ uri: 'https://images.recept.se/images/recipes/blabarssaft_34323.jpg' }} />
         // Use Image component to display image
      )}
    </View>
  );
};


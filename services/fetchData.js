import * as cheerio from 'cheerio';
import axios from 'axios';

export const fetchData = async (url) => {
    try {
    
      //'https://recept.se/recept/glutenfri-ror-ihop-kaka-i-liten-langpanna'
      const response = await axios.get(url);
      

      const $ = cheerio.load(response.data);

      let scriptContent = $('script[type="application/ld+json"]').html();

      scriptContent = JSON.parse(scriptContent)

      console.log(scriptContent)
    
      return scriptContent


    } catch (error) {
      console.error('FETCH DATA ERROR!:', error);
    }
}
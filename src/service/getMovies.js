import axios from 'axios';
import BASE_URL from 'baseUrl';
import API_KEY from './apiKey';

async function getMovies(endpoint) {

  try {
    const response = await axios.get(
      `${BASE_URL}${endpoint}?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}



export default getMovies;

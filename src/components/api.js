import axios from 'axios';

const fetchData = async (query, page) => {
  if (!query.trim()) { 
    return [];
  }

  const accessKey = 'Sb2ohx-ZsPsVIyVKlsJbh1oOPaZ8gA9xEWQ6DqABMuI';
  const url = `https://api1.unsplash.com/search/photos?query=${query}&page=${page}&per_page=10&client_id=${accessKey}`;

  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    throw new Error('Error fetching data from server');
  }
};

export default fetchData;
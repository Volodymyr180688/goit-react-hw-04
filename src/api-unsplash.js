import axios from 'axios';
axios.defaults.baseURL = "https://api.unsplash.com/";
  const accessKey = 'Sb2ohx-ZsPsVIyVKlsJbh1oOPaZ8gA9xEWQ6DqABMuI';

export const getArticles = async (topic, page) => {
  const response = await axios.get(`search/photos`, {
    params: {
      query: topic,
      client_id: accessKey,
      per_page: 12,
      page,
    },
  });
  return response.data.results;
}

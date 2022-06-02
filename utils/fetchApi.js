import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
   const { data } = await axios.get(url, {
      headers: {
         'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
         'X-RapidAPI-Key': '3cf3272d5amshdad40e7559d97dfp1f795fjsnfefd7ef2b6fe',
      },
   });
};

import axios from 'axios';

const API_URL = 'https://reactnd-books-api.udacity.com/books';

export const fetchBooks = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { 'Authorization': 'whatever-you-want' }
    });
    return response.data.books;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};
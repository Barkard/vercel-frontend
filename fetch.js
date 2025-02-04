import axios from 'axios';

const API_URL = 'http://localhost:3001';

// USERS
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (newUser) => {
  try {
    const response = await axios.post(`${API_URL}/users`, newUser);
    return response.data; // El id autoincrementable será parte de la respuesta
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id, updatedUser) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// CATEGORY BOOK
export const fetchCategoryBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/category_books`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category books:', error);
    throw error;
  }
};

export const createCategoryBook = async (newCategory) => {
  try {
    const response = await axios.post(`${API_URL}/category_books`, newCategory);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const updateCategoryBook = async (id, updatedCategory) => {
  try {
    const response = await axios.put(`${API_URL}/category_books/${id}`, updatedCategory);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategoryBook = async (id) => {
  try {
    await axios.delete(`${API_URL}/category_books/${id}`);
    return id;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

// BOOKS
// Obtener todos los libros
export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Crear un libro
export const createBook = async (newBook, coverImage) => {
  try {
    const formData = new FormData();
    formData.append('title', newBook.title);
    formData.append('author', newBook.author);
    formData.append('category_id', newBook.category_id);
    formData.append('description', newBook.description);
    
    // Verificamos si existe una imagen y la agregamos al FormData
    if (coverImage) {
      formData.append('cover_image', coverImage);
    }

    const response = await axios.post(`${API_URL}/books`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error.response ? error.response.data : error);
    throw error;
  }
};

// Actualizar un libro con nueva imagen
export const updateBook = async (id, updatedBook, coverImage) => {
  try {
    const formData = new FormData();
    formData.append('title', updatedBook.title);
    formData.append('author', updatedBook.author);
    formData.append('category_id', updatedBook.category_id);
    formData.append('description', updatedBook.description);
    
    // Verificamos si existe una imagen y la agregamos al FormData
    if (coverImage) {
      formData.append('cover_image', coverImage);
    }

    const response = await axios.put(`${API_URL}/books/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error.response ? error.response.data : error);
    throw error;
  }
};

// Eliminar un libro
export const deleteBook = async (id) => {
  try {
    await axios.delete(`${API_URL}/books/${id}`);
    return id;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};

export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(`${API_URL}/reservations`, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
}
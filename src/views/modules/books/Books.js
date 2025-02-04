import React, { useState, useEffect } from 'react';
import {
  CButton,
  CContainer,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CFormSelect,
  CRow,
  CCol,
  CAlert,
  CSpinner
} from '@coreui/react';
import { fetchBooks, createBook, updateBook, deleteBook, fetchCategoryBooks } from '../../../../fetch';

const BooksManagement = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ id: '', title: '', author: '', category_id: '', description: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBooks();
    loadCategories();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (error) {
      setError('Error loading books');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCategoryBooks();
      setCategories(data);
    } catch (error) {
      setError('Error loading categories');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModal = (book = { id: '', title: '', author: '', category_id: '', description: '' }, editing = false) => {
    setForm(book);
    setIsEditing(editing);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setForm({ id: '', title: '', author: '', category_id: '', description: '' });
  };

  const openDeleteModal = (book) => {
    setBookToDelete(book);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setBookToDelete(null);
  };

  const addBook = async () => {
    setLoading(true);
    try {
      const newBook = { ...form };
      delete newBook.id; // Eliminar el id antes de enviar
      const bookData = {
        title: newBook.title,
        author: newBook.author,
        category_id: newBook.category_id,
        description: newBook.description
      };
  
      const response = await fetch('http://localhost:3001/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData), // Solo datos JSON sin imagen
      });
  
      if (!response.ok) {
        throw new Error('Error creating book');
      }
  
      const createdBook = await response.json();
      setBooks([...books, createdBook]);
      closeModal();
    } catch (error) {
      setError('Error adding book');
      console.error('Error creating book:', error);
    } finally {
      setLoading(false);
    }
  };

  const editBook = async () => {
    setLoading(true);
    try {
      const updatedBook = await updateBook(form.id, form);
      const updatedBooks = books.map((book) =>
        book.id === form.id ? updatedBook : book
      );
      setBooks(updatedBooks);
      closeModal();
    } catch (error) {
      setError('Error updating book');
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteBook = async () => {
    setLoading(true);
    try {
      await deleteBook(bookToDelete.id);
      setBooks(books.filter((book) => book.id !== bookToDelete.id));
      closeDeleteModal();
    } catch (error) {
      setError('Error deleting book');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <CContainer className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <CSpinner />
      </CContainer>
    );
  }

  return (
    <CContainer>
      {error && <CAlert color="danger">{error}</CAlert>}

      <CButton color="success" onClick={() => openModal()} className="my-3">
        Add Book
      </CButton>

      <CTable className="table">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Title</CTableHeaderCell>
            <CTableHeaderCell>Author</CTableHeaderCell>
            <CTableHeaderCell>Category</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {books.map((book) => (
            <CTableRow key={book.id}>
              <CTableDataCell>{book.id}</CTableDataCell>
              <CTableDataCell>{book.title}</CTableDataCell>
              <CTableDataCell>{book.author}</CTableDataCell>
              <CTableDataCell>{categories.find((category) => category.id === book.category_id)?.name}</CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" onClick={() => openModal(book, true)}>Edit</CButton>
                <CButton color="danger" onClick={() => openDeleteModal(book)}>Delete</CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* Modal for Add/Edit Book */}
      <CModal visible={modalVisible} onClose={closeModal}>
        <CModalHeader closeButton>
          <CModalTitle>{isEditing ? 'Edit Book' : 'Add Book'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  label="Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  label="Author"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md={12}>
                <CFormSelect
                  label="Category"
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Cancel
          </CButton>
          <CButton
            color="primary"
            onClick={isEditing ? editBook : addBook}
          >
            {isEditing ? 'Update' : 'Add'}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal for Delete */}
      <CModal visible={deleteModalVisible} onClose={closeDeleteModal}>
        <CModalHeader closeButton>
          <CModalTitle>Confirm Deletion</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete this book?
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={confirmDeleteBook}>
            Delete
          </CButton>
          <CButton color="secondary" onClick={closeDeleteModal}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
};

export default BooksManagement;

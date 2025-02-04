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
  CRow,
  CCol,
  CAlert,
  CSpinner
} from '@coreui/react';
import { fetchCategoryBooks, createCategoryBook, updateCategoryBook, deleteCategoryBook } from '../../../../fetch';

const CategoryBookManagement = () => {
  const [categoryBooks, setCategoryBooks] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', description: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [categoryBookToDelete, setCategoryBookToDelete] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategoryBooks();
  }, []);

  const loadCategoryBooks = async () => {
    setLoading(true);
    try {
      const data = await fetchCategoryBooks();
      setCategoryBooks(data);
    } catch (error) {
      setError('Error loading category books');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModal = (categoryBook = { id: '', name: '', description: '' }, editing = false) => {
    setForm(categoryBook);
    setIsEditing(editing);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setForm({ id: '', name: '', description: '' });
  };

  const openDeleteModal = (categoryBook) => {
    setCategoryBookToDelete(categoryBook);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setCategoryBookToDelete(null);
  };

  const addCategoryBook = async () => {
    setLoading(true);
    try {
      const newCategoryBook = { ...form };
      delete newCategoryBook.id;
      const createdCategoryBook = await createCategoryBook(newCategoryBook);
      setCategoryBooks([...categoryBooks, createdCategoryBook]);
      closeModal();
    } catch (error) {
      setError('Error adding category');
    } finally {
      setLoading(false);
    }
  };

  const editCategoryBook = async () => {
    setLoading(true);
    try {
      const updatedCategoryBook = await updateCategoryBook(form.id, form);
      const updatedCategoryBooks = categoryBooks.map((categoryBook) =>
        categoryBook.id === form.id ? updatedCategoryBook : categoryBook
      );
      setCategoryBooks(updatedCategoryBooks);
      closeModal();
    } catch (error) {
      setError('Error updating category');
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteCategoryBook = async () => {
    setLoading(true);
    try {
      await deleteCategoryBook(categoryBookToDelete.id);
      setCategoryBooks(categoryBooks.filter((categoryBook) => categoryBook.id !== categoryBookToDelete.id));
      closeDeleteModal();
    } catch (error) {
      setError('Error deleting category');
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
        Add Category
      </CButton>

      <CTable className="table">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Description</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {categoryBooks.map((categoryBook) => (
            <CTableRow key={categoryBook.id}>
              <CTableDataCell>{categoryBook.id}</CTableDataCell>
              <CTableDataCell>{categoryBook.name}</CTableDataCell>
              <CTableDataCell>{categoryBook.description}</CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" className="me-2" onClick={() => openModal(categoryBook, true)}>
                  Edit
                </CButton>
                <CButton color="danger" onClick={() => openDeleteModal(categoryBook)}>
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* Modal for Add or Edit */}
      <CModal visible={modalVisible} onClose={closeModal}>
        <CModalHeader closeButton>
          <CModalTitle>{isEditing ? 'Edit Category' : 'Add Category'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CCol>
                <CFormInput label="Name" name="name" value={form.name} onChange={handleChange} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput label="Description" name="description" value={form.description} onChange={handleChange} />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={isEditing ? editCategoryBook : addCategoryBook}>
            {isEditing ? 'Save Changes' : 'Add'}
          </CButton>
          <CButton color="secondary" onClick={closeModal}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Delete Confirmation Modal */}
      <CModal visible={deleteModalVisible} onClose={closeDeleteModal}>
        <CModalHeader closeButton>
          <CModalTitle>Confirm Deletion</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete this category?
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={confirmDeleteCategoryBook}>
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

export default CategoryBookManagement;

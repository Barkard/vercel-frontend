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
  CCol,
  CRow,
  CFormCheck,
  CAlert,
  CSpinner
} from '@coreui/react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../../fetch';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', lastname: '', id_card: '', email: '', birthdate: '', is_active: true });
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      setError('Error loading users');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckChange = () => {
    setForm({ ...form, is_active: !form.is_active });
  };

  const openModal = (user = { id: '', name: '', lastname: '', id_card: '', email: '', birthdate: '', is_active: true }, editing = false) => {
    setForm(user);
    setIsEditing(editing);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setForm({ id: '', name: '', lastname: '', id_card: '', email: '', birthdate: '', is_active: true });
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setUserToDelete(null);
  };

  const addUser = async () => {
    setLoading(true);

    const existingUser = users.find((user) => user.id_card === form.id_card);
    if (existingUser) {
      openErrorModal('Error: ID Number already exists');
      setLoading(false);

      return;
    }

    try {
      const newUser = { ...form };
      delete newUser.id;
      const createdUser = await createUser(newUser);
      setUsers([...users, createdUser]);
      closeModal();
    } catch (error) {
      openErrorModal('Error adding user');
    } finally {
      setLoading(false);
    }
  };

  const editUser = async () => {
    setLoading(true);
    try {
      const updatedUser = await updateUser(form.id, form);
      const updatedUsers = users.map((user) =>
        user.id === form.id ? updatedUser : user
      );
      setUsers(updatedUsers);
      closeModal();
    } catch (error) {
      setError('Error updating user');
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteUser = async () => {
    setLoading(true);
    try {
      await deleteUser(userToDelete.id);
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      closeDeleteModal();
    } catch (error) {
      setError('Error deleting user');
    } finally {
      setLoading(false);
    }
  };

  const openErrorModal = (message) => {
    setError(message);
    setErrorModalVisible(true);
  };
  
  const closeErrorModal = () => {
    setErrorModalVisible(false);
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
        Add User
      </CButton>

      <CTable className="table">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Last Name</CTableHeaderCell>
            <CTableHeaderCell>ID Number</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Birthdate</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((user) => (
            <CTableRow key={user.id}>
              <CTableDataCell>{user.id}</CTableDataCell>
              <CTableDataCell>{user.name}</CTableDataCell>
              <CTableDataCell>{user.lastname}</CTableDataCell>
              <CTableDataCell>{user.id_card}</CTableDataCell>
              <CTableDataCell>{user.email}</CTableDataCell>
              <CTableDataCell>{user.birthdate}</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  checked={user.is_active}
                  onChange={() => {}}
                  disabled
                />
              </CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" className="me-2" onClick={() => openModal(user, true)}>
                  Edit
                </CButton>
                <CButton color="danger" onClick={() => openDeleteModal(user)}>
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
          <CModalTitle>{isEditing ? 'Edit User' : 'Add User'}</CModalTitle>
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
                <CFormInput label="Last Name" name="lastname" value={form.lastname} onChange={handleChange} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput label="ID Number" name="id_card" value={form.id_card} onChange={handleChange} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput label="Birthdate" name="birthdate" type="date" value={form.birthdate} onChange={handleChange} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormCheck label="Active" checked={form.is_active} onChange={handleCheckChange} />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Close
          </CButton>
          <CButton color="primary" onClick={isEditing ? editUser : addUser}>
            {isEditing ? 'Save Changes' : 'Add User'}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Delete Confirmation Modal */}
      <CModal visible={deleteModalVisible} onClose={closeDeleteModal}>
        <CModalHeader closeButton>
          <CModalTitle>Confirm Deletion</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this user?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeDeleteModal}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={confirmDeleteUser}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
};

export default UserManagement;

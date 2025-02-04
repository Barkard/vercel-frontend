import React, { useState } from 'react';
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
} from '@coreui/react';

const Role = () => {
  const [roles, setRoles] = useState([
    { id_role: 1, name: 'Admin', description: 'Administrator role', created_at: '2024-01-01', updated_at: '2024-01-01' },
    { id_role: 2, name: 'User', description: 'Regular user role', created_at: '2024-02-01', updated_at: '2024-02-01' },
  ]);

  const [form, setForm] = useState({ id_role: '', name: '', description: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModal = (role = { id_role: '', name: '', description: '' }, editing = false) => {
    setForm(role);
    setIsEditing(editing);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setForm({ id_role: '', name: '', description: '' });
  };

  const openDeleteModal = (role) => {
    setRoleToDelete(role);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setRoleToDelete(null);
  };

  const getNewId = () => {
    return roles.length > 0 ? Math.max(...roles.map((role) => role.id_role)) + 1 : 1;
  };

  const addRole = () => {
    const newRole = { ...form, id_role: getNewId(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    setRoles([...roles, newRole]);
    closeModal();
  };

  const editRole = () => {
    const updatedRoles = roles.map((role) =>
      role.id_role === form.id_role ? { ...role, ...form, updated_at: new Date().toISOString() } : role
    );
    setRoles(updatedRoles);
    closeModal();
  };

  const deleteRole = () => {
    setRoles(roles.filter((role) => role.id_role !== roleToDelete.id_role));
    closeDeleteModal();
  };

  return (
    <CContainer>
      <CButton color="success" onClick={() => openModal()} className="my-3">
        Add Role
      </CButton>

      <CTable className="table table-dark table-hover">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Role Name</CTableHeaderCell>
            <CTableHeaderCell>Description</CTableHeaderCell>
            <CTableHeaderCell>Created At</CTableHeaderCell>
            <CTableHeaderCell>Updated At</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {roles.map((role) => (
            <CTableRow key={role.id_role}>
              <CTableDataCell>{role.id_role}</CTableDataCell>
              <CTableDataCell>{role.name}</CTableDataCell>
              <CTableDataCell>{role.description}</CTableDataCell>
              <CTableDataCell>{role.created_at}</CTableDataCell>
              <CTableDataCell>{role.updated_at}</CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" className="me-2" onClick={() => openModal(role, true)}>
                  Edit
                </CButton>
                <CButton color="danger" onClick={() => openDeleteModal(role)}>
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
          <CModalTitle>{isEditing ? 'Edit Role' : 'Add Role'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CCol>
                <CFormInput
                  label="Role Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput
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
          <CButton color="primary" onClick={isEditing ? editRole : addRole}>
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
          Are you sure you want to delete the role <strong>{roleToDelete?.name}</strong>?
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={deleteRole}>
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

export default Role;

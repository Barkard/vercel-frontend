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
} from '@coreui/react';

const Returns = () => {
  const [returns, setReturns] = useState([]);
  const [form, setForm] = useState({ id_loans: '', date_return: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Función para cargar las devoluciones (puedes usar una API aquí)
  useEffect(() => {
    // Aquí deberías hacer una solicitud a la API para obtener las devoluciones
    // setReturns(data);
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Abrir el modal
  const openModal = (returnData = { id_loans: '', date_return: '' }, editing = false) => {
    setForm(returnData);
    setIsEditing(editing);
    setModalVisible(true);
  };

  // Cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
    setForm({ id_loans: '', date_return: '' });
  };

  // Agregar una nueva devolución
  const addReturn = () => {
    // Aquí debes agregar la devolución a la base de datos
    const newReturn = { ...form, id_return: returns.length + 1 };
    setReturns([...returns, newReturn]);
    closeModal();
  };

  // Editar una devolución existente
  const editReturn = () => {
    const updatedReturns = returns.map((r) =>
      r.id_loans === form.id_loans ? { ...r, ...form } : r
    );
    setReturns(updatedReturns);
    closeModal();
  };

  // Eliminar una devolución
  const deleteReturn = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setReturns(returns.filter((r) => r.id_loans !== id));
        Swal.fire('Deleted!', 'The return has been deleted.', 'success');
      }
    });
  };

  return (
    <CContainer>
      <CButton color="success" onClick={() => openModal()} className="my-3">
        Add Return
      </CButton>

      <CTable className="table table-dark table-hover">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Loan ID</CTableHeaderCell>
            <CTableHeaderCell>Date of Return</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {returns.map((returnData) => (
            <CTableRow key={returnData.id_loans}>
              <CTableDataCell>{returnData.id_loans}</CTableDataCell>
              <CTableDataCell>{returnData.date_return}</CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" className="me-2" onClick={() => openModal(returnData, true)}>
                  Edit
                </CButton>
                <CButton color="danger" onClick={() => deleteReturn(returnData.id_loans)}>
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* Modal para Agregar o Editar */}
      <CModal visible={modalVisible} onClose={closeModal}>
        <CModalHeader closeButton>
          <CModalTitle>{isEditing ? 'Edit Return' : 'Add Return'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CCol>
                <CFormInput
                  label="Loan ID"
                  name="id_loans"
                  value={form.id_loans}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput
                  label="Date of Return"
                  name="date_return"
                  type="datetime-local"
                  value={form.date_return}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={isEditing ? editReturn : addReturn}>
            {isEditing ? 'Save Changes' : 'Add Return'}
          </CButton>
          <CButton color="secondary" onClick={closeModal}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
};

export default Returns;

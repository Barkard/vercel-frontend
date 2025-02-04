import React, { useState } from 'react';
import { createReservation } from '../../../../fetch.js';
import { CButton, CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormLabel, CRow, CCol } from '@coreui/react';

const Reservations = () => {
  const [reservationData, setReservationData] = useState({
    userId: '',
    bookId: '',
    reservationDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData({
      ...reservationData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const createdReservation = await createReservation(reservationData);
      console.log('Reservation created:', createdReservation);
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  return (
    <CRow className="justify-content-center">
      <CCol md={6}>
        <CCard>
          <CCardHeader>
            <h4>Create Reservation</h4>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CCol xs={12} md={6}>
                  <CFormLabel htmlFor="userId">User ID</CFormLabel>
                  <CFormInput
                    type="text"
                    id="userId"
                    name="userId"
                    value={reservationData.userId}
                    onChange={handleChange}
                    required
                  />
                </CCol>
                <CCol xs={12} md={6}>
                  <CFormLabel htmlFor="bookId">Book ID</CFormLabel>
                  <CFormInput
                    type="text"
                    id="bookId"
                    name="bookId"
                    value={reservationData.bookId}
                    onChange={handleChange}
                    required
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol xs={12}>
                  <CFormLabel htmlFor="reservationDate">Reservation Date</CFormLabel>
                  <CFormInput
                    type="date"
                    id="reservationDate"
                    name="reservationDate"
                    value={reservationData.reservationDate}
                    onChange={handleChange}
                    required
                  />
                </CCol>
              </CRow>

              <CButton color="primary" type="submit">
                Create Reservation
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Reservations;
